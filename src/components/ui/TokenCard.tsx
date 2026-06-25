import { memo } from "react";
import Image from "next/image";
import { cn, formatPrice, formatVolume } from "@/lib/utils";
import { PriceTag } from "./PriceTag";
import type { BirdEyeToken } from "@/types/birdeye";

interface TokenCardProps {
  token: BirdEyeToken;
  isActive?: boolean;
  onClick?: () => void;
  showVolume?: boolean;
  compact?: boolean;
}

export const TokenCard = memo(function TokenCard({
  token,
  isActive,
  onClick,
  showVolume,
  compact,
}: TokenCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors",
        "hover:bg-[#161616] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#39ff14]/30",
        isActive && "bg-[#161616] border-l-2 border-[#39ff14]"
      )}
    >
      <div className="relative shrink-0 size-8 rounded-full overflow-hidden bg-[#1f1f1f]">
        {token.logoURI ? (
          <Image
            src={token.logoURI}
            alt={token.symbol}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <span className="flex items-center justify-center w-full h-full text-xs font-bold text-[#6b7280]">
            {token.symbol?.slice(0, 2) ?? "?"}
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1">
          <span className={cn("font-medium text-white truncate", compact ? "text-xs" : "text-sm")}>
            {token.symbol}
          </span>
          <span className={cn("font-mono tabular-nums text-white", compact ? "text-xs" : "text-sm")}>
            {formatPrice(token.price ?? 0)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-1 mt-0.5">
          {!compact && (
            <span className="text-xs text-[#6b7280] truncate">{token.name}</span>
          )}
          {showVolume && token.v24hUSD != null && (
            <span className="text-xs text-[#6b7280]">{formatVolume(token.v24hUSD)}</span>
          )}
          <PriceTag pct={token.priceChange24hPercent} showArrow={false} />
        </div>
      </div>
    </button>
  );
});
