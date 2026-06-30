import Image from "next/image";

export default function TradeAnywhereSection() {
  return (
    <section className="pt-24 pb-0 px-6 border-t border-[#1a1a1a] overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Centered header — matches fomo.family's "NOW AVAILABLE ON WEB" badge + big headline */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-5 px-3.5 py-1.5 rounded-full border border-[#39ff14]/20 bg-[#39ff14]/5">
            <span className="text-xs font-semibold text-[#39ff14] tracking-widest uppercase">
              Now available on web
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl xl:text-[3.75rem] font-black text-white tracking-tight leading-[1.04]">
            trade from anywhere.<br />never lose a beat.
          </h2>
          <p className="mt-4 text-lg text-[#6b7280] max-w-lg mx-auto leading-relaxed">
            Open a trade on your phone, close it on your desktop — all in one app.
          </p>
        </div>

        {/* Device mockup block — desktop + overlapping phone */}
        <div className="relative pb-16 sm:pb-20">
          {/* Ambient glow behind mockup */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 50% 60%, rgba(57,255,20,0.06) 0%, transparent 60%)",
            }}
          />

          {/* Browser / desktop frame */}
          <div className="relative rounded-2xl border border-[#2a2a2a] bg-[#0e0e0e] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
            {/* macOS-style browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1a1a1a] bg-[#0a0a0a]">
              <div className="size-3 rounded-full bg-[#ff5f57]" />
              <div className="size-3 rounded-full bg-[#febc2e]" />
              <div className="size-3 rounded-full bg-[#28c840]" />
              <div className="ml-4 flex-1 max-w-[240px] h-6 rounded-md bg-[#161616] flex items-center px-3 gap-1.5">
                <svg viewBox="0 0 12 12" fill="none" className="size-2.5 text-[#4b5563] shrink-0">
                  <path d="M6 1a5 5 0 100 10A5 5 0 006 1z" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M6 4v4M4 6h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <span className="text-[9px] text-[#4b5563] font-mono truncate">chadwallet.xyz/trade</span>
              </div>
            </div>

            {/* Screen — portrait phone screenshot scaled/cropped to fill landscape */}
            <div className="relative" style={{ aspectRatio: "16/9", overflow: "hidden" }}>
              {/* Dark gradient overlay to give it a "desktop app" feel */}
              <div className="absolute inset-0 bg-[#0a0a0a] z-0" />
              {/* Left panel: discovery list */}
              <div className="absolute left-0 top-0 bottom-0 w-[45%] overflow-hidden z-10">
                <Image
                  src="/assets/images/discover.png"
                  alt="ChadWallet discovery"
                  fill
                  className="object-cover object-top"
                  unoptimized
                />
              </div>
              {/* Right panel: portfolio/token */}
              <div className="absolute right-0 top-0 bottom-0 w-[57%] overflow-hidden z-10">
                <Image
                  src="/assets/images/portfolio.png"
                  alt="ChadWallet portfolio"
                  fill
                  className="object-cover object-top"
                  unoptimized
                />
              </div>
              {/* Center divider line */}
              <div className="absolute left-[44%] top-0 bottom-0 w-px bg-[#1a1a1a] z-20" />
              {/* Vignette edges */}
              <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#0e0e0e] to-transparent z-30" />
              <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#0e0e0e] to-transparent z-30" />
              <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#0e0e0e] to-transparent z-30" />
            </div>
          </div>

          {/* Phone overlapping bottom-right */}
          <div
            className="absolute right-4 sm:right-10 -bottom-0 w-[110px] sm:w-[140px] z-10"
            style={{ animation: "float 7s ease-in-out infinite 0.5s" }}
          >
            <div
              className="relative rounded-[28px] sm:rounded-[34px] border-[1.5px] border-[#2a2a2a] bg-[#0c0c0c] overflow-hidden"
              style={{
                height: "220px",
                boxShadow: "0 30px 60px rgba(0,0,0,0.85), 0 0 30px rgba(57,255,20,0.12), 0 0 0 0.5px rgba(255,255,255,0.04) inset",
              }}
            >
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-4 bg-[#0c0c0c] rounded-b-2xl z-10" />
              <Image
                src="/assets/images/splash.png"
                alt="ChadWallet mobile"
                fill
                className="object-cover"
                unoptimized
              />
              {/* Bottom indicator */}
              <div className="absolute bottom-0 inset-x-0 h-6 bg-gradient-to-t from-[#0c0c0c]/60 to-transparent z-10 flex items-end justify-center pb-1">
                <div className="w-10 h-0.5 rounded-full bg-white/25" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
