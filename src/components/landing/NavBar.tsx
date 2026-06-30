"use client";

import Image from "next/image";
import Link from "next/link";
import { usePrivy } from "@privy-io/react-auth";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { shortenAddress } from "@/lib/utils";

const HAS_PRIVY = Boolean(process.env.NEXT_PUBLIC_PRIVY_APP_ID);

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px] shrink-0 text-white">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function GooglePlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px] shrink-0">
      <path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l14 8.5c.6.37.6 1.23 0 1.6L4.6 21.3c-.66.5-1.6.03-1.6-.8z" fill="#34A853" />
      <path d="M3 3.5l9.5 9.5L3 20.5V3.5z" fill="#4285F4" />
      <path d="M12.5 13L3 20.5l12-7.5H12.5z" fill="#EA4335" />
      <path d="M3 3.5L15.5 11 12.5 13 3 3.5z" fill="#FBBC05" />
    </svg>
  );
}

function NavCTA() {
  const { ready, authenticated, user, login, logout } = usePrivy();

  const wallet =
    user?.linkedAccounts?.find(
      (a) => a.type === "wallet" && (a as { chainType?: string }).chainType === "solana"
    ) ?? user?.linkedAccounts?.find((a) => a.type === "wallet");

  if (!ready) return null;

  if (authenticated) {
    return (
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5 text-xs text-[#39ff14] px-3 py-1.5 rounded-full border border-[#39ff14]/20 bg-[#39ff14]/5">
          <span
            className="size-1.5 rounded-full bg-[#39ff14] shrink-0"
            style={{ animation: "glow-pulse 2s ease-in-out infinite" }}
          />
          {wallet
            ? shortenAddress((wallet as { address: string }).address)
            : (user?.email?.address ?? "Connected")}
        </span>
        <button
          onClick={logout}
          className="text-sm text-[#6b7280] hover:text-white transition-colors"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => login()}
      className="text-sm font-semibold text-white hover:text-[#39ff14] transition-colors"
    >
      Login
    </button>
  );
}

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-[#1a1a1a] bg-[#080808]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-6">
        {/* Logo — left */}
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

        {/* Spacer — pushes everything after it to the right */}
        <div className="flex-1" />

        {/* App download buttons — right */}
        <div className="flex items-center gap-2">
          <a
            href="https://apps.apple.com/us/app/chadwallet/id6757367474"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#1f1f1f] bg-[#111111] hover:bg-[#161616] hover:border-[#2f2f2f] transition-colors"
            aria-label="Download on App Store"
          >
            <AppleIcon />
            <span className="hidden sm:inline text-xs font-medium text-white">App Store</span>
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=xyz.chadwallet.www"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#1f1f1f] bg-[#111111] hover:bg-[#161616] hover:border-[#2f2f2f] transition-colors"
            aria-label="Get it on Google Play"
          >
            <GooglePlayIcon />
            <span className="hidden sm:inline text-xs font-medium text-white">Google Play</span>
          </a>
        </div>

        {/* Login */}
        {HAS_PRIVY ? (
          <ErrorBoundary
            fallback={
              <Link
                href="/trade/So11111111111111111111111111111111111111112"
                className="text-sm font-semibold text-white hover:text-[#39ff14] transition-colors"
              >
                Login
              </Link>
            }
          >
            <NavCTA />
          </ErrorBoundary>
        ) : (
          <Link
            href="/trade/So11111111111111111111111111111111111111112"
            className="text-sm font-semibold text-white hover:text-[#39ff14] transition-colors"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
