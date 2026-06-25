"use client";

import Image from "next/image";
import { useTokenOverview } from "@/hooks/useTokenOverview";
import { formatPrice, formatVolume, formatPctChange } from "@/lib/utils";
import { Skeleton } from "@/components/ui/Skeleton";

interface TokenHeaderProps {
  mint: string;
}

const intervals = ["1h", "4h", "24h"] as const;

export function TokenHeader({ mint }: TokenHeaderProps) {
  const { data, isLoading } = useTokenOverview(mint);
  const token = data?.data;

  if (isLoading && !token) {
    return (
      <div className="flex items-center gap-4 p-4 border-b border-[#1f1f1f]">
        <Skeleton className="size-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    );
  }

  if (!token) return null;

  const pct24h = token.priceChange24hPercent;
  const isGain = (pct24h ?? 0) >= 0;

  const stats = [
    { label: "24h Vol", value: formatVolume(token.v24hUSD ?? 0) },
    { label: "MCap", value: formatVolume(token.mc ?? 0) },
    { label: "FDV", value: formatVolume(token.fdv ?? 0) },
    { label: "Holders", value: (token.holder ?? 0).toLocaleString() },
    { label: "Liquidity", value: formatVolume(token.liquidity ?? 0) },
  ];

  return (
    <div className="border-b border-[#1f1f1f] bg-[#0a0a0a]">
      <div className="flex items-center gap-4 p-4">
        <div className="relative size-10 rounded-full overflow-hidden bg-[#1f1f1f] shrink-0">
          {token.logoURI ? (
            <Image src={token.logoURI} alt={token.symbol} fill className="object-cover" unoptimized />
          ) : (
            <span className="flex items-center justify-center w-full h-full text-sm font-bold text-[#6b7280]">
              {token.symbol?.slice(0, 2)}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-bold text-white text-lg">{token.symbol}</span>
            <span className="text-sm text-[#6b7280] truncate">{token.name}</span>
          </div>
          <div className="flex items-center gap-3 mt-0.5">
            <span className="text-2xl font-bold font-mono tabular-nums text-white">
              {formatPrice(token.price)}
            </span>
            {pct24h != null && (
              <span
                className={`text-sm font-mono font-medium ${isGain ? "text-[#00ff7f]" : "text-[#ff4444]"}`}
              >
                {isGain ? "▲" : "▼"} {formatPctChange(pct24h)}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 px-4 pb-3 overflow-x-auto">
        {stats.map(({ label, value }) => (
          <div key={label} className="shrink-0 text-center">
            <div className="text-[10px] text-[#6b7280] uppercase tracking-wider">{label}</div>
            <div className="text-xs font-mono text-white mt-0.5">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
