"use client";

export default function VideoSection() {
  return (
    <section className="py-28 px-6 border-t border-[#1a1a1a]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 rounded-full border border-[#39ff14]/20 bg-[#39ff14]/5">
            <span className="text-xs font-medium text-[#39ff14] tracking-wide uppercase">See it in action</span>
          </div>
          <h2 className="text-4xl sm:text-5xl xl:text-6xl font-black text-white tracking-tight leading-tight">
            The fastest Solana<br className="hidden sm:block" /> experience
          </h2>
          <p className="mt-5 text-lg text-[#6b7280] max-w-xl mx-auto">
            From discovery to trade in under 3 taps. ChadWallet is built for speed.
          </p>
        </div>

        {/* Video container */}
        <div className="relative rounded-3xl overflow-hidden border border-[#1a1a1a] bg-[#080808] shadow-[0_40px_80px_rgba(0,0,0,0.7)]">
          {/* Corner accent glows */}
          <div
            className="absolute top-0 left-0 w-72 h-72 rounded-full pointer-events-none -z-0"
            style={{ background: "radial-gradient(circle at top left, rgba(57,255,20,0.06) 0%, transparent 70%)" }}
          />
          <div
            className="absolute bottom-0 right-0 w-72 h-72 rounded-full pointer-events-none -z-0"
            style={{ background: "radial-gradient(circle at bottom right, rgba(153,69,255,0.06) 0%, transparent 70%)" }}
          />

          <video
            src="/assets/images/video/chadwallet.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="relative w-full h-auto max-h-[75vh] object-contain z-10"
          />
        </div>
      </div>
    </section>
  );
}
