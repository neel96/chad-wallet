"use client";

import { useState } from "react";
import { HoldersList } from "./HoldersList";
import { LiveTradesFeed } from "./LiveTradesFeed";

type Tab = "trades" | "holders";

export function TradeTabs({ mint }: { mint: string }) {
  const [tab, setTab] = useState<Tab>("trades");

  return (
    <div className="flex flex-col flex-1 min-h-0 border-t border-[#1f1f1f]">
      <div className="flex border-b border-[#1f1f1f]">
        {(["trades", "holders"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2.5 text-xs font-medium uppercase tracking-wider transition-colors ${
              tab === t
                ? "text-white border-b-2 border-[#39ff14]"
                : "text-[#6b7280] hover:text-white"
            }`}
          >
            {t === "trades" ? "Live Trades" : "Top Traders"}
          </button>
        ))}
      </div>
      <div className="flex-1 min-h-0 overflow-hidden">
        {tab === "trades" ? (
          <LiveTradesFeed mint={mint} />
        ) : (
          <HoldersList mint={mint} />
        )}
      </div>
    </div>
  );
}
