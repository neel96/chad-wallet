import { NextResponse } from "next/server";
import { birdeye } from "@/lib/birdeye";
import { OHLCVResponseSchema } from "@/types/birdeye";

const SOL_ADDRESS_RE = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
const VALID_INTERVALS = new Set(["1m", "3m", "5m", "15m", "30m", "1H", "2H", "4H", "6H", "8H", "12H", "1D", "3D", "1W", "1M"]);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address") ?? "";
  const type = searchParams.get("type") ?? "15m";
  const timeFrom = searchParams.get("time_from");
  const timeTo = searchParams.get("time_to");

  if (!SOL_ADDRESS_RE.test(address)) {
    return NextResponse.json({ error: "Invalid address" }, { status: 400 });
  }
  if (!VALID_INTERVALS.has(type)) {
    return NextResponse.json({ error: "Invalid interval" }, { status: 400 });
  }

  const now = Math.floor(Date.now() / 1000);
  const params: Record<string, string> = {
    address,
    type,
    time_to: (timeTo && /^\d+$/.test(timeTo)) ? timeTo : String(now),
    time_from: (timeFrom && /^\d+$/.test(timeFrom)) ? timeFrom : String(now - 90 * 24 * 60 * 60),
  };

  try {
    const raw = await birdeye.fetch<unknown>("/defi/ohlcv", params, 15);
    const parsed = OHLCVResponseSchema.safeParse(raw);
    const data = parsed.success ? parsed.data : raw;
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=15, stale-while-revalidate=30" },
    });
  } catch (err) {
    console.error("[birdeye/history]", err);
    return NextResponse.json({ error: "Failed to fetch OHLCV" }, { status: 502 });
  }
}
