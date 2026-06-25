import { Connection } from "@solana/web3.js";

let _connection: Connection | null = null;

export function getConnection(): Connection {
  if (!_connection) {
    const endpoint =
      process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL ??
      "https://api.mainnet-beta.solana.com";
    _connection = new Connection(endpoint, "confirmed");
  }
  return _connection;
}
