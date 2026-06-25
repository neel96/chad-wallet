import Image from "next/image";

const ROWS = [
  {
    id: "discover",
    eyebrow: "Discover",
    title: "Find the next 100x\nbefore anyone else",
    description:
      "ChadWallet's real-time discovery feed surfaces trending tokens, early volume spikes, and KOL activity the moment it happens — before it ever hits Twitter.",
    image: "/assets/images/discover.png",
    flip: false,
  },
  {
    id: "portfolio",
    eyebrow: "Portfolio",
    title: "Your Solana empire\nin one view",
    description:
      "Track every token, position, and wallet with real-time P&L, cost basis, and beautiful performance charts. Know your net worth to the cent at all times.",
    image: "/assets/images/portfolio.png",
    flip: true,
  },
  {
    id: "launch",
    eyebrow: "Launch",
    title: "Go from idea to live\ntoken in 60 seconds",
    description:
      "Built-in token creation with automatic liquidity setup. No code, no complexity — just fill in the details and hit launch. Your community awaits.",
    image: "/assets/images/launch.png",
    flip: false,
  },
  {
    id: "kol",
    eyebrow: "KOL Tracking",
    title: "Trade alongside\nthe whales",
    description:
      "Follow the wallets of top traders and KOLs in real-time. Get instant alerts when they make moves and optionally mirror their trades automatically.",
    image: "/assets/images/kol.png",
    flip: true,
  },
];

export default function FeatureRows() {
  return (
    <section className="py-28 px-6 border-t border-[#1a1a1a]">
      <div className="max-w-7xl mx-auto space-y-36">
        {ROWS.map((row) => (
          <div
            key={row.id}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center ${
              row.flip ? "lg:[&>*:first-child]:order-last" : ""
            }`}
          >
            {/* Content */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2 w-fit px-3.5 py-1.5 rounded-full border border-[#39ff14]/20 bg-[#39ff14]/5">
                <span className="text-xs font-medium text-[#39ff14] tracking-wide uppercase">{row.eyebrow}</span>
              </div>
              <h3 className="text-4xl sm:text-5xl xl:text-[3.25rem] font-black text-white tracking-tight leading-tight whitespace-pre-line">
                {row.title}
              </h3>
              <p className="text-lg text-[#6b7280] leading-relaxed max-w-lg">{row.description}</p>
            </div>

            {/* Image */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-[320px] aspect-[9/18] rounded-[36px] overflow-hidden border border-[#1a1a1a] bg-[#0a0a0a] shadow-[0_40px_100px_rgba(0,0,0,0.6)] group">
                {/* Glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
                  style={{ background: "radial-gradient(circle at top, rgba(57,255,20,0.08) 0%, transparent 60%)" }}
                />
                <Image
                  src={row.image}
                  alt={row.title.replace("\n", " ")}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  unoptimized
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
