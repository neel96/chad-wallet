import { NextResponse } from "next/server";
import { birdeye } from "@/lib/birdeye";
import { TokenListResponseSchema } from "@/types/birdeye";

export const revalidate = 60;

export async function GET() {
  try {
    const raw = await birdeye.fetch<unknown>("/defi/tokenlist", {
      sort_by: "v24hUSD",
      sort_type: "desc",
      offset: "0",
      limit: "30",
    }, 60);
    const parsed = TokenListResponseSchema.safeParse(raw);
    const data = parsed.success ? parsed.data : raw;
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120" },
    });
  } catch (err) {
    console.error("[birdeye/tokenlist]", err);
    return NextResponse.json({ error: "Failed to fetch token list" }, { status: 502 });
  }
}
