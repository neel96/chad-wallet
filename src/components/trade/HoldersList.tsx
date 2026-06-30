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
    <div className="flex items-center gap-3 px-3 py-2.5 hover:bg-[#0d0d0d] border-b border-[#0f0f0f] transition-colors">
      <span className="w-5 text-right text-xs text-[#374151] shrink-0 font-bold tabular-nums">{rank}</span>

      {/* Wallet avatar placeholder */}
      <div className="size-7 rounded-full bg-[#1a1a1a] border border-[#1f1f1f] shrink-0 flex items-center justify-center">
        <span className="text-[8px] font-bold text-[#4b5563]">{trader.address.slice(0, 2).toUpperCase()}</span>
      </div>

      <div className="flex-1 min-w-0">
        <a
          href={`https://solscan.io/account/${trader.address}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-[#9ca3af] hover:text-white truncate transition-colors font-mono block"
        >
          {shortenAddress(trader.address)}
        </a>
        {trader.tradeBuy != null && trader.tradeSell != null && (
          <span className="text-[10px] text-[#374151]">
            {trader.tradeBuy}B / {trader.tradeSell}S
          </span>
        )}
      </div>

      <div className="text-right shrink-0">
        <div className="text-sm text-[#6b7280] font-mono tabular-nums">{formatVolume(trader.volume ?? 0)}</div>
        <div className={`text-xs font-bold font-mono tabular-nums ${isProfit ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
          {isProfit ? "+" : ""}{formatVolume(pnl)}
        </div>
      </div>
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
    estimateSize: () => 48,
    overscan: 10,
  });

  if (isLoading && !traders.length) return <SkeletonRow count={5} />;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-3 py-1.5 border-b border-[#1a1a1a] bg-[#080808]">
        <span className="w-5 text-right text-[10px] font-semibold uppercase tracking-wider text-[#374151]">#</span>
        <span className="size-7 shrink-0" />
        <span className="flex-1 text-[10px] font-semibold uppercase tracking-wider text-[#374151]">Trader</span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#374151]">Vol / PnL</span>
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
