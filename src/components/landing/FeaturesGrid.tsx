import Image from "next/image";

const FEATURES = [
  {
    id: "leaderboard",
    eyebrow: "LEADERBOARD",
    title: "become a legend,\ntop the leaderboard",
    description: "Compete with traders worldwide. Climb the ranks, flex your P&L, and earn your chad status on-chain.",
    image: "/assets/images/flow/kol-4.png",
    glow: "rgba(57,255,20,0.14)",
    accent: "#39ff14",
  },
  {
    id: "feed",
    eyebrow: "FEED",
    title: "discover and follow\ntop traders",
    description: "A social-first trading feed. See what the best wallets are buying right now and never miss a move.",
    image: "/assets/images/flow/portfolio-4.png",
    glow: "rgba(0,255,127,0.12)",
    accent: "#00ff7f",
  },
  {
    id: "alerts",
    eyebrow: "ALERTS",
    title: "real time notifications\nfor what the best are buying",
    description: "Instant push alerts the moment top KOLs and whales make a move. Be first, every time.",
    image: "/assets/images/flow/memecoin-4.png",
    glow: "rgba(153,69,255,0.12)",
    accent: "#9945ff",
  },
  {
    id: "onboarding",
    eyebrow: "EASY ONBOARDING",
    title: "create an account\nin an instant",
    description: "Sign in with Apple or Google in seconds. No seed phrases, no complexity — just start trading.",
    image: "/assets/images/flow/buy-sell-4.png",
    glow: "rgba(57,255,20,0.12)",
    accent: "#39ff14",
  },
  {
    id: "gasless",
    eyebrow: "ZERO COMPLEXITY",
    title: "multichain &\ngasless",
    description: "Never worry about gas fees or failed transactions. ChadWallet handles everything under the hood.",
    image: "/assets/images/flow/launch-4.png",
    glow: "rgba(0,255,127,0.12)",
    accent: "#00ff7f",
  },
  {
    id: "oneclickbuy",
    eyebrow: "ONE CLICK TO BUY",
    title: "fund with\nApple Pay",
    description: "Top up your wallet and start trading in one tap. Buy SOL directly with Apple Pay — no crypto needed.",
    image: "/assets/images/flow/relaunch-4.png",
    glow: "rgba(57,255,20,0.12)",
    accent: "#39ff14",
  },
];

export default function FeaturesGrid() {
  return (
    <section id="features" className="py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header — left-aligned like fomo.family */}
        <div className="mb-10">
          <h2 className="text-4xl sm:text-5xl xl:text-6xl font-black text-white tracking-tight leading-tight">
            never miss out again
          </h2>
          <p className="mt-2 text-base text-[#6b7280]">
            the only social-first trading app
          </p>
        </div>

        {/* Cards — text on top, image on bottom (fomo.family layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <div
              key={f.id}
              className="group relative rounded-2xl border border-[#1a1a1a] bg-[#0c0c0c] overflow-hidden hover:border-[#2a2a2a] transition-all duration-500 hover:-translate-y-1.5 cursor-default flex flex-col"
            >
              {/* Hover glow — bottom right */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at bottom right, ${f.glow} 0%, transparent 65%)`,
                }}
              />

              {/* Text content — TOP */}
              <div className="px-5 pt-5 pb-4 flex flex-col gap-1.5 relative z-10">
                <div
                  className="text-[10px] font-bold tracking-widest uppercase"
                  style={{ color: f.accent }}
                >
                  {f.eyebrow}
                </div>
                <h3 className="text-base font-bold text-white leading-snug whitespace-pre-line">
                  {f.title}
                </h3>
                <p className="text-xs text-[#6b7280] leading-relaxed">{f.description}</p>
              </div>

              {/* Screenshot — BOTTOM */}
              <div className="relative mt-auto mx-4 mb-4 h-44 rounded-xl overflow-hidden bg-[#080808] flex-shrink-0">
                {/* Top fade so image blends into card */}
                <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#0c0c0c] to-transparent z-10" />
                <Image
                  src={f.image}
                  alt={f.title.replace("\n", " ")}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                  unoptimized
                />
                {/* Bottom fade */}
                <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#0c0c0c] to-transparent z-10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
