"use client";

import { useState, useCallback } from "react";
import useSWR from "swr";
import { useDebounce } from "use-debounce";
import { useWallets, useSignTransaction } from "@privy-io/react-auth/solana";
import { VersionedTransaction } from "@solana/web3.js";
import { getConnection } from "@/lib/solana";
import toast from "react-hot-toast";
import type { JupiterQuote, JupiterSwapResponse } from "@/types/jupiter";

const WSOL = "So11111111111111111111111111111111111111112";

export function useJupiterSwap(
  inputMint: string,
  outputMint: string,
  inputAmount: string
) {
  const { wallets } = useWallets();
  const wallet = wallets[0];

  const { signTransaction } = useSignTransaction();

  const [isSwapping, setIsSwapping] = useState(false);
  const [debouncedAmount] = useDebounce(inputAmount, 500);

  const amountLamports = (() => {
    const n = parseFloat(debouncedAmount);
    if (!n || isNaN(n) || n <= 0) return null;
    const decimals = inputMint === WSOL ? 9 : 6;
    return Math.floor(n * Math.pow(10, decimals));
  })();

  const quoteKey =
    amountLamports && inputMint && outputMint
      ? `/api/jupiter/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amountLamports}&slippageBps=50`
      : null;

  const {
    data: quote,
    error: quoteError,
    isLoading: quoteLoading,
  } = useSWR<JupiterQuote>(quoteKey, { revalidateOnFocus: false });

  const executeSwap = useCallback(async () => {
    if (!quote || !wallet?.address) return;

    setIsSwapping(true);
    const promise = (async () => {
      const swapRes = await fetch("/api/jupiter/swap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quoteResponse: quote,
          userPublicKey: wallet.address,
        }),
      });

      if (!swapRes.ok) {
        const err = await swapRes.json();
        throw new Error((err as { error?: string }).error ?? "Swap failed");
      }

      const { swapTransaction }: JupiterSwapResponse = await swapRes.json();

      const txBytes = Buffer.from(swapTransaction, "base64");
      const tx = VersionedTransaction.deserialize(txBytes);

      // Sign via Privy Solana embedded wallet
      const { signedTransaction } = await signTransaction({
        transaction: tx.serialize(),
        wallet,
      });

      const connection = getConnection();
      const signedTx = VersionedTransaction.deserialize(signedTransaction);
      const signature = await connection.sendRawTransaction(signedTx.serialize(), {
        skipPreflight: false,
        maxRetries: 3,
      });

      await connection.confirmTransaction(
        { signature, ...(await connection.getLatestBlockhash()) },
        "confirmed"
      );

      return signature;
    })();

    toast.promise(promise, {
      loading: "Confirming swap...",
      success: (sig) => `Swapped! ${sig.slice(0, 8)}...`,
      error: (err: Error) => err.message ?? "Swap failed",
    });

    try {
      await promise;
    } finally {
      setIsSwapping(false);
    }
  }, [quote, wallet, signTransaction]);

  const priceImpactPct = quote ? parseFloat(quote.priceImpactPct) * 100 : 0;

  return {
    quote,
    quoteError,
    quoteLoading,
    isSwapping,
    executeSwap,
    priceImpactPct,
    canSwap: !!quote && !!wallet?.address && !isSwapping,
  };
}
