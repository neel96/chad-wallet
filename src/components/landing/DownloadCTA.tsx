import Image from "next/image";
import AppDownloadButtons from "./AppDownloadButtons";

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

export default function DownloadCTA() {
  return (
    <section id="download" className="py-28 px-6 border-t border-[#1a1a1a]">
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden border border-[#1f1f1f] bg-gradient-to-br from-[#0e0e0e] via-[#0a0a0a] to-[#080808] p-12 sm:p-16 xl:p-20 text-center shadow-[0_0_100px_rgba(57,255,20,0.04)]">
          {/* Glows */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(57,255,20,0.07) 0%, transparent 70%)" }}
          />
          <div
            className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(153,69,255,0.07) 0%, transparent 70%)" }}
          />

          {/* Border accent */}
          <div className="absolute inset-[0.5px] rounded-[23px] bg-gradient-to-br from-[#39ff14]/5 via-transparent to-[#9945ff]/5 pointer-events-none" />

          <div className="relative flex flex-col items-center gap-8">
            {/* Logo */}
            <div
              className="relative rounded-[28px] overflow-hidden shadow-[0_0_40px_rgba(57,255,20,0.2)]"
              style={{ animation: "float 6s ease-in-out infinite" }}
            >
              <Image
                src="/assets/images/logo/dark.png"
                alt="ChadWallet"
                width={88}
                height={88}
                className="rounded-[28px]"
              />
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-4xl sm:text-5xl xl:text-6xl font-black text-white tracking-tight">
                Download ChadWallet
              </h2>
              <p className="text-lg text-[#6b7280] max-w-xl mx-auto leading-relaxed">
                Join thousands of Solana traders who are already finding the next gems and trading like chads.
              </p>
            </div>

            <AppDownloadButtons />

            <div className="flex items-center gap-2 text-sm text-[#4b5563]">
              <SolanaIcon />
              <span>Powered by Solana</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
