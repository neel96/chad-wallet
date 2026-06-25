import Image from "next/image";

const FEATURES = [
  {
    id: "portfolio",
    title: "Portfolio Tracker",
    description: "Monitor every token and position in real-time with P&L tracking, cost basis, and beautiful charts.",
    image: "/assets/images/flow/portfolio-4.png",
    glow: "rgba(57,255,20,0.12)",
  },
  {
    id: "buy-sell",
    title: "Instant Trading",
    description: "Buy and sell any Solana token in seconds. Jupiter-powered routing always finds the best price.",
    image: "/assets/images/flow/buy-sell-4.png",
    glow: "rgba(0,255,127,0.12)",
  },
  {
    id: "launch",
    title: "Token Launcher",
    description: "Create and launch your own Solana token with auto liquidity setup in under 60 seconds.",
    image: "/assets/images/flow/launch-4.png",
    glow: "rgba(57,255,20,0.12)",
  },
  {
    id: "kol",
    title: "Follow Top KOLs",
    description: "Copy the wallets of top traders and influencers automatically. Never miss a call again.",
    image: "/assets/images/flow/kol-4.png",
    glow: "rgba(153,69,255,0.12)",
  },
  {
    id: "memecoin",
    title: "Memecoin Discovery",
    description: "Surface trending memecoins before they hit Twitter. Real-time feed powered by on-chain data.",
    image: "/assets/images/flow/memecoin-4.png",
    glow: "rgba(0,255,127,0.12)",
  },
  {
    id: "relaunch",
    title: "Token Relaunch",
    description: "Migrate and relaunch tokens with improved tokenomics, fresh liquidity, and better distribution.",
    image: "/assets/images/flow/relaunch-4.png",
    glow: "rgba(57,255,20,0.12)",
  },
];

export default function FeaturesGrid() {
  return (
    <section id="features" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 rounded-full border border-[#39ff14]/20 bg-[#39ff14]/5">
            <span className="text-xs font-medium text-[#39ff14] tracking-wide uppercase">Everything you need</span>
          </div>
          <h2 className="text-4xl sm:text-5xl xl:text-6xl font-black text-white tracking-tight leading-tight">
            Built for serious<br className="hidden sm:block" /> Solana traders
          </h2>
          <p className="mt-5 text-lg text-[#6b7280] max-w-2xl mx-auto leading-relaxed">
            Every tool you need to discover, trade, and profit on Solana — beautifully designed, blindingly fast.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <div
              key={f.id}
              className="group relative rounded-2xl border border-[#1a1a1a] bg-[#0c0c0c] overflow-hidden hover:border-[#2a2a2a] transition-all duration-500 hover:-translate-y-1.5 cursor-default"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at top right, ${f.glow} 0%, transparent 60%)` }}
              />

              {/* Screenshot area */}
              <div className="relative h-52 overflow-hidden bg-[#080808]">
                <Image
                  src={f.image}
                  alt={f.title}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                  unoptimized
                />
                {/* Bottom fade */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0c0c0c] to-transparent" />
              </div>

              {/* Content */}
              <div className="px-5 pb-5 pt-1">
                <h3 className="text-base font-bold text-white mb-1.5">{f.title}</h3>
                <p className="text-sm text-[#6b7280] leading-relaxed">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
