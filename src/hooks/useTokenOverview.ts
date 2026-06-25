import useSWR from "swr";
import { TokenOverviewResponseSchema } from "@/types/birdeye";
import { z } from "zod";

type TokenOverviewResponse = z.infer<typeof TokenOverviewResponseSchema>;

export function useTokenOverview(mint: string | null) {
  return useSWR<TokenOverviewResponse>(
    mint ? `/api/birdeye/token?address=${mint}` : null,
    { refreshInterval: 10_000 }
  );
}
