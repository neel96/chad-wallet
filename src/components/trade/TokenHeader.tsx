"use client";

import Image from "next/image";
import { useTokenOverview } from "@/hooks/useTokenOverview";
import { formatPrice, formatVolume } from "@/lib/utils";
import { Skeleton } from "@/components/ui/Skeleton";
import { Globe, Star, Copy, Search, TrendingUp, TrendingDown } from "lucide-react";
import { useState } from "react";

export function TokenHeader({ mint }: { mint: string }) {
  const { data, isLoading } = useTokenOverview(mint);
  const [copied, setCopied] = useState(false);
  const token = data?.data;

  const handleCopy = () => {
    navigator.clipboard.writeText(mint);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  if (isLoading && !token) {
    return (
      <div className="flex items-center gap-4 px-4 py-3 border-b border-[#1a1a1a] h-[58px]">
        <Skeleton className="size-9 rounded-full shrink-0" />
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
        <div className="ml-6 flex gap-8">
          {[1,2,3,4,5].map(i => <Skeleton key={i} className="h-8 w-20" />)}
        </div>
      </div>
    );
  }

  if (!token) return null;

  const pct24h = token.priceChange24hPercent;
  const isGain = (pct24h ?? 0) >= 0;
  const shortAddr = `${mint.slice(0, 6)}...${mint.slice(-4)}`;

  return (
    <div className="flex items-center border-b border-[#1a1a1a] bg-[#080808] overflow-x-auto shrink-0">

      {/* Token identity block */}
      <div className="flex items-center gap-3 px-4 py-3 shrink-0 border-r border-[#1a1a1a]">
        {/* Logo */}
        <div className="relative size-9 rounded-full overflow-hidden bg-[#1a1a1a] shrink-0 ring-1 ring-white/[0.06]">
          {token.logoURI ? (
            <Image src={token.logoURI} alt={token.symbol} fill className="object-cover" unoptimized />
          ) : (
            <span className="flex items-center justify-center w-full h-full text-xs font-black text-[#6b7280]">
              {token.symbol?.slice(0, 2)}
            </span>
          )}
        </div>

        {/* Name + icons + address */}
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-base font-black text-white leading-none">{token.symbol}</span>
            {/* Network icon */}
            <div className="size-4 rounded-full bg-[#9945ff] flex items-center justify-center shrink-0">
              <span className="text-[7px] font-black text-white">◎</span>
            </div>
            <button className="text-[#374151] hover:text-[#9ca3af] transition-colors">
              <Globe className="size-3.5" />
            </button>
            <button className="text-[#374151] hover:text-[#9ca3af] transition-colors">
              <Search className="size-3.5" />
            </button>
            <button className="text-[#374151] hover:text-[#9ca3af] transition-colors">
              <Star className="size-3.5" />
            </button>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-[#4b5563] truncate max-w-[80px]">{token.name}</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 group ml-1"
            >
              <span className="text-[10px] font-mono text-[#374151] group-hover:text-[#6b7280] transition-colors">
                {shortAddr}
              </span>
              <Copy className="size-3 text-[#2d2d2d] group-hover:text-[#4b5563] transition-colors" />
            </button>
            {copied && <span className="text-[10px] text-[#22c55e] font-semibold">Copied!</span>}
          </div>
        </div>
      </div>

      {/* Stat blocks */}
      <div className="flex items-center overflow-x-auto">
        {/* Market cap */}
        <div className="flex flex-col gap-0.5 px-5 py-3 shrink-0 border-r border-[#111111]">
          <span className="text-[10px] font-medium text-[#4b5563] uppercase tracking-wider whitespace-nowrap">Market cap</span>
          <span className="text-sm font-bold text-white whitespace-nowrap">{formatVolume(token.mc ?? 0)}</span>
        </div>

        {/* Price */}
        <div className="flex flex-col gap-0.5 px-5 py-3 shrink-0 border-r border-[#111111]">
          <span className="text-[10px] font-medium text-[#4b5563] uppercase tracking-wider whitespace-nowrap">Price</span>
          <span className="text-sm font-bold text-white whitespace-nowrap font-mono">{formatPrice(token.price)}</span>
        </div>

        {/* 24H change */}
        <div className="flex flex-col gap-0.5 px-5 py-3 shrink-0 border-r border-[#111111]">
          <span className="text-[10px] font-medium text-[#4b5563] uppercase tracking-wider whitespace-nowrap">24H change</span>
          <span className={`text-sm font-bold whitespace-nowrap flex items-center gap-0.5 ${isGain ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
            {isGain ? <TrendingUp className="size-3.5" /> : <TrendingDown className="size-3.5" />}
            {pct24h != null ? `${isGain ? "+" : ""}${pct24h.toFixed(2)}%` : "—"}
          </span>
        </div>

        {/* 24H Vol */}
        <div className="flex flex-col gap-0.5 px-5 py-3 shrink-0 border-r border-[#111111]">
          <span className="text-[10px] font-medium text-[#4b5563] uppercase tracking-wider whitespace-nowrap">24H Vol.</span>
          <span className="text-sm font-bold text-white whitespace-nowrap">{formatVolume(token.v24hUSD ?? 0)}</span>
        </div>

        {/* Liquidity */}
        <div className="flex flex-col gap-0.5 px-5 py-3 shrink-0 border-r border-[#111111]">
          <span className="text-[10px] font-medium text-[#4b5563] uppercase tracking-wider whitespace-nowrap">Liquidity</span>
          <span className="text-sm font-bold text-white whitespace-nowrap">{formatVolume(token.liquidity ?? 0)}</span>
        </div>

        {/* Holders */}
        <div className="flex flex-col gap-0.5 px-5 py-3 shrink-0">
          <span className="text-[10px] font-medium text-[#4b5563] uppercase tracking-wider whitespace-nowrap">Holders</span>
          <span className="text-sm font-bold text-white whitespace-nowrap">
            {token.holder != null
              ? token.holder >= 1000
                ? `${(token.holder / 1000).toFixed(1)}K`
                : token.holder.toLocaleString()
              : "—"}
          </span>
        </div>
      </div>
    </div>
  );
}
