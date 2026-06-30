"use client";

import Image from "next/image";
import Link from "next/link";
import { usePrivy } from "@privy-io/react-auth";
import { shortenAddress } from "@/lib/utils";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

const HAS_PRIVY = Boolean(process.env.NEXT_PUBLIC_PRIVY_APP_ID);

const STAR_FIELD =
  "radial-gradient(circle 1px at 5% 3%, rgba(255,255,255,0.9) 0%, transparent 100%)," +
  "radial-gradient(circle 1px at 12% 8%, rgba(255,255,255,0.7) 0%, transparent 100%)," +
  "radial-gradient(circle 1.5px at 19% 2%, rgba(255,255,255,0.85) 0%, transparent 100%)," +
  "radial-gradient(circle 1px at 27% 14%, rgba(255,255,255,0.65) 0%, transparent 100%)," +
  "radial-gradient(circle 1px at 34% 6%, rgba(255,255,255,0.75) 0%, transparent 100%)," +
  "radial-gradient(circle 2px at 43% 10%, rgba(255,255,255,0.45) 0%, transparent 100%)," +
  "radial-gradient(circle 1px at 51% 4%, rgba(255,255,255,0.8) 0%, transparent 100%)," +
  "radial-gradient(circle 1px at 58% 16%, rgba(255,255,255,0.6) 0%, transparent 100%)," +
  "radial-gradient(circle 1.5px at 66% 7%, rgba(255,255,255,0.7) 0%, transparent 100%)," +
  "radial-gradient(circle 1px at 73% 3%, rgba(255,255,255,0.88) 0%, transparent 100%)," +
  "radial-gradient(circle 1px at 81% 12%, rgba(255,255,255,0.65) 0%, transparent 100%)," +
  "radial-gradient(circle 1px at 88% 5%, rgba(255,255,255,0.75) 0%, transparent 100%)," +
  "radial-gradient(circle 1.5px at 94% 9%, rgba(255,255,255,0.8) 0%, transparent 100%)," +
  "radial-gradient(circle 1px at 97% 18%, rgba(255,255,255,0.55) 0%, transparent 100%)," +
  "radial-gradient(circle 1px at 3% 25%, rgba(255,255,255,0.6) 0%, transparent 100%)," +
  "radial-gradient(circle 1px at 8% 35%, rgba(255,255,255,0.5) 0%, transparent 100%)," +
  "radial-gradient(circle 2px at 16% 28%, rgba(255,255,255,0.7) 0%, transparent 100%)," +
  "radial-gradient(circle 1px at 23% 40%, rgba(255,255,255,0.55) 0%, transparent 100%)," +
  "radial-gradient(circle 1.5px at 31% 32%, rgba(255,255,255,0.75) 0%, transparent 100%)," +
  "radial-gradient(circle 1px at 38% 22%, rgba(255,255,255,0.6) 0%, transparent 100%)," +
  "radial-gradient(circle 1px at 47% 38%, rgba(255,255,255,0.7) 0%, transparent 100%)," +
  "radial-gradient(circle 1px at 54% 27%, rgba(255,255,255,0.5) 0%, transparent 100%)," +
  "radial-gradient(circle 1.5px at 62% 33%, rgba(255,255,255,0.65) 0%, transparent 100%)," +
  "radial-gradient(circle 1px at 70% 24%, rgba(255,255,255,0.8) 0%, transparent 100%)," +
  "radial-gradient(circle 1px at 77% 37%, rgba(255,255,255,0.6) 0%, transparent 100%)," +
  "radial-gradient(circle 2px at 85% 28%, rgba(255,255,255,0.5) 0%, transparent 100%)," +
  "radial-gradient(circle 1px at 91% 40%, rgba(255,255,255,0.75) 0%, transparent 100%)," +
  "radial-gradient(circle 1px at 97% 22%, rgba(255,255,255,0.7) 0%, transparent 100%)," +
  "radial-gradient(circle 1px at 6% 55%, rgba(255,255,255,0.5) 0%, transparent 100%)," +
  "radial-gradient(circle 1.5px at 14% 62%, rgba(255,255,255,0.6) 0%, transparent 100%)," +
  "radial-gradient(circle 1px at 22% 50%, rgba(255,255,255,0.7) 0%, transparent 100%)," +
  "radial-gradient(circle 1px at 30% 68%, rgba(255,255,255,0.55) 0%, transparent 100%)," +
  "radial-gradient(circle 1px at 39% 57%, rgba(255,255,255,0.65) 0%, transparent 100%)," +
  "radial-gradient(circle 2px at 46% 73%, rgba(255,255,255,0.45) 0%, transparent 100%)," +
  "radial-gradient(circle 1px at 53% 60%, rgba(255,255,255,0.75) 0%, transparent 100%)," +
  "radial-gradient(circle 1.5px at 61% 66%, rgba(255,255,255,0.6) 0%, transparent 100%)," +
  "radial-gradient(circle 1px at 69% 52%, rgba(255,255,255,0.7) 0%, transparent 100%)," +
  "radial-gradient(circle 1px at 78% 70%, rgba(255,255,255,0.55) 0%, transparent 100%)," +
  "radial-gradient(circle 1px at 86% 58%, rgba(255,255,255,0.65) 0%, transparent 100%)," +
  "radial-gradient(circle 1px at 93% 75%, rgba(255,255,255,0.8) 0%, transparent 100%)," +
  "radial-gradient(circle 1px at 4% 82%, rgba(255,255,255,0.5) 0%, transparent 100%)," +
  "radial-gradient(circle 1.5px at 11% 90%, rgba(255,255,255,0.6) 0%, transparent 100%)," +
  "radial-gradient(circle 1px at 20% 85%, rgba(255,255,255,0.7) 0%, transparent 100%)," +
  "radial-gradient(circle 1px at 29% 78%, rgba(255,255,255,0.55) 0%, transparent 100%)," +
  "radial-gradient(circle 1px at 37% 92%, rgba(255,255,255,0.65) 0%, transparent 100%)," +
  "radial-gradient(circle 2px at 44% 80%, rgba(255,255,255,0.45) 0%, transparent 100%)," +
  "radial-gradient(circle 1px at 52% 88%, rgba(255,255,255,0.75) 0%, transparent 100%)," +
  "radial-gradient(circle 1px at 59% 83%, rgba(255,255,255,0.6) 0%, transparent 100%)," +
  "radial-gradient(circle 1.5px at 67% 95%, rgba(255,255,255,0.7) 0%, transparent 100%)," +
  "radial-gradient(circle 1px at 74% 87%, rgba(255,255,255,0.55) 0%, transparent 100%)," +
  "radial-gradient(circle 1px at 83% 93%, rgba(255,255,255,0.65) 0%, transparent 100%)," +
  "radial-gradient(circle 1px at 90% 80%, rgba(255,255,255,0.8) 0%, transparent 100%)," +
  "radial-gradient(circle 1px at 96% 88%, rgba(255,255,255,0.6) 0%, transparent 100%)";

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
      <div className="flex flex-col items-center gap-3">
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

  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <button
        onClick={() => login({ loginMethods: ["apple"] })}
        disabled={!ready}
        className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white text-black font-semibold text-sm min-w-[200px] shadow-lg shadow-white/5 transition-all disabled:opacity-60 disabled:cursor-not-allowed enabled:hover:bg-gray-100 enabled:hover:scale-[1.02] enabled:active:scale-[0.97]"
      >
        {!ready ? <Spinner dark /> : <AppleIcon />}
        Sign in with Apple
      </button>
      <button
        onClick={() => login({ loginMethods: ["google"] })}
        disabled={!ready}
        className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl border border-[#252525] bg-[#111111] text-white font-semibold text-sm min-w-[200px] transition-all disabled:opacity-60 disabled:cursor-not-allowed enabled:hover:bg-[#181818] enabled:hover:scale-[1.02] enabled:active:scale-[0.97]"
      >
        {!ready ? <Spinner /> : <GoogleIcon />}
        Sign in with Google
      </button>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden">
      {/* Dense star field */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: STAR_FIELD }}
      />

      {/* Cosmic nebula layers — all pointer-events-none so they never block buttons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Planet-like atmosphere — top right */}
        <div
          className="absolute -top-48 -right-48 w-[800px] h-[800px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 55% 45%, rgba(20,80,200,0.28) 0%, rgba(0,30,120,0.14) 35%, transparent 60%)",
          }}
        />
        {/* Purple nebula cluster */}
        <div
          className="absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(153,69,255,0.16) 0%, transparent 65%)",
            animation: "glow-pulse 8s ease-in-out infinite",
          }}
        />
        {/* Blue-teal — left edge */}
        <div
          className="absolute top-[25%] -left-24 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(0,150,255,0.08) 0%, transparent 65%)" }}
        />
        {/* Green center glow */}
        <div
          className="absolute top-[45%] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(57,255,20,0.065) 0%, transparent 55%)",
            animation: "glow-pulse 6s ease-in-out infinite 1s",
          }}
        />
      </div>

      {/* ── Centered text content ── */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-20 pb-12 text-center flex flex-col items-center">
        {/* Floating logo */}
        <div className="mb-8" style={{ animation: "float 6s ease-in-out infinite" }}>
          <Image
            src="/assets/images/logo/dark.png"
            alt="ChadWallet"
            width={96}
            height={96}
            className="rounded-[28px] shadow-[0_0_40px_rgba(57,255,20,0.2)]"
            priority
          />
        </div>

        {/* Social proof pill */}
        <div className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full border border-[#39ff14]/20 bg-[#39ff14]/5">
          <span
            className="size-1.5 rounded-full bg-[#39ff14] shrink-0"
            style={{ animation: "glow-pulse 2s ease-in-out infinite" }}
          />
          <span className="text-xs font-medium text-[#39ff14] tracking-wide">
            join 50,000+ traders making their mark
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-[clamp(2.6rem,8vw,5.5rem)] font-black tracking-tighter leading-[0.92] text-white max-w-3xl">
          where chads become{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #39ff14 0%, #a8ff5c 40%, #39ff14 80%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundSize: "200% auto",
              animation: "shimmer 4s linear infinite",
            }}
          >
            legends.
          </span>
        </h1>

        <p className="mt-5 text-lg sm:text-xl text-[#9ca3af] leading-relaxed max-w-xl">
          From memecoins to viral tokens, trade any Solana asset in seconds. The only wallet built for serious degens.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 items-center justify-center">
          <Link
            href="/trade/So11111111111111111111111111111111111111112"
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#39ff14] text-black font-bold text-sm hover:bg-[#5fff3d] transition-all hover:scale-[1.02] active:scale-[0.97] shadow-[0_0_24px_rgba(57,255,20,0.3)] min-w-[170px]"
          >
            Start trading
            <svg viewBox="0 0 16 16" fill="none" className="size-4 shrink-0">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <a
            href="#download"
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-[#252525] bg-[#111111] text-white font-bold text-sm hover:bg-[#181818] hover:border-[#39ff14]/30 transition-all hover:scale-[1.02] active:scale-[0.97] min-w-[170px]"
          >
            Download app
          </a>
        </div>

        {/* Auth */}
        {HAS_PRIVY && (
          <div className="mt-8">
            <ErrorBoundary
              fallback={<p className="text-sm text-[#6b7280]">Download the app to start trading.</p>}
            >
              <AuthButtons />
            </ErrorBoundary>
          </div>
        )}
      </div>

      {/* ── Phone mockup — centered, large, below text ── */}
      <div className="relative flex justify-center pb-0 px-6 overflow-visible">
        <div className="relative" style={{ animation: "float 7s ease-in-out infinite" }}>
          {/* Dual glow behind phone — pointer-events-none so scaled glows don't block buttons above */}
          <div
            className="absolute inset-0 rounded-[48px] -z-10 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse, rgba(57,255,20,0.28) 0%, transparent 65%)",
              transform: "scale(1.25)",
              animation: "glow-pulse 4s ease-in-out infinite",
            }}
          />
          <div
            className="absolute inset-0 rounded-[48px] -z-10 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse, rgba(153,69,255,0.12) 0%, transparent 75%)",
              transform: "scale(1.7)",
            }}
          />

          {/* Phone shell */}
          <div className="relative w-[280px] sm:w-[320px] h-[560px] sm:h-[640px] rounded-[44px] border-[1.5px] border-[#252525] bg-[#0c0c0c] overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.9),0_0_0_0.5px_rgba(255,255,255,0.05)_inset]">
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
            <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-[#0c0c0c]/80 to-transparent z-10 flex items-end justify-center pb-1.5">
              <div className="w-24 h-1 rounded-full bg-white/20" />
            </div>
          </div>

          {/* Floating chips */}
          <div
            className="absolute -left-36 top-[22%] flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-[#252525] bg-[#0e0e0e]/95 backdrop-blur-sm shadow-2xl whitespace-nowrap"
            style={{ animation: "float 5s ease-in-out infinite 0.5s" }}
          >
            <span className="text-[#39ff14] text-sm">⚡</span>
            <div>
              <div className="text-[10px] text-[#6b7280] leading-none mb-0.5">speed</div>
              <div className="text-xs font-semibold text-white">Instant swaps</div>
            </div>
          </div>

          <div
            className="absolute -right-32 top-[38%] flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-[#39ff14]/25 bg-[#39ff14]/8 backdrop-blur-sm shadow-2xl whitespace-nowrap"
            style={{ animation: "float 6s ease-in-out infinite 1s" }}
          >
            <span className="text-sm">🏆</span>
            <div>
              <div className="text-[10px] text-[#6b7280] leading-none mb-0.5">leaderboard</div>
              <div className="text-xs font-semibold text-[#39ff14]">#1 Chad</div>
            </div>
          </div>

          <div
            className="absolute -left-28 bottom-[28%] flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-[#252525] bg-[#0e0e0e]/95 backdrop-blur-sm shadow-2xl whitespace-nowrap"
            style={{ animation: "float 8s ease-in-out infinite 0.2s" }}
          >
            <span className="text-sm">📈</span>
            <div>
              <div className="text-[10px] text-[#6b7280] leading-none mb-0.5">portfolio</div>
              <div className="text-xs font-semibold text-white">+$12,480</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
