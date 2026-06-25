import useSWR from "swr";
import type { TokenListResponse } from "@/types/birdeye";

export function useTokenList() {
  return useSWR<TokenListResponse>("/api/birdeye/tokenlist", {
    refreshInterval: 60_000,
    revalidateOnFocus: false,
  });
}
