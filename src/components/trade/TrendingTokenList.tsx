"use client";

import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTokenList } from "@/hooks/useTokenList";
import { SkeletonRow } from "@/components/ui/Skeleton";
import { formatPrice, formatVolume, cn } from "@/lib/utils";
import type { BirdEyeToken } from "@/types/birdeye";
import { ChevronLeft } from "lucide-react";

interface TrendingTokenListProps {
  activeMint: string;
}

type SubTab = "alerts" | "tokens" | "leaderboard";
type Filter = "watchlist" | "crypto" | "trending" | "most_held";

function TokenRow({
  token,
  isActive,
  onClick,
}: {
  token: BirdEyeToken;
  isActive: boolean;
  onClick: () => void;
}) {
  const pct = token.priceChange24hPercent;
  const isGain = (pct ?? 0) >= 0;

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 px-3 py-3 text-left transition-colors",
        "hover:bg-[#0d0d0d] focus-visible:outline-none",
        isActive ? "bg-[#0f0f0f]" : ""
      )}
    >
      {/* Logo */}
      <div className="relative shrink-0 size-9 rounded-full overflow-hidden bg-[#161616] ring-1 ring-white/[0.06]">
        {token.logoURI ? (
          <Image src={token.logoURI} alt={token.symbol} fill className="object-cover" unoptimized />
        ) : (
          <span className="flex items-center justify-center w-full h-full text-xs font-bold text-[#4b5563]">
            {token.symbol?.slice(0, 2) ?? "?"}
          </span>
        )}
      </div>

      {/* Info: name + price on left, MC + change on right */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <span className="text-sm font-bold text-white truncate leading-tight">{token.symbol}</span>
          <span className="text-sm font-bold text-white whitespace-nowrap leading-tight">
            {token.mc != null ? formatVolume(token.mc) : "—"}{" "}
            <span className="text-[10px] text-[#374151] font-normal">MC</span>
          </span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-mono text-[#6b7280]">
            {formatPrice(token.price ?? 0)}
          </span>
          {pct != null && (
            <span className={`text-xs font-bold whitespace-nowrap ${isGain ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
              {isGain ? "+" : ""}{pct.toFixed(2)}%
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

export function TrendingTokenList({ activeMint }: TrendingTokenListProps) {
  const router = useRouter();
  const { data, isLoading } = useTokenList();
  const [subTab, setSubTab] = useState<SubTab>("tokens");
  const [filter, setFilter] = useState<Filter>("trending");
  const tokens: BirdEyeToken[] = data?.data?.tokens ?? [];

  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: tokens.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 56,
    overscan: 10,
  });

  const SUB_TABS: { id: SubTab; label: string }[] = [
    { id: "alerts", label: "Alerts" },
    { id: "tokens", label: "Tokens" },
    { id: "leaderboard", label: "Leaderboard" },
  ];

  const FILTERS: { id: Filter; label: string }[] = [
    { id: "watchlist", label: "Watchlist" },
    { id: "crypto", label: "Crypto" },
    { id: "trending", label: "Trending" },
    { id: "most_held", label: "Most held" },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Sub-tab header row */}
      <div className="flex items-center border-b border-[#1a1a1a] px-2 pt-1 gap-0.5">
        {SUB_TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setSubTab(t.id)}
            className={`relative px-3 py-2.5 text-sm font-semibold transition-colors whitespace-nowrap ${
              subTab === t.id ? "text-white" : "text-[#4b5563] hover:text-[#9ca3af]"
            }`}
          >
            {t.label}
            {subTab === t.id && (
              <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-white rounded-full" />
            )}
          </button>
        ))}
        <div className="ml-auto pb-1">
          <button className="p-1.5 text-[#374151] hover:text-[#6b7280] transition-colors">
            <ChevronLeft className="size-4" />
          </button>
        </div>
      </div>

      {/* Filter pills */}
      <div className="flex gap-1.5 px-3 py-2 border-b border-[#111111] overflow-x-auto">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              filter === f.id
                ? "bg-[#1f1f1f] text-white"
                : "text-[#4b5563] hover:text-[#9ca3af]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Token list */}
      {isLoading && !tokens.length ? (
        <SkeletonRow count={10} />
      ) : (
        <div ref={parentRef} className="flex-1 overflow-y-auto">
          <div style={{ height: `${virtualizer.getTotalSize()}px`, position: "relative" }}>
            {virtualizer.getVirtualItems().map((vItem) => {
              const token = tokens[vItem.index];
              return (
                <div
                  key={token.address}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    transform: `translateY(${vItem.start}px)`,
                    height: `${vItem.size}px`,
                  }}
                >
                  <TokenRow
                    token={token}
                    isActive={token.address === activeMint}
                    onClick={() => router.push(`/trade/${token.address}`)}
                  />
                </div>
              );
            })}
          </div>
          {!tokens.length && (
            <div className="flex items-center justify-center h-24 text-sm text-[#374151]">
              No tokens found
            </div>
          )}
        </div>
      )}

      {/* Bottom split buttons — matching fomo exactly */}
      <div className="flex items-center border-t border-[#1a1a1a] shrink-0">
        <button className="flex-1 py-2.5 text-xs font-semibold text-[#4b5563] hover:text-[#9ca3af] hover:bg-[#0d0d0d] transition-all border-r border-[#1a1a1a] flex items-center justify-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><rect x="0" y="0" width="5" height="12" rx="1"/><rect x="7" y="0" width="5" height="5" rx="1"/><rect x="7" y="7" width="5" height="5" rx="1"/></svg>
          Split bottom
        </button>
        <button className="flex-1 py-2.5 text-xs font-semibold text-[#4b5563] hover:text-[#9ca3af] hover:bg-[#0d0d0d] transition-all flex items-center justify-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><rect x="0" y="0" width="5" height="12" rx="1"/><rect x="7" y="0" width="5" height="12" rx="1"/></svg>
          Split right
        </button>
      </div>
    </div>
  );
}
