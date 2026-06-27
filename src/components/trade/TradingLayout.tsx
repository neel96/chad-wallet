"use client";

import { useState } from "react";
import { TrendingTokenList } from "./TrendingTokenList";
import { TokenHeader } from "./TokenHeader";
import { PriceChart } from "./PriceChart";
import { TradeTabs } from "./TradeTabs";
import { SwapPanel } from "./SwapPanel";
import { UserPosition } from "./UserPosition";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type MobileTab = "list" | "chart" | "swap";

export function TradingLayout({ mint }: { mint: string }) {
  const [mobileTab, setMobileTab] = useState<MobileTab>("chart");

  return (
    <>
      {/* Desktop: 3-column grid */}
      <div className="hidden md:grid h-screen overflow-hidden" style={{ gridTemplateColumns: "280px 1fr 360px" }}>
        {/* Left: Trending token list */}
        <ErrorBoundary>
          <div className="overflow-hidden">
            <TrendingTokenList activeMint={mint} />
          </div>
        </ErrorBoundary>

        {/* Middle: Chart + tabs */}
        <ErrorBoundary>
          <div className="flex flex-col overflow-hidden border-x border-[#1f1f1f]">
            <TokenHeader mint={mint} />
            <div className="flex-1 min-h-0">
              <PriceChart key={mint} mint={mint} />
            </div>
            <div className="h-64 min-h-0 overflow-hidden">
              <TradeTabs mint={mint} />
            </div>
          </div>
        </ErrorBoundary>

        {/* Right: Swap + position */}
        <ErrorBoundary>
          <div className="flex flex-col overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1f1f1f]">
              <Link
                href="/"
                className="flex items-center gap-1 text-xs text-[#6b7280] hover:text-white transition-colors"
              >
                <ArrowLeft className="size-3" />
                Home
              </Link>
            </div>
            <div className="flex-1 overflow-y-auto">
              <ErrorBoundary>
                <SwapPanel mint={mint} />
              </ErrorBoundary>
              <ErrorBoundary>
                <UserPosition mint={mint} />
              </ErrorBoundary>
            </div>
          </div>
        </ErrorBoundary>
      </div>

      {/* Mobile: tabbed layout */}
      <div className="flex flex-col h-screen md:hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1f1f1f]">
          <Link href="/" className="text-[#6b7280] hover:text-white">
            <ArrowLeft className="size-4" />
          </Link>
          <TokenHeader mint={mint} />
        </div>

        <div className="flex border-b border-[#1f1f1f]">
          {(["chart", "swap", "list"] as MobileTab[]).map((t) => (
            <button
              key={t}
              onClick={() => setMobileTab(t)}
              className={`flex-1 py-2.5 text-xs font-medium capitalize transition-colors ${
                mobileTab === t
                  ? "text-white border-b-2 border-[#39ff14]"
                  : "text-[#6b7280]"
              }`}
            >
              {t === "list" ? "Trending" : t}
            </button>
          ))}
        </div>

        <div className="flex-1 min-h-0 overflow-hidden">
          {mobileTab === "chart" && (
            <div className="flex flex-col h-full">
              <div className="flex-1 min-h-0">
                <PriceChart key={mint} mint={mint} />
              </div>
              <div className="h-48 overflow-hidden">
                <TradeTabs mint={mint} />
              </div>
            </div>
          )}
          {mobileTab === "swap" && (
            <div className="overflow-y-auto h-full">
              <ErrorBoundary><SwapPanel mint={mint} /></ErrorBoundary>
              <ErrorBoundary><UserPosition mint={mint} /></ErrorBoundary>
            </div>
          )}
          {mobileTab === "list" && (
            <TrendingTokenList activeMint={mint} />
          )}
        </div>
      </div>
    </>
  );
}
