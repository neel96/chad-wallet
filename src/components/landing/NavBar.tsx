"use client";

import Image from "next/image";
import Link from "next/link";
import { usePrivy } from "@privy-io/react-auth";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { shortenAddress } from "@/lib/utils";

const HAS_PRIVY = Boolean(process.env.NEXT_PUBLIC_PRIVY_APP_ID);

function NavCTA() {
  const { ready, authenticated, user, login, logout } = usePrivy();

  const wallet =
    user?.linkedAccounts?.find(
      (a) => a.type === "wallet" && (a as { chainType?: string }).chainType === "solana"
    ) ?? user?.linkedAccounts?.find((a) => a.type === "wallet");

  if (!ready) {
    return (
      <button disabled className="px-5 py-2.5 text-sm font-bold rounded-xl bg-[#39ff14] text-black opacity-60 cursor-not-allowed flex items-center gap-2">
        <span className="size-3.5 rounded-full border-2 border-black/20 border-t-black animate-spin" />
        Get Started
      </button>
    );
  }

  if (authenticated) {
    return (
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5 text-xs text-[#39ff14] px-3 py-1.5 rounded-full border border-[#39ff14]/20 bg-[#39ff14]/5">
          <span className="size-1.5 rounded-full bg-[#39ff14]" style={{ animation: "glow-pulse 2s ease-in-out infinite" }} />
          {wallet
            ? shortenAddress((wallet as { address: string }).address)
            : (user?.email?.address ?? "Connected")}
        </span>
        <button
          onClick={logout}
          className="text-xs text-[#6b7280] hover:text-white transition-colors"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => login()}
      className="px-5 py-2.5 text-sm font-bold rounded-xl bg-[#39ff14] text-black hover:bg-[#5fff3d] transition-all active:scale-[0.97]"
    >
      Get Started
    </button>
  );
}

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-[#1a1a1a] bg-[#080808]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image
            src="/assets/images/logo/dark.png"
            alt="ChadWallet"
            width={34}
            height={34}
            className="rounded-xl"
            priority
          />
          <span className="font-bold text-base text-white tracking-tight">ChadWallet</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-[#6b7280]">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#download" className="hover:text-white transition-colors">Download</a>
          <a
            href="https://twitter.com/chadwallet"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Twitter
          </a>
        </div>

        {HAS_PRIVY ? (
          <ErrorBoundary
            fallback={
              <a
                href="#download"
                className="px-5 py-2.5 text-sm font-bold rounded-xl bg-[#39ff14] text-black hover:bg-[#5fff3d] transition-all active:scale-[0.97]"
              >
                Download
              </a>
            }
          >
            <NavCTA />
          </ErrorBoundary>
        ) : (
          <a
            href="#download"
            className="px-5 py-2.5 text-sm font-bold rounded-xl bg-[#39ff14] text-black hover:bg-[#5fff3d] transition-all active:scale-[0.97]"
          >
            Download
          </a>
        )}
      </div>
    </nav>
  );
}
