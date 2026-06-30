"use client";

import { useState, useRef, useEffect } from "react";
import { TrendingTokenList } from "./TrendingTokenList";
import { TokenHeader } from "./TokenHeader";
import { PriceChart } from "./PriceChart";
import { TradeTabs } from "./TradeTabs";
import { SwapPanel } from "./SwapPanel";
import { UserPosition } from "./UserPosition";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import Image from "next/image";
import Link from "next/link";
import { Search, Bell, User, Settings, EyeOff, Gift, LogOut, Eye } from "lucide-react";
import { usePrivy } from "@privy-io/react-auth";

type MobileTab = "list" | "chart" | "swap";

function ProfileDropdown({ onClose }: { onClose: () => void }) {
  const { logout } = usePrivy();
  const [blurBalances, setBlurBalances] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  const items = [
    { icon: User, label: "Your profile", action: () => {} },
    { icon: Settings, label: "Manage account", action: () => {} },
    { icon: blurBalances ? Eye : EyeOff, label: "Blur balances", action: () => setBlurBalances(!blurBalances), toggle: true },
    { icon: Gift, label: "Referrals", action: () => {} },
  ];

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full mt-1.5 w-52 bg-[#111111] border border-[#1f1f1f] rounded-xl shadow-2xl shadow-black/60 z-50 overflow-hidden py-1"
    >
      {items.map(({ icon: Icon, label, action, toggle }) => (
        <button
          key={label}
          onClick={() => { action(); if (!toggle) onClose(); }}
          className="flex items-center justify-between w-full px-4 py-2.5 text-sm text-[#9ca3af] hover:text-white hover:bg-[#1a1a1a] transition-colors"
        >
          <div className="flex items-center gap-3">
            <Icon className="size-4 text-[#6b7280]" />
            <span>{label}</span>
          </div>
          {toggle && (
            <div className={`relative w-8 h-4 rounded-full transition-colors ${blurBalances ? "bg-white" : "bg-[#2d2d2d]"}`}>
              <div className={`absolute top-0.5 size-3 rounded-full transition-transform ${blurBalances ? "translate-x-4 bg-black" : "translate-x-0.5 bg-[#4b5563]"}`} />
            </div>
          )}
        </button>
      ))}

      <div className="mx-3 my-1 h-px bg-[#1a1a1a]" />

      <button
        onClick={async () => { await logout(); onClose(); }}
        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-[#f97316] hover:text-[#fb923c] hover:bg-[#1a1a1a] transition-colors"
      >
        <LogOut className="size-4" />
        <span>Log out</span>
      </button>
    </div>
  );
}

function TopNav() {
  const { authenticated, login, user } = usePrivy();
  const [showDropdown, setShowDropdown] = useState(false);

  const walletAddr = user?.wallet?.address;
  const initials = walletAddr
    ? walletAddr.slice(2, 4).toUpperCase()
    : "CW";

  return (
    <div className="flex items-center h-12 px-4 border-b border-[#1a1a1a] bg-[#080808] shrink-0 gap-4">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 shrink-0">
        <Image
          src="/assets/images/logo/dark.png"
          alt="ChadWallet"
          width={24}
          height={24}
          className="rounded-md"
        />
        <span className="text-xl font-black text-white tracking-tight">
          chad
        </span>
      </Link>

      {/* Search — centered */}
      <div className="flex-1 flex justify-center px-4">
        <div className="relative w-full max-w-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#4b5563]" />
          <input
            type="text"
            placeholder="Search for tokens or traders..."
            className="w-full bg-[#0f0f0f] border border-[#1f1f1f] rounded-lg pl-9 pr-20 py-2 text-sm text-[#9ca3af] placeholder:text-[#374151] focus:outline-none focus:border-[#2a2a2a] focus:text-white transition-all"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            <span className="text-xs font-semibold text-[#4b5563] border border-[#1f1f1f] rounded px-1.5 py-0.5 leading-none">Paste</span>
            <span className="text-xs font-mono text-[#2d2d2d] border border-[#1a1a1a] rounded px-1.5 py-0.5 leading-none">/</span>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 shrink-0">
        {authenticated ? (
          <>
            {/* Cash info */}
            <div className="text-right hidden lg:block">
              <div className="text-sm font-semibold text-white leading-tight">
                $0.00 <span className="text-[#4b5563] font-normal text-xs">cash</span>
              </div>
              <button className="text-xs text-[#6366f1] font-semibold hover:text-[#818cf8] transition-colors leading-tight">
                Deposit more
              </button>
            </div>
            <div className="text-right hidden lg:block">
              <div className="text-sm font-semibold text-white leading-tight">$0.00</div>
              <div className="text-xs text-[#4b5563] leading-tight">--</div>
            </div>
          </>
        ) : null}

        <button className="p-1.5 text-[#4b5563] hover:text-[#9ca3af] transition-colors">
          <Bell className="size-4" />
        </button>

        {/* Avatar / dropdown trigger */}
        <div className="relative">
          {authenticated ? (
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="size-8 rounded-full bg-[#6366f1] hover:bg-[#818cf8] transition-colors flex items-center justify-center ring-2 ring-[#6366f1]/20 hover:ring-[#6366f1]/40"
            >
              <span className="text-xs font-black text-white">{initials}</span>
            </button>
          ) : (
            <button
              onClick={() => login()}
              className="px-4 py-1.5 rounded-lg bg-[#22c55e] text-black text-sm font-black hover:bg-[#16a34a] transition-colors"
            >
              Connect
            </button>
          )}
          {showDropdown && authenticated && (
            <ProfileDropdown onClose={() => setShowDropdown(false)} />
          )}
        </div>
      </div>
    </div>
  );
}

export function TradingLayout({ mint }: { mint: string }) {
  const [mobileTab, setMobileTab] = useState<MobileTab>("chart");

  return (
    <>
      {/* Desktop layout */}
      <div className="hidden md:flex flex-col h-screen overflow-hidden">
        <TopNav />

        <div
          className="flex-1 min-h-0 grid overflow-hidden"
          style={{ gridTemplateColumns: "280px 1fr 268px" }}
        >
          {/* Left: Token list */}
          <ErrorBoundary>
            <div className="flex flex-col overflow-hidden border-r border-[#1a1a1a] bg-[#080808]">
              <TrendingTokenList activeMint={mint} />
            </div>
          </ErrorBoundary>

          {/* Center: Chart + bottom tabs */}
          <ErrorBoundary>
            <div className="flex flex-col overflow-hidden bg-[#080808]">
              <TokenHeader mint={mint} />
              <div className="flex-1 min-h-0">
                <PriceChart key={mint} mint={mint} />
              </div>
              <div className="h-[210px] min-h-0 border-t border-[#1a1a1a] overflow-hidden">
                <TradeTabs mint={mint} />
              </div>
            </div>
          </ErrorBoundary>

          {/* Right: Swap panel */}
          <ErrorBoundary>
            <div className="flex flex-col overflow-hidden border-l border-[#1a1a1a] bg-[#080808]">
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
      </div>

      {/* Mobile */}
      <div className="flex flex-col h-screen md:hidden bg-[#080808]">
        <TopNav />
        <div className="border-b border-[#1a1a1a]">
          <TokenHeader mint={mint} />
        </div>
        <div className="flex bg-[#080808] border-b border-[#1a1a1a] px-2">
          {(["chart", "swap", "list"] as MobileTab[]).map((t) => (
            <button
              key={t}
              onClick={() => setMobileTab(t)}
              className={`relative flex-1 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors ${
                mobileTab === t ? "text-white" : "text-[#374151]"
              }`}
            >
              {t === "list" ? "Tokens" : t === "chart" ? "Chart" : "Trade"}
              {mobileTab === t && (
                <span className="absolute bottom-0 left-[20%] right-[20%] h-[2px] bg-[#22c55e] rounded-full" />
              )}
            </button>
          ))}
        </div>
        <div className="flex-1 min-h-0 overflow-hidden">
          {mobileTab === "chart" && (
            <div className="flex flex-col h-full">
              <div className="flex-1 min-h-0"><PriceChart key={mint} mint={mint} /></div>
              <div className="h-48 border-t border-[#1a1a1a] overflow-hidden"><TradeTabs mint={mint} /></div>
            </div>
          )}
          {mobileTab === "swap" && (
            <div className="overflow-y-auto h-full">
              <ErrorBoundary><SwapPanel mint={mint} /></ErrorBoundary>
              <ErrorBoundary><UserPosition mint={mint} /></ErrorBoundary>
            </div>
          )}
          {mobileTab === "list" && <TrendingTokenList activeMint={mint} />}
        </div>
      </div>
    </>
  );
}
