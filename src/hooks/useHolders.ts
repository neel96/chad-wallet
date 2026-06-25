import useSWR from "swr";
import type { TopTrader } from "@/types/birdeye";

interface RawTradersResponse {
  data?: { items?: TopTrader[] };
  success?: boolean;
}

export function useHolders(mint: string | null) {
  return useSWR<RawTradersResponse>(
    mint ? `/api/birdeye/traders?address=${mint}` : null,
    { refreshInterval: 30_000, revalidateOnFocus: false }
  );
}
