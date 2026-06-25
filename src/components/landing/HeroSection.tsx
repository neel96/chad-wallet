"use client";

import Image from "next/image";
import { usePrivy } from "@privy-io/react-auth";
import { shortenAddress } from "@/lib/utils";
import AppDownloadButtons from "./AppDownloadButtons";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

const HAS_PRIVY = Boolean(process.env.NEXT_PUBLIC_PRIVY_APP_ID);

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px] shrink-0">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px] shrink-0">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function SolanaIcon() {
  return (
    <svg
  width="20"
  height="20"
  viewBox="0 0 397.7 311.7"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <defs>
    <linearGradient
      id="solana-gradient"
      x1="360.879"
      y1="351.455"
      x2="141.213"
      y2="-69.293"
      gradientUnits="userSpaceOnUse"
    >
      <stop stopColor="#00FFA3" />
      <stop offset="1" stopColor="#DC1FFF" />
    </linearGradient>
  </defs>

  <path
    d="M64.6 237.4c2.4-2.4 5.7-3.8 9.1-3.8h314.9c5.7 0 8.6 6.9 4.6 10.9l-62.2 62.2c-2.4 2.4-5.7 3.8-9.1 3.8H7c-5.7 0-8.6-6.9-4.6-10.9l62.2-62.2z"
    fill="url(#solana-gradient)"
  />
  <path
    d="M64.6 2.4C67 0 70.3-1.4 73.7-1.4h314.9c5.7 0 8.6 6.9 4.6 10.9L331 71.7c-2.4 2.4-5.7 3.8-9.1 3.8H7c-5.7 0-8.6-6.9-4.6-10.9L64.6 2.4z"
    fill="url(#solana-gradient)"
  />
  <path
    d="M331 119.3c-2.4-2.4-5.7-3.8-9.1-3.8H7c-5.7 0-8.6 6.9-4.6 10.9l62.2 62.2c2.4 2.4 5.7 3.8 9.1 3.8h314.9c5.7 0 8.6-6.9 4.6-10.9L331 119.3z"
    fill="url(#solana-gradient)"
  />
</svg>
  );
}

function Spinner({ dark }: { dark?: boolean }) {
  return (
    <span
      className={`size-4 rounded-full border-2 animate-spin shrink-0 ${
        dark ? "border-black/20 border-t-black" : "border-white/20 border-t-white"
      }`}
    />
  );
}

function AuthButtons() {
  const { ready, authenticated, user, login, logout } = usePrivy();

  const wallet =
    user?.linkedAccounts?.find(
      (a) => a.type === "wallet" && (a as { chainType?: string }).chainType === "solana"
    ) ?? user?.linkedAccounts?.find((a) => a.type === "wallet");

  if (authenticated) {
    return (
      <div className="flex flex-col items-start gap-3">
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#39ff14]/20 bg-[#39ff14]/5 text-sm text-[#39ff14]">
          <span
            className="size-2 rounded-full bg-[#39ff14] shrink-0"
            style={{ animation: "glow-pulse 2s ease-in-out infinite" }}
          />
          {wallet
            ? shortenAddress((wallet as { address: string }).address)
            : (user?.email?.address ?? "Connected")}
        </div>
        <button
          onClick={logout}
          className="text-xs text-[#6b7280] hover:text-white transition-colors underline underline-offset-2"
        >
          Disconnect wallet
        </button>
      </div>
    );
  }

  // Render real buttons immediately — disabled with inline spinner while Privy initialises.
  // This prevents an infinite skeleton when the domain isn't yet whitelisted in Privy.
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        onClick={() => login({ loginMethods: ["apple"] })}
        disabled={!ready}
        className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white text-black font-semibold text-sm min-w-[210px] shadow-lg shadow-white/5 transition-all disabled:opacity-60 disabled:cursor-not-allowed enabled:hover:bg-gray-100 enabled:hover:scale-[1.02] enabled:active:scale-[0.97]"
      >
        {!ready ? <Spinner dark /> : <AppleIcon />}
        Sign in with Apple
      </button>
      <button
        onClick={() => login({ loginMethods: ["google"] })}
        disabled={!ready}
        className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl border border-[#252525] bg-[#111111] text-white font-semibold text-sm min-w-[210px] transition-all disabled:opacity-60 disabled:cursor-not-allowed enabled:hover:bg-[#181818] enabled:hover:scale-[1.02] enabled:active:scale-[0.97]"
      >
        {!ready ? <Spinner /> : <GoogleIcon />}
        Sign in with Google
      </button>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(57,255,20,0.06) 0%, transparent 70%)",
            animation: "glow-pulse 5s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(153,69,255,0.04) 0%, transparent 70%)" }}
        />
      </div>

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 xl:gap-24 items-center">
          {/* Left: content */}
          <div className="flex flex-col gap-8 max-w-2xl">
            {/* Live label */}
            <div className="flex items-center gap-2 w-fit px-3.5 py-1.5 rounded-full border border-[#39ff14]/20 bg-[#39ff14]/5">
              <span
                className="size-1.5 rounded-full bg-[#39ff14] shrink-0"
                style={{ animation: "glow-pulse 2s ease-in-out infinite" }}
              />
              <span className="text-xs font-medium text-[#39ff14] tracking-wide">POWERED BY SOLANA</span>
            </div>

            {/* Headline */}
            <div>
              <h1 className="text-[clamp(3.5rem,8vw,6.5rem)] font-black tracking-tighter leading-[0.9] text-white">
                Trade<br />
                Solana<br />
                <span
                  style={{
                    background: "linear-gradient(90deg, #39ff14 0%, #a8ff5c 40%, #39ff14 80%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundSize: "200% auto",
                    animation: "shimmer 4s linear infinite",
                    display: "block",
                  }}
                >
                  Like a Chad.
                </span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-[#9ca3af] leading-relaxed max-w-lg">
                The fastest Solana wallet for discovering trending tokens, trading memecoins, and copying top KOLs — all in one sleek app.
              </p>
            </div>

            {/* Auth — only mount when Privy is configured; without a provider usePrivy() returns ready:false forever */}
            {HAS_PRIVY && (
              <ErrorBoundary
                fallback={
                  <p className="text-sm text-[#6b7280]">
                    Download the app to start trading.
                  </p>
                }
              >
                <AuthButtons />
              </ErrorBoundary>
            )}

            {/* App download */}
            <div className="flex flex-col gap-4">
              <p className="text-xs text-[#4b5563] uppercase tracking-widest font-medium">Available on</p>
              <AppDownloadButtons />
            </div>

            {/* Solana badge */}
            <div className="flex items-center gap-2 text-xs text-[#4b5563]">
              <SolanaIcon />
              <span>Built on Solana</span>
            </div>
          </div>

          {/* Right: phone mockup */}
          <div className="hidden lg:flex justify-end items-center shrink-0">
            <div className="relative" style={{ animation: "float 7s ease-in-out infinite" }}>
              {/* Green glow behind phone */}
              <div
                className="absolute inset-0 rounded-[48px] -z-10"
                style={{
                  background: "radial-gradient(ellipse, rgba(57,255,20,0.25) 0%, transparent 70%)",
                  transform: "scale(1.1)",
                  animation: "glow-pulse 4s ease-in-out infinite",
                }}
              />

              {/* Phone shell */}
              <div className="relative w-[280px] xl:w-[300px] h-[580px] xl:h-[620px] rounded-[44px] border-[1.5px] border-[#252525] bg-[#0c0c0c] overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.9),0_0_0_0.5px_rgba(255,255,255,0.05)_inset]">
                {/* Status bar notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-[#0c0c0c] rounded-b-3xl z-10 flex items-end justify-center pb-1">
                  <div className="w-12 h-1 rounded-full bg-[#1a1a1a]" />
                </div>
                <Image
                  src="/assets/images/splash.png"
                  alt="ChadWallet App"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Bottom home indicator area */}
                <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-[#0c0c0c]/80 to-transparent z-10 flex items-end justify-center pb-1.5">
                  <div className="w-24 h-1 rounded-full bg-white/20" />
                </div>
              </div>

              {/* Floating chips */}
              <div
                className="absolute -left-28 top-[22%] flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#252525] bg-[#0e0e0e]/95 backdrop-blur-sm shadow-2xl whitespace-nowrap"
                style={{ animation: "float 5s ease-in-out infinite 0.5s" }}
              >
                <span className="text-[#39ff14] text-sm">⚡</span>
                <span className="text-xs font-medium text-white">Instant swaps</span>
              </div>

              <div
                className="absolute -right-24 top-[38%] flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#39ff14]/25 bg-[#39ff14]/8 backdrop-blur-sm shadow-2xl whitespace-nowrap"
                style={{ animation: "float 6s ease-in-out infinite 1s" }}
              >
                <span className="text-sm">🔒</span>
                <span className="text-xs font-medium text-[#39ff14]">Non-custodial</span>
              </div>

              <div
                className="absolute -left-24 bottom-[28%] flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#252525] bg-[#0e0e0e]/95 backdrop-blur-sm shadow-2xl whitespace-nowrap"
                style={{ animation: "float 8s ease-in-out infinite 0.2s" }}
              >
                <span className="text-sm">📈</span>
                <span className="text-xs font-medium text-white">Live charts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
