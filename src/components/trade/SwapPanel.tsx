"use client";

import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useJupiterSwap } from "@/hooks/useJupiterSwap";
import { formatVolume } from "@/lib/utils";
import { useTokenOverview } from "@/hooks/useTokenOverview";
import { useLiveTrades } from "@/hooks/useLiveTrades";
import { Settings2, Info, AlertTriangle, ChevronRight } from "lucide-react";

const WSOL = "So11111111111111111111111111111111111111112";

const BUY_PRESETS = [0.1, 0.5, 1, 5];
const SELL_PRESETS = [25, 50, 75, 100];

type Side = "buy" | "sell";

function PctChange({ pct }: { pct: number | null | undefined }) {
  if (pct == null) return <span className="text-[#4b5563]">—</span>;
  const isGain = pct >= 0;
  return (
    <span className={`text-sm font-bold tabular-nums ${isGain ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
      {isGain ? "+" : ""}{pct.toFixed(2)}%
    </span>
  );
}

function SplitBar({ buyCount, sellCount }: { buyCount: number; sellCount: number }) {
  const total = buyCount + sellCount || 1;
  const buyPct = (buyCount / total) * 100;
  return (
    <div className="h-1.5 flex rounded-full overflow-hidden bg-[#1a1a1a]">
      <div className="bg-[#22c55e] h-full transition-all" style={{ width: `${buyPct}%` }} />
      <div className="bg-[#ef4444] flex-1 h-full" />
    </div>
  );
}

export function SwapPanel({ mint }: { mint: string }) {
  const { authenticated, login } = usePrivy();
  const [side, setSide] = useState<Side>("buy");
  const [inputAmount, setInputAmount] = useState("");
  const [slippage, setSlippage] = useState("1");
  const [showSlippage, setShowSlippage] = useState(false);

  const { data: overview } = useTokenOverview(mint);
  const token = overview?.data;

  const { trades } = useLiveTrades(mint);

  const inputMint = side === "buy" ? WSOL : mint;
  const outputMint = side === "buy" ? mint : WSOL;

  const { quote, quoteLoading, isSwapping, executeSwap, priceImpactPct, canSwap } =
    useJupiterSwap(inputMint, outputMint, inputAmount);

  const outputAmount = quote
    ? side === "buy"
      ? parseInt(quote.outAmount) / Math.pow(10, token?.decimals ?? 6)
      : parseInt(quote.outAmount) / 1e9
    : null;

  const blockedImpact = priceImpactPct > 15;
  const highImpact = priceImpactPct > 2;

  const buys = trades.filter((t) => t.side === "buy");
  const sells = trades.filter((t) => t.side === "sell");
  const buyVol = buys.reduce((s, t) => s + (t.volumeUsd ?? 0), 0);
  const sellVol = sells.reduce((s, t) => s + (t.volumeUsd ?? 0), 0);
  // Unique wallets
  const buyWallets = new Set(buys.map((t) => t.owner)).size;
  const sellWallets = new Set(sells.map((t) => t.owner)).size;

  const presets = side === "buy" ? BUY_PRESETS : SELL_PRESETS;

  return (
    <div className="flex flex-col">
      {/* ── Buy / Sell header ── */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-3 border-b border-[#1a1a1a]">
        {/* Buy = solid green pill button */}
        <button
          onClick={() => { setSide("buy"); setInputAmount(""); }}
          className={`flex-1 py-2.5 rounded-lg text-base font-black transition-all ${
            side === "buy"
              ? "bg-[#22c55e] text-black shadow-[0_0_16px_rgba(34,197,94,0.25)]"
              : "bg-[#0f0f0f] text-[#4b5563] border border-[#1a1a1a] hover:text-white"
          }`}
        >
          Buy
        </button>
        {/* Sell = text or muted button */}
        <button
          onClick={() => { setSide("sell"); setInputAmount(""); }}
          className={`flex-1 py-2.5 rounded-lg text-base font-black transition-all ${
            side === "sell"
              ? "bg-[#ef4444] text-white shadow-[0_0_16px_rgba(239,68,68,0.25)]"
              : "bg-[#0f0f0f] text-[#4b5563] border border-[#1a1a1a] hover:text-white"
          }`}
        >
          Sell
        </button>
      </div>

      {/* ── Amount input — fomo style ── */}
      <div className="px-4 pt-3 pb-2">
        <div
          className="flex items-center justify-between bg-[#0d0d0d] border border-[#1f1f1f] rounded-lg px-4 py-3 focus-within:border-[#2d2d2d] transition-colors cursor-text"
          onClick={(e) => (e.currentTarget.querySelector("input") as HTMLInputElement)?.focus()}
        >
          <input
            type="number"
            value={inputAmount}
            onChange={(e) => setInputAmount(e.target.value)}
            placeholder="0"
            className="bg-transparent text-white font-mono text-4xl font-black focus:outline-none placeholder:text-[#1f1f1f] w-0 flex-1 min-w-0"
          />
          <span className="text-[#4b5563] text-sm font-semibold ml-3 shrink-0 whitespace-nowrap">
            {inputAmount ? `${side === "buy" ? "SOL" : (token?.symbol ?? "TOKEN")}` : "Enter amount"}
          </span>
        </div>

        {/* ── Presets row ── */}
        <div className="flex gap-1.5 mt-2">
          {presets.map((p) => {
            const val = p.toString();
            const isActive = inputAmount === val;
            return (
              <button
                key={p}
                onClick={() => setInputAmount(isActive ? "" : val)}
                className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${
                  isActive
                    ? side === "buy"
                      ? "bg-[#22c55e]/15 text-[#22c55e] border border-[#22c55e]/30"
                      : "bg-[#ef4444]/15 text-[#ef4444] border border-[#ef4444]/30"
                    : "bg-[#111111] text-[#6b7280] border border-transparent hover:text-white hover:bg-[#161616]"
                }`}
              >
                {side === "buy" ? p : `${p}%`}
              </button>
            );
          })}
          <button
            onClick={() => setShowSlippage(!showSlippage)}
            title="Slippage settings"
            className="px-2.5 py-1.5 rounded-md bg-[#111111] hover:bg-[#161616] transition-all border border-transparent hover:border-[#1f1f1f]"
          >
            <Settings2 className="size-3.5 text-[#4b5563]" />
          </button>
        </div>

        {/* Balance */}
        <div className="text-xs text-[#4b5563] mt-2 px-0.5">
          $0 available
        </div>
      </div>

      {/* ── Slippage panel ── */}
      {showSlippage && (
        <div className="mx-4 mb-3 flex items-center gap-1.5 bg-[#0d0d0d] rounded-lg p-2.5 border border-[#1f1f1f]">
          <span className="text-[10px] text-[#4b5563] uppercase tracking-wide mr-1 shrink-0">Slippage</span>
          {["0.5", "1", "2", "5"].map((s) => (
            <button
              key={s}
              onClick={() => setSlippage(s)}
              className={`px-2 py-1 text-[11px] font-semibold rounded transition-colors ${
                slippage === s ? "bg-[#1f1f1f] text-white" : "text-[#4b5563] hover:text-white"
              }`}
            >
              {s}%
            </button>
          ))}
          <input
            type="number"
            value={slippage}
            onChange={(e) => setSlippage(e.target.value)}
            className="ml-auto w-12 bg-[#1a1a1a] border border-[#2a2a2a] rounded px-2 py-1 text-[11px] text-white font-mono focus:outline-none"
          />
        </div>
      )}

      {/* ── Quote output ── */}
      {inputAmount && (
        <div className="mx-4 mb-3 bg-[#0d0d0d] border border-[#1f1f1f] rounded-lg px-3 py-2.5 space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-xs text-[#6b7280]">You receive</span>
            <span className="text-sm font-mono font-bold text-white">
              {quoteLoading ? (
                <span className="inline-block w-24 h-4 bg-[#1f1f1f] rounded animate-pulse" />
              ) : outputAmount != null ? (
                `${outputAmount.toFixed(4)} ${side === "buy" ? (token?.symbol ?? "") : "SOL"}`
              ) : "—"}
            </span>
          </div>
          {quote && !quoteLoading && (
            <div className="flex justify-between pt-1 border-t border-[#111111]">
              <span className="text-[10px] text-[#374151]">Price impact</span>
              <span className={`text-[10px] font-mono ${blockedImpact ? "text-[#ef4444]" : highImpact ? "text-orange-400" : "text-[#4b5563]"}`}>
                {priceImpactPct.toFixed(2)}%
              </span>
            </div>
          )}
          {blockedImpact && (
            <div className="flex gap-1.5 items-center text-[10px] text-[#ef4444] bg-[#ef4444]/5 rounded px-2 py-1.5 border border-[#ef4444]/15 mt-1">
              <AlertTriangle className="size-3 shrink-0" />
              Price impact &gt;15% — swap blocked
            </div>
          )}
        </div>
      )}

      {/* ── Action button — dark style like fomo ── */}
      <div className="px-4 pb-4">
        {!authenticated ? (
          <button
            onClick={() => login()}
            className="w-full py-3.5 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] text-white font-bold text-sm hover:bg-[#222222] transition-all"
          >
            Connect Wallet
          </button>
        ) : (
          <button
            onClick={executeSwap}
            disabled={!canSwap || blockedImpact || isSwapping}
            className={`w-full py-3.5 rounded-lg font-black text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
              side === "buy"
                ? "bg-[#14532d] text-[#22c55e] hover:bg-[#166534] border border-[#22c55e]/20"
                : "bg-[#450a0a] text-[#ef4444] hover:bg-[#7f1d1d] border border-[#ef4444]/20"
            }`}
          >
            {isSwapping
              ? "Confirming..."
              : quoteLoading && inputAmount
              ? "Getting quote..."
              : side === "buy"
              ? `Buy ${token?.symbol ?? ""}`
              : `Sell ${token?.symbol ?? ""}`}
          </button>
        )}
      </div>

      {/* ── Divider ── */}
      <div className="h-px bg-[#111111] mx-4" />

      {/* ── Token info rows ── */}
      <div className="px-4 py-3 space-y-1.5">
        <div className="flex items-center justify-between py-2 px-3 bg-[#0d0d0d] rounded-lg border border-[#111111]">
          <div className="flex items-center gap-2">
            <div className="size-4 rounded-full bg-[#9945ff] flex items-center justify-center shrink-0">
              <span className="text-[8px] font-black text-white">◎</span>
            </div>
            <span className="text-sm text-[#9ca3af]">Solana token</span>
          </div>
          <Info className="size-3.5 text-[#2d2d2d]" />
        </div>
        {token?.liquidity != null && token.liquidity < 100_000 && (
          <div className="flex items-center justify-between py-2 px-3 bg-[#0d0d0d] rounded-lg border border-[#111111]">
            <div className="flex items-center gap-2">
              <AlertTriangle className="size-4 text-[#f59e0b] shrink-0" />
              <span className="text-sm text-[#9ca3af]">Low liquidity token</span>
            </div>
            <Info className="size-3.5 text-[#2d2d2d]" />
          </div>
        )}
      </div>

      {/* ── Divider ── */}
      <div className="h-px bg-[#111111] mx-4" />

      {/* ── About ── */}
      <div className="px-4 py-3">
        <div className="text-sm font-bold text-white mb-1">About {token?.symbol ?? "Token"}</div>
        <div className="text-xs text-[#4b5563] leading-relaxed">No description found</div>
      </div>

      {/* ── Divider ── */}
      <div className="h-px bg-[#111111] mx-4" />

      {/* ── Timeframe performance ── */}
      {token && (
        <div className="px-4 py-3">
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { label: "5M", pct: token.priceChange30mPercent },
              { label: "1H", pct: token.priceChange1hPercent },
              { label: "4H", pct: token.priceChange4hPercent },
              { label: "1D", pct: token.priceChange24hPercent },
            ].map(({ label, pct }) => (
              <div key={label} className="bg-[#0d0d0d] border border-[#111111] rounded-lg px-2 py-2.5 text-center">
                <div className="text-[10px] text-[#4b5563] uppercase mb-1.5">{label}</div>
                <PctChange pct={pct} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Buy/Sell stats ── */}
      {trades.length > 0 && (
        <>
          <div className="h-px bg-[#111111] mx-4" />
          <div className="px-4 py-3 space-y-3">
            {/* Buys vs Sells count */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm font-semibold">
                <span className="text-white">{buys.length} <span className="text-[#22c55e]">buys</span></span>
                <span className="text-white">{sells.length} <span className="text-[#ef4444]">sells</span></span>
              </div>
              <SplitBar buyCount={buys.length} sellCount={sells.length} />
            </div>

            {/* Volume */}
            {(buyVol > 0 || sellVol > 0) && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm font-semibold">
                  <span className="text-white">{formatVolume(buyVol)} <span className="text-[#4b5563] font-normal text-xs">vol.</span></span>
                  <span className="text-white">{formatVolume(sellVol)} <span className="text-[#4b5563] font-normal text-xs">vol.</span></span>
                </div>
                <SplitBar buyCount={buyVol} sellCount={sellVol} />
              </div>
            )}

            {/* Unique wallets */}
            {(buyWallets > 0 || sellWallets > 0) && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm font-semibold">
                  <span className="text-white">{buyWallets} <span className="text-[#22c55e]">buyers</span></span>
                  <span className="text-white">{sellWallets} <span className="text-[#ef4444]">sellers</span></span>
                </div>
                <SplitBar buyCount={buyWallets} sellCount={sellWallets} />
              </div>
            )}

            <button className="w-full py-2 rounded-lg border border-[#1f1f1f] text-xs font-semibold text-[#6b7280] hover:text-white hover:border-[#2a2a2a] hover:bg-[#0d0d0d] transition-all flex items-center justify-center gap-1">
              View more <ChevronRight className="size-3" />
            </button>
          </div>
        </>
      )}

      <div className="h-4" />
    </div>
  );
}
