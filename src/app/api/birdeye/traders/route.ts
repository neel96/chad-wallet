import { NextResponse } from "next/server";
import { birdeye } from "@/lib/birdeye";
import { TopTradersResponseSchema } from "@/types/birdeye";

const SOL_ADDRESS_RE = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address") ?? "";

  if (!SOL_ADDRESS_RE.test(address)) {
    return NextResponse.json({ error: "Invalid address" }, { status: 400 });
  }

  try {
    const raw = await birdeye.fetch<unknown>("/defi/v2/tokens/top_traders", {
      address,
      time_frame: "24h",
      sort_type: "desc",
      sort_by: "volume",
      offset: "0",
      limit: "20",
    }, 30);
    const parsed = TopTradersResponseSchema.safeParse(raw);
    const data = parsed.success ? parsed.data : raw;
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" },
    });
  } catch (err) {
    console.error("[birdeye/traders]", err);
    return NextResponse.json({ error: "Failed to fetch traders" }, { status: 502 });
  }
}
