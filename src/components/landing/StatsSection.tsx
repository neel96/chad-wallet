import Link from "next/link";

export default function StatsSection() {
  return (
    <section className="relative border-y border-[#1a1a1a] bg-[#0a0a0a] py-24 px-6 overflow-hidden">
      {/* Nebula background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, rgba(153,69,255,0.08) 0%, rgba(57,255,20,0.04) 40%, transparent 70%)",
          }}
        />
        <div
          className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(153,69,255,0.06) 0%, transparent 65%)" }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(57,255,20,0.06) 0%, transparent 65%)" }}
        />
      </div>

      {/* Floating decorative elements — pointer-events-none so they don't block CTAs */}
      <div
        className="absolute left-[8%] top-[20%] size-10 rounded-full border border-[#1f1f1f] bg-[#111] flex items-center justify-center opacity-60 pointer-events-none"
        style={{ animation: "float 6s ease-in-out infinite 0.3s" }}
      >
        <span className="text-lg">🏆</span>
      </div>
      <div
        className="absolute right-[10%] top-[25%] size-8 rounded-full border border-[#1f1f1f] bg-[#111] flex items-center justify-center opacity-50 pointer-events-none"
        style={{ animation: "float 7s ease-in-out infinite 1s" }}
      >
        <span className="text-sm">⚡</span>
      </div>
      <div
        className="absolute left-[15%] bottom-[20%] size-9 rounded-full border border-[#1f1f1f] bg-[#111] flex items-center justify-center opacity-40 pointer-events-none"
        style={{ animation: "float 5s ease-in-out infinite 0.7s" }}
      >
        <span className="text-base">📈</span>
      </div>
      <div
        className="absolute right-[14%] bottom-[22%] size-10 rounded-full border border-[#39ff14]/15 bg-[#39ff14]/5 flex items-center justify-center opacity-60 pointer-events-none"
        style={{ animation: "float 8s ease-in-out infinite 0.2s" }}
      >
        <span className="text-lg">🚀</span>
      </div>

      {/* Centered content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center gap-5">
        <h2 className="text-4xl sm:text-5xl xl:text-6xl font-black text-white tracking-tight leading-tight">
          a trading app<br />for the rest of us
        </h2>

        <p className="text-base sm:text-lg text-[#9ca3af]">
          join{" "}
          <span className="font-bold text-white">50,000+ traders</span>{" "}
          making their name on{" "}
          <span
            className="font-bold"
            style={{
              background: "linear-gradient(90deg, #39ff14, #a8ff5c)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ChadWallet
          </span>
        </p>

        {/* CTAs — matches fomo.family's "Start trading" + "Download app" in this section */}
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <Link
            href="/trade/So11111111111111111111111111111111111111112"
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#39ff14] text-black font-bold text-sm hover:bg-[#5fff3d] transition-all hover:scale-[1.02] active:scale-[0.97] shadow-[0_0_24px_rgba(57,255,20,0.25)] min-w-[160px]"
          >
            Start trading
            <svg viewBox="0 0 16 16" fill="none" className="size-4 shrink-0">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <a
            href="#download"
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-[#252525] bg-[#111111] text-white font-bold text-sm hover:bg-[#181818] hover:border-[#39ff14]/30 transition-all hover:scale-[1.02] active:scale-[0.97] min-w-[160px]"
          >
            Download app
          </a>
        </div>
      </div>
    </section>
  );
}
