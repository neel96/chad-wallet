"use client";

import { memo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatPrice, formatPctChange } from "@/lib/utils";
import type { BirdEyeToken } from "@/types/birdeye";

interface TokenChipProps {
  token: BirdEyeToken;
  onClick: () => void;
}

const TokenChip = memo(function TokenChip({ token, onClick }: TokenChipProps) {
  const isGain = (token.priceChange24hPercent ?? 0) >= 0;
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-1.5 mr-3 rounded-full border border-[#1f1f1f] bg-[#111111] hover:border-[#39ff14]/30 hover:bg-[#161616] transition-colors shrink-0 cursor-pointer"
      aria-label={`Trade ${token.symbol}`}
    >
      <div className="relative size-5 rounded-full overflow-hidden bg-[#1f1f1f] shrink-0">
        {token.logoURI ? (
          <Image src={token.logoURI} alt={token.symbol} fill className="object-cover" unoptimized />
        ) : (
          <span className="flex items-center justify-center w-full h-full text-[9px] font-bold text-[#6b7280]">
            {token.symbol?.slice(0, 2)}
          </span>
        )}
      </div>
      <span className="text-xs font-semibold text-white">{token.symbol}</span>
      <span className="text-xs font-mono text-white">{formatPrice(token.price ?? 0)}</span>
      {token.priceChange24hPercent != null && (
        <span
          className={`text-[11px] font-mono font-medium ${isGain ? "text-[#00ff7f]" : "text-[#ff4444]"}`}
        >
          {formatPctChange(token.priceChange24hPercent)}
        </span>
      )}
    </button>
  );
});

interface TickerBannerProps {
  tokens: BirdEyeToken[];
  variant?: "top" | "bottom";
}

export function TickerBanner({ tokens, variant = "top" }: TickerBannerProps) {
  const router = useRouter();
  const [paused, setPaused] = useState(false);

  if (!tokens.length) return null;

  // Double array so CSS loop is seamless
  const doubled = [...tokens, ...tokens];

  return (
    <div
      className={`w-full overflow-hidden bg-[#080808]/90 backdrop-blur-sm ${variant === "bottom" ? "border-t border-[#1f1f1f]" : "border-b border-[#1f1f1f]"}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex items-center py-2"
        style={{
          animation: `ticker 40s linear infinite ${variant === "bottom" ? "reverse" : ""}`,
          animationPlayState: paused ? "paused" : "running",
          width: "max-content",
        }}
      >
        {doubled.map((token, i) => (
          <TokenChip
            key={`${token.address}-${i}`}
            token={token}
            onClick={() => router.push(`/trade/${token.address}`)}
          />
        ))}
      </div>
    </div>
  );
}
