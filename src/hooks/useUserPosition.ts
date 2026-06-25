"use client";

import useSWR from "swr";
import { useWallets } from "@privy-io/react-auth/solana";
import { PublicKey } from "@solana/web3.js";
import { getConnection } from "@/lib/solana";

async function fetchSplBalance([walletAddress, mint]: [string, string]) {
  const connection = getConnection();
  const owner = new PublicKey(walletAddress);
  const mintPubkey = new PublicKey(mint);

  const accounts = await connection.getParsedTokenAccountsByOwner(owner, {
    mint: mintPubkey,
  });

  if (!accounts.value.length) return { uiAmount: 0, amount: "0", decimals: 6 };

  const info = accounts.value[0].account.data.parsed?.info?.tokenAmount as {
    uiAmount?: number;
    amount?: string;
    decimals?: number;
  };

  return {
    uiAmount: info?.uiAmount ?? 0,
    amount: info?.amount ?? "0",
    decimals: info?.decimals ?? 6,
  };
}

export function useUserPosition(mint: string | null) {
  const { wallets } = useWallets();
  const wallet = wallets[0];

  return useSWR(
    wallet?.address && mint ? [wallet.address, mint] : null,
    fetchSplBalance,
    { refreshInterval: 15_000 }
  );
}
