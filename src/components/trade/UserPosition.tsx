"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useUserPosition } from "@/hooks/useUserPosition";
import { formatPrice } from "@/lib/utils";
import { useTokenOverview } from "@/hooks/useTokenOverview";

export function UserPosition({ mint }: { mint: string }) {
  const { authenticated } = usePrivy();
  const { data: position, isLoading } = useUserPosition(mint);
  const { data: overview } = useTokenOverview(mint);

  const token = overview?.data;
  const uiAmount = position?.uiAmount ?? 0;
  const usdValue = uiAmount * (token?.price ?? 0);

  if (!authenticated) return null;

  return (
    <div className="border-t border-[#1f1f1f] p-4">
      <div className="text-[10px] uppercase tracking-wider text-[#6b7280] mb-2">
        Your Position
      </div>
      {isLoading ? (
        <div className="h-8 animate-pulse rounded bg-[#1f1f1f]" />
      ) : (
        <div className="flex items-center justify-between">
          <span className="text-sm font-mono text-white tabular-nums">
            {uiAmount.toFixed(4)} {token?.symbol ?? ""}
          </span>
          <span className="text-sm font-mono text-[#6b7280] tabular-nums">
            {usdValue > 0 ? `≈ ${formatPrice(usdValue)}` : "$0"}
          </span>
        </div>
      )}
    </div>
  );
}
