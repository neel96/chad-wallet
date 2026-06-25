import useSWR from "swr";
import { useMemo, useRef } from "react";
import type { TokenTx } from "@/types/birdeye";

interface RawTxsResponse {
  data?: { items?: TokenTx[] };
  success?: boolean;
}

export function useLiveTrades(mint: string | null) {
  const seenHashes = useRef(new Set<string>());

  const { data, error, isLoading } = useSWR<RawTxsResponse>(
    mint ? `/api/birdeye/txs?address=${mint}` : null,
    {
      refreshInterval: 5_000,
      revalidateOnFocus: false,
      compare(a, b) {
        const aHash = a?.data?.items?.[0]?.txHash;
        const bHash = b?.data?.items?.[0]?.txHash;
        return aHash === bHash;
      },
    }
  );

  const trades = useMemo<TokenTx[]>(() => {
    const items = data?.data?.items;
    if (!items?.length) return [];
    const fresh = items.filter((tx) => !seenHashes.current.has(tx.txHash));
    fresh.forEach((tx) => seenHashes.current.add(tx.txHash));
    return items;
  }, [data]);

  return { trades, error, isLoading };
}
