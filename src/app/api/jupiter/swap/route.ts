import { NextResponse } from "next/server";

const SOL_ADDRESS_RE = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
const MAX_BODY_BYTES = 32_768; // 32 KB — Jupiter responses are well under this

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Request body too large" }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const userPublicKey = body.userPublicKey;
  if (typeof userPublicKey !== "string" || !SOL_ADDRESS_RE.test(userPublicKey)) {
    return NextResponse.json({ error: "Invalid userPublicKey" }, { status: 400 });
  }

  const quoteResponse = body.quoteResponse;
  if (!quoteResponse || typeof quoteResponse !== "object") {
    return NextResponse.json({ error: "quoteResponse required" }, { status: 400 });
  }

  try {
    const res = await fetch("https://api.jup.ag/swap/v1/swap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quoteResponse,
        userPublicKey,
        wrapAndUnwrapSol: true,
        dynamicComputeUnitLimit: true,
        prioritizationFeeLamports: "auto",
      }),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("[jupiter/swap]", err);
    return NextResponse.json({ error: "Failed to build swap transaction" }, { status: 502 });
  }
}
