"use client";

import { useState } from "react";
import { HoldersList } from "./HoldersList";
import { LiveTradesFeed } from "./LiveTradesFeed";

type Tab = "holders" | "swaps";

const TABS: { id: Tab; label: string }[] = [
  { id: "holders", label: "Holders" },
  { id: "swaps", label: "Swaps" },
];

export function TradeTabs({ mint }: { mint: string }) {
  const [tab, setTab] = useState<Tab>("swaps");

  return (
    <div className="flex flex-col h-full">
      {/* Tab bar — fomo style: horizontal tabs with underline */}
      <div className="flex items-end bg-[#080808] border-b border-[#1a1a1a] px-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`relative px-4 py-2.5 text-sm font-semibold transition-colors ${
              tab === t.id ? "text-white" : "text-[#4b5563] hover:text-[#9ca3af]"
            }`}
          >
            {t.label}
            {tab === t.id && (
              <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-white rounded-full" />
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 min-h-0 overflow-hidden">
        {tab === "swaps" ? (
          <LiveTradesFeed mint={mint} />
        ) : (
          <HoldersList mint={mint} />
        )}
      </div>
    </div>
  );
}
