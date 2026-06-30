"use client";

import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useUserPosition } from "@/hooks/useUserPosition";
import { formatPrice } from "@/lib/utils";
import { useTokenOverview } from "@/hooks/useTokenOverview";

export function UserPosition({ mint }: { mint: string }) {
  const { authenticated, login } = usePrivy();
  const { data: position, isLoading } = useUserPosition(mint);
  const { data: overview } = useTokenOverview(mint);
  const [posTab, setPosTab] = useState<"open" | "closed">("open");

  const token = overview?.data;
  const uiAmount = position?.uiAmount ?? 0;
  const usdValue = uiAmount * (token?.price ?? 0);

  if (!authenticated) {
    return (
      <div className="border-t border-[#1a1a1a] px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold text-white">Your positions</span>
        </div>
        <button
          onClick={() => login()}
          className="w-full py-2 rounded-lg border border-[#1f1f1f] text-xs font-semibold text-[#4b5563] hover:text-white hover:border-[#2a2a2a] hover:bg-[#0d0d0d] transition-all"
        >
          Connect to view positions
        </button>
      </div>
    );
  }

  return (
    <div className="border-t border-[#1a1a1a] px-4 py-3">
      {/* Header with Open/Closed tabs */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-bold text-white">Your positions</span>
        <div className="flex items-center gap-0.5 bg-[#0d0d0d] border border-[#1a1a1a] rounded-full p-0.5">
          <button
            onClick={() => setPosTab("open")}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
              posTab === "open" ? "bg-[#1a1a1a] text-white" : "text-[#4b5563] hover:text-[#9ca3af]"
            }`}
          >
            {posTab === "open" && (
              <span className="size-1.5 rounded-full bg-[#22c55e] inline-block" />
            )}
            Open
          </button>
          <button
            onClick={() => setPosTab("closed")}
            className={`px-3 py-1 rounded-full text-[10px] font-bold transition-all ${
              posTab === "closed" ? "bg-[#1a1a1a] text-white" : "text-[#4b5563] hover:text-[#9ca3af]"
            }`}
          >
            Closed
          </button>
        </div>
      </div>

      {/* Position content */}
      {isLoading ? (
        <div className="h-10 animate-pulse rounded-lg bg-[#111111]" />
      ) : uiAmount > 0 && posTab === "open" ? (
        <div className="bg-[#0d0d0d] rounded-lg border border-[#1a1a1a] px-3 py-2.5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-bold text-white font-mono tabular-nums">
                {uiAmount.toFixed(4)}{" "}
                <span className="text-[#4b5563] font-normal text-xs">{token?.symbol ?? ""}</span>
              </div>
              <div className="text-xs text-[#4b5563] mt-0.5">Current position</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-white font-mono tabular-nums">
                {usdValue > 0 ? formatPrice(usdValue) : "$0.00"}
              </div>
              <div className="text-xs text-[#4b5563] mt-0.5">Value</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 py-2">
          <div className="size-2 rounded-full bg-[#22c55e]" />
          <span className="text-xs text-[#4b5563]">
            {posTab === "open" ? "No open positions" : "No closed positions"}
          </span>
        </div>
      )}
    </div>
  );
}
