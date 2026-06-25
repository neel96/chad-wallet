// Server-only — never import from client components or hooks

const BIRDEYE_BASE = "https://public-api.birdeye.so";
const TIMEOUT_MS = 10_000;

async function birdeyeFetch<T>(
  path: string,
  params?: Record<string, string>,
  revalidate = 0
): Promise<T> {
  const key = process.env.BIRDEYE_API_KEY;
  if (!key) throw new Error("BIRDEYE_API_KEY is not configured");

  const url = new URL(`${BIRDEYE_BASE}${path}`);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined) url.searchParams.set(k, v);
    }
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(url.toString(), {
      headers: {
        "X-API-KEY": key,
        "x-chain": "solana",
        accept: "application/json",
      },
      signal: controller.signal,
      next: { revalidate },
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`BirdEye ${res.status}: ${body}`);
    }

    return res.json() as Promise<T>;
  } finally {
    clearTimeout(timer);
  }
}

export const birdeye = { fetch: birdeyeFetch };
