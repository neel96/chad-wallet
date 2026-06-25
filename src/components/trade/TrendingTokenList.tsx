"use client";

import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useTokenList } from "@/hooks/useTokenList";
import { TokenCard } from "@/components/ui/TokenCard";
import { SkeletonRow } from "@/components/ui/Skeleton";
import type { BirdEyeToken } from "@/types/birdeye";

interface TrendingTokenListProps {
  activeMint: string;
}

export function TrendingTokenList({ activeMint }: TrendingTokenListProps) {
  const router = useRouter();
  const { data, isLoading } = useTokenList();
  const tokens: BirdEyeToken[] = data?.data?.tokens ?? [];

  const parentRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer({
    count: tokens.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 56,
    overscan: 10,
  });

  return (
    <div className="flex flex-col h-full border-r border-[#1f1f1f]">
      <div className="px-3 py-3 border-b border-[#1f1f1f]">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#6b7280]">
          Trending
        </h2>
      </div>

      {isLoading && !tokens.length ? (
        <SkeletonRow count={8} />
      ) : (
        <div ref={parentRef} className="flex-1 overflow-y-auto">
          <div
            style={{ height: `${virtualizer.getTotalSize()}px`, position: "relative" }}
          >
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
                  <TokenCard
                    token={token}
                    isActive={token.address === activeMint}
                    onClick={() => router.push(`/trade/${token.address}`)}
                    showVolume
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
