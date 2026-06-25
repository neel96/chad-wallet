"use client";

import { useRef, memo } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useHolders } from "@/hooks/useHolders";
import { shortenAddress, formatVolume } from "@/lib/utils";
import { SkeletonRow } from "@/components/ui/Skeleton";
import type { TopTrader } from "@/types/birdeye";

const HolderRow = memo(function HolderRow({
  trader,
  rank,
}: {
  trader: TopTrader;
  rank: number;
}) {
  const pnl = trader.pnlUsd ?? trader.pnl ?? 0;
  const isProfit = pnl >= 0;
  return (
    <div className="flex items-center gap-2 px-3 py-2.5 hover:bg-[#111111] text-xs">
      <span className="w-5 text-right text-[#6b7280] shrink-0">{rank}</span>
      <span className="flex-1 font-mono text-white truncate">
        {shortenAddress(trader.address)}
      </span>
      <span className="text-[#6b7280] tabular-nums shrink-0">
        {formatVolume(trader.volume ?? 0)}
      </span>
      <span
        className={`w-20 text-right font-mono tabular-nums shrink-0 ${
          isProfit ? "text-[#00ff7f]" : "text-[#ff4444]"
        }`}
      >
        {isProfit ? "+" : ""}
        {formatVolume(pnl)}
      </span>
    </div>
  );
});

export function HoldersList({ mint }: { mint: string }) {
  const { data, isLoading } = useHolders(mint);
  const traders: TopTrader[] = data?.data?.items ?? [];

  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: traders.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    overscan: 10,
  });

  if (isLoading && !traders.length) return <SkeletonRow count={6} />;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-[#1f1f1f] text-[10px] uppercase tracking-wider text-[#6b7280]">
        <span className="w-5 text-right">#</span>
        <span className="flex-1">Wallet</span>
        <span>Volume</span>
        <span className="w-20 text-right">PnL</span>
      </div>

      <div ref={parentRef} className="flex-1 overflow-y-auto">
        <div style={{ height: `${virtualizer.getTotalSize()}px`, position: "relative" }}>
          {virtualizer.getVirtualItems().map((vItem) => (
            <div
              key={traders[vItem.index].address}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                transform: `translateY(${vItem.start}px)`,
                height: `${vItem.size}px`,
              }}
            >
              <HolderRow trader={traders[vItem.index]} rank={vItem.index + 1} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
