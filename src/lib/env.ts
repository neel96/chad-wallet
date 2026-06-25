// Centralised environment config.
// Import `serverEnv` only from API routes / server components.
// Import `clientEnv` anywhere.

function get(key: string, fallback = ""): string {
  return process.env[key] ?? fallback;
}

function require(key: string): string {
  const v = process.env[key];
  if (!v && process.env.NODE_ENV === "production") {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return v ?? "";
}

export const serverEnv = {
  BIRDEYE_API_KEY: require("BIRDEYE_API_KEY"),
} as const;

export const clientEnv = {
  PRIVY_APP_ID: get("NEXT_PUBLIC_PRIVY_APP_ID"),
  PRIVY_CLIENT_ID: get("NEXT_PUBLIC_PRIVY_CLIENT_ID"),
  ALCHEMY_RPC_URL: get("NEXT_PUBLIC_ALCHEMY_RPC_URL", "https://api.mainnet-beta.solana.com"),
  SOLANA_NETWORK: get("NEXT_PUBLIC_SOLANA_NETWORK", "mainnet-beta"),
  APP_URL: get("NEXT_PUBLIC_APP_URL", "http://localhost:3000"),
} as const;
