"use client";

import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useJupiterSwap } from "@/hooks/useJupiterSwap";
import { formatPrice, formatTokenAmount } from "@/lib/utils";
import { useTokenOverview } from "@/hooks/useTokenOverview";

const WSOL = "So11111111111111111111111111111111111111112";

interface SwapPanelProps {
  mint: string;
}

type Side = "buy" | "sell";

export function SwapPanel({ mint }: SwapPanelProps) {
  const { authenticated, login } = usePrivy();
  const [side, setSide] = useState<Side>("buy");
  const [inputAmount, setInputAmount] = useState("");

  const { data: overview } = useTokenOverview(mint);
  const token = overview?.data;

  const inputMint = side === "buy" ? WSOL : mint;
  const outputMint = side === "buy" ? mint : WSOL;

  const { quote, quoteLoading, isSwapping, executeSwap, priceImpactPct, canSwap } =
    useJupiterSwap(inputMint, outputMint, inputAmount);

  const outputAmount = quote
    ? side === "buy"
      ? parseInt(quote.outAmount) / Math.pow(10, token?.decimals ?? 6)
      : parseInt(quote.outAmount) / 1e9
    : null;

  const highImpact = priceImpactPct > 2;
  const blockedImpact = priceImpactPct > 15;

  const presets = side === "buy"
    ? [0.1, 0.5, 1, 5]
    : [25, 50, 75, 100]; // percent for sell

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Buy / Sell toggle */}
      <div className="flex rounded-lg overflow-hidden border border-[#1f1f1f]">
        <button
          onClick={() => setSide("buy")}
          className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
            side === "buy"
              ? "bg-[#00ff7f]/10 text-[#00ff7f]"
              : "text-[#6b7280] hover:text-white"
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setSide("sell")}
          className={`flex-1 py-2.5 text-sm font-semibold transition-colors ${
            side === "sell"
              ? "bg-[#ff4444]/10 text-[#ff4444]"
              : "text-[#6b7280] hover:text-white"
          }`}
        >
          Sell
        </button>
      </div>

      {/* Amount input */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs text-[#6b7280]">
            {side === "buy" ? "Amount (SOL)" : `Amount (${token?.symbol ?? "tokens"})`}
          </label>
          {token && (
            <span className="text-xs text-[#6b7280]">
              1 {token.symbol} ≈ {formatPrice(token.price)}
            </span>
          )}
        </div>
        <div className="relative">
          <input
            type="number"
            value={inputAmount}
            onChange={(e) => setInputAmount(e.target.value)}
            placeholder="0.00"
            className="w-full bg-[#111111] border border-[#1f1f1f] rounded-lg px-3 py-3 text-white font-mono text-lg focus:outline-none focus:border-[#39ff14]/50 transition-colors"
          />
          {side === "buy" && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#6b7280]">
              SOL
            </span>
          )}
        </div>

        {/* Quick presets */}
        <div className="flex gap-1.5 mt-2">
          {presets.map((p) => (
            <button
              key={p}
              onClick={() => setInputAmount(side === "buy" ? p.toString() : p.toString())}
              className="flex-1 py-1 text-xs rounded border border-[#1f1f1f] text-[#6b7280] hover:border-[#39ff14]/30 hover:text-white transition-colors"
            >
              {side === "buy" ? `${p} SOL` : `${p}%`}
            </button>
          ))}
        </div>
      </div>

      {/* Quote display */}
      {inputAmount && (
        <div className="rounded-lg bg-[#111111] border border-[#1f1f1f] p-3 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#6b7280]">You receive</span>
            <span className="font-mono text-white tabular-nums">
              {quoteLoading ? (
                <span className="inline-block h-3 w-20 animate-pulse rounded bg-[#1f1f1f]" />
              ) : outputAmount != null ? (
                `${outputAmount.toFixed(4)} ${
                  side === "buy" ? token?.symbol ?? "" : "SOL"
                }`
              ) : (
                "—"
              )}
            </span>
          </div>

          {quote && (
            <>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#6b7280]">Slippage</span>
                <span className="font-mono text-white">{quote.slippageBps / 100}%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#6b7280]">Price impact</span>
                <span
                  className={`font-mono ${
                    blockedImpact
                      ? "text-[#ff4444]"
                      : highImpact
                      ? "text-orange-400"
                      : "text-white"
                  }`}
                >
                  {priceImpactPct.toFixed(2)}%
                </span>
              </div>
            </>
          )}

          {blockedImpact && (
            <p className="text-xs text-[#ff4444]">
              ⚠ Price impact too high (&gt;15%). Swap blocked.
            </p>
          )}
        </div>
      )}

      {/* Action button */}
      {!authenticated ? (
        <button
          onClick={() => login()}
          className="w-full py-3.5 rounded-xl bg-white text-black font-bold text-sm hover:bg-gray-100 transition-colors"
        >
          Connect Wallet
        </button>
      ) : (
        <button
          onClick={executeSwap}
          disabled={!canSwap || blockedImpact}
          className={`w-full py-3.5 rounded-xl font-bold text-sm transition-colors ${
            side === "buy"
              ? "bg-[#00ff7f]/10 border border-[#00ff7f]/30 text-[#00ff7f] hover:bg-[#00ff7f]/20 disabled:opacity-40 disabled:cursor-not-allowed"
              : "bg-[#ff4444]/10 border border-[#ff4444]/30 text-[#ff4444] hover:bg-[#ff4444]/20 disabled:opacity-40 disabled:cursor-not-allowed"
          }`}
        >
          {isSwapping
            ? "Confirming..."
            : quoteLoading
            ? "Getting quote..."
            : `${side === "buy" ? "Buy" : "Sell"} ${token?.symbol ?? ""}`}
        </button>
      )}
    </div>
  );
}
