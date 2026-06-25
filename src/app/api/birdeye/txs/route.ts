import { NextResponse } from "next/server";
import { birdeye } from "@/lib/birdeye";
import { TokenTxsResponseSchema } from "@/types/birdeye";

const SOL_ADDRESS_RE = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address") ?? "";

  if (!SOL_ADDRESS_RE.test(address)) {
    return NextResponse.json({ error: "Invalid address" }, { status: 400 });
  }

  try {
    const raw = await birdeye.fetch<unknown>("/defi/txs/token", {
      address,
      tx_type: "swap",
      offset: "0",
      limit: "30",
    }, 5);
    const parsed = TokenTxsResponseSchema.safeParse(raw);
    const data = parsed.success ? parsed.data : raw;
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=5, stale-while-revalidate=10" },
    });
  } catch (err) {
    console.error("[birdeye/txs]", err);
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 502 });
  }
}
