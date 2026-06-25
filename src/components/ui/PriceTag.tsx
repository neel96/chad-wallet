import { cn, formatPctChange } from "@/lib/utils";

interface PriceTagProps {
  pct: number | null | undefined;
  className?: string;
  showArrow?: boolean;
}

export function PriceTag({ pct, className, showArrow = true }: PriceTagProps) {
  if (pct == null || isNaN(pct)) {
    return <span className={cn("text-[#6b7280] text-xs font-mono", className)}>—</span>;
  }
  const isGain = pct >= 0;
  return (
    <span
      className={cn(
        "text-xs font-mono font-medium tabular-nums",
        isGain ? "text-[#00ff7f]" : "text-[#ff4444]",
        className
      )}
    >
      {showArrow && (isGain ? "▲ " : "▼ ")}
      {formatPctChange(pct)}
    </span>
  );
}
