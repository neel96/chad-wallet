import { NextResponse } from "next/server";

const SOL_ADDRESS_RE = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const inputMint = searchParams.get("inputMint") ?? "";
  const outputMint = searchParams.get("outputMint") ?? "";
  const amount = searchParams.get("amount") ?? "";
  const slippageBps = searchParams.get("slippageBps") ?? "50";

  if (!SOL_ADDRESS_RE.test(inputMint) || !SOL_ADDRESS_RE.test(outputMint)) {
    return NextResponse.json({ error: "Invalid mint address" }, { status: 400 });
  }
  if (!/^[1-9]\d*$/.test(amount)) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }
  const slippage = parseInt(slippageBps, 10);
  if (isNaN(slippage) || slippage < 0 || slippage > 5000) {
    return NextResponse.json({ error: "slippageBps must be 0–5000" }, { status: 400 });
  }

  const params = new URLSearchParams({ inputMint, outputMint, amount, slippageBps });

  try {
    const res = await fetch(`https://api.jup.ag/swap/v1/quote?${params}`, {
      next: { revalidate: 0 },
    });
    const data = await res.json();
    return NextResponse.json(data, {
      status: res.status,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err) {
    console.error("[jupiter/quote]", err);
    return NextResponse.json({ error: "Failed to fetch quote" }, { status: 502 });
  }
}
