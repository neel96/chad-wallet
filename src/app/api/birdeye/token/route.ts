import { NextResponse } from "next/server";
import { birdeye } from "@/lib/birdeye";
import { TokenOverviewResponseSchema } from "@/types/birdeye";

const SOL_ADDRESS_RE = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address") ?? "";

  if (!SOL_ADDRESS_RE.test(address)) {
    return NextResponse.json({ error: "Invalid address" }, { status: 400 });
  }

  try {
    const raw = await birdeye.fetch<unknown>("/defi/token_overview", { address }, 10);
    const parsed = TokenOverviewResponseSchema.safeParse(raw);
    const data = parsed.success ? parsed.data : raw;
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=10, stale-while-revalidate=30" },
    });
  } catch (err) {
    console.error("[birdeye/token]", err);
    return NextResponse.json({ error: "Failed to fetch token overview" }, { status: 502 });
  }
}
