"use client";

import { useRef, memo } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useLiveTrades } from "@/hooks/useLiveTrades";
import { shortenAddress, formatPrice, timeAgo } from "@/lib/utils";
import { SkeletonRow } from "@/components/ui/Skeleton";
import type { TokenTx } from "@/types/birdeye";

const TradeRow = memo(function TradeRow({ tx }: { tx: TokenTx }) {
  const isBuy = tx.side === "buy";
  return (
    <div className="flex items-center gap-2 px-3 py-2 hover:bg-[#111111] text-xs border-b border-[#1f1f1f]/50">
      <span
        className={`px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase shrink-0 ${
          isBuy
            ? "bg-[#00ff7f]/10 text-[#00ff7f]"
            : "bg-[#ff4444]/10 text-[#ff4444]"
        }`}
      >
        {tx.side}
      </span>
      <span className="flex-1 font-mono text-white tabular-nums truncate">
        {tx.from.uiAmount?.toFixed(2) ?? tx.from.amount.toString()} {tx.from.symbol ?? ""}
      </span>
      <span className="font-mono text-[#6b7280] tabular-nums shrink-0">
        {tx.priceUsd ? formatPrice(tx.priceUsd) : "—"}
      </span>
      <span className="text-[#6b7280] truncate max-w-[60px]">
        {tx.owner ? shortenAddress(tx.owner) : "—"}
      </span>
      <span className="text-[#374151] shrink-0">{timeAgo(tx.blockUnixTime)}</span>
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

  if (isLoading && !trades.length) return <SkeletonRow count={8} />;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-[#1f1f1f] text-[10px] uppercase tracking-wider text-[#6b7280]">
        <span className="w-8">Side</span>
        <span className="flex-1">Amount</span>
        <span>Price</span>
        <span>Wallet</span>
        <span>Time</span>
      </div>

      <div ref={parentRef} className="flex-1 overflow-y-auto">
        {!trades.length ? (
          <div className="flex items-center justify-center h-32 text-sm text-[#6b7280]">
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
