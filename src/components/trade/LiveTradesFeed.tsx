"use client";

import { useRef, memo } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useLiveTrades } from "@/hooks/useLiveTrades";
import { shortenAddress, formatPrice, timeAgo } from "@/lib/utils";
import { SkeletonRow } from "@/components/ui/Skeleton";
import type { TokenTx } from "@/types/birdeye";

function formatUsd(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(2)}`;
}

const TradeRow = memo(function TradeRow({ tx }: { tx: TokenTx }) {
  const isBuy = tx.side === "buy";
  const usdValue = tx.priceUsd != null && tx.from.uiAmount != null
    ? tx.priceUsd * tx.from.uiAmount
    : null;
  const tokenAmt = tx.from.uiAmount ?? null;

  return (
    <div
      className={`relative flex items-center gap-2.5 px-3 py-2 text-xs transition-colors border-b border-[#0f0f0f] ${
        isBuy ? "hover:bg-[#022c1a]" : "hover:bg-[#2c0a0a]"
      }`}
    >
      {/* Left accent */}
      <div className={`absolute left-0 top-0 bottom-0 w-[3px] ${isBuy ? "bg-[#22c55e]" : "bg-[#ef4444]"}`} />

      {/* Side badge */}
      <span className={`shrink-0 w-5 h-5 flex items-center justify-center rounded text-[10px] font-black ${
        isBuy ? "bg-[#22c55e]/15 text-[#22c55e]" : "bg-[#ef4444]/15 text-[#ef4444]"
      }`}>
        {isBuy ? "B" : "S"}
      </span>

      {/* USD amount — bold, colored */}
      <span className={`font-mono font-bold tabular-nums min-w-[56px] text-sm ${
        isBuy ? "text-[#22c55e]" : "text-[#ef4444]"
      }`}>
        {usdValue != null ? formatUsd(usdValue) : "—"}
      </span>

      {/* Token amount */}
      <span className="flex-1 font-mono text-[#6b7280] tabular-nums truncate text-xs">
        {tokenAmt != null
          ? tokenAmt >= 1_000_000
            ? `${(tokenAmt / 1_000_000).toFixed(2)}M`
            : tokenAmt >= 1_000
            ? `${(tokenAmt / 1_000).toFixed(2)}K`
            : tokenAmt.toFixed(2)
          : "—"}
        {" "}<span className="text-[#374151]">{tx.from.symbol ?? ""}</span>
      </span>

      {/* Price */}
      <span className="font-mono text-[#4b5563] tabular-nums shrink-0 text-xs">
        {tx.priceUsd ? formatPrice(tx.priceUsd) : "—"}
      </span>

      {/* Wallet */}
      <a
        href={`https://solscan.io/account/${tx.owner}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#4b5563] hover:text-[#9ca3af] truncate max-w-[56px] text-[10px] font-mono transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {tx.owner ? shortenAddress(tx.owner) : "—"}
      </a>

      {/* Time */}
      <span className="text-[#2d2d2d] shrink-0 text-[10px]">{timeAgo(tx.blockUnixTime)}</span>
    </div>
  );
});

export function LiveTradesFeed({ mint }: { mint: string }) {
  const { trades, isLoading } = useLiveTrades(mint);

  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: trades.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 36,
    overscan: 15,
  });

  if (isLoading && !trades.length) return <SkeletonRow count={6} />;

  return (
    <div className="flex flex-col h-full">
      {/* Column header */}
      <div className="flex items-center gap-2.5 px-3 py-1.5 border-b border-[#1a1a1a] bg-[#080808]">
        <span className="w-5 shrink-0" />
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#374151] min-w-[56px]">Value</span>
        <span className="flex-1 text-[10px] font-semibold uppercase tracking-wider text-[#374151]">Amount</span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#374151]">Price</span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#374151] max-w-[56px]">Wallet</span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#374151]">Time</span>
      </div>

      <div ref={parentRef} className="flex-1 overflow-y-auto">
        {!trades.length ? (
          <div className="flex items-center justify-center h-24 text-sm text-[#374151]">
            No trades yet
          </div>
        ) : (
          <div style={{ height: `${virtualizer.getTotalSize()}px`, position: "relative" }}>
            {virtualizer.getVirtualItems().map((vItem) => (
              <div
                key={trades[vItem.index].txHash}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  transform: `translateY(${vItem.start}px)`,
                  height: `${vItem.size}px`,
                }}
              >
                <TradeRow tx={trades[vItem.index]} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
