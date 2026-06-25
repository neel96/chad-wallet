const STATS = [
  { value: "$2B+", label: "24h trading volume" },
  { value: "50K+", label: "Active traders" },
  { value: "10K+", label: "Tokens tracked" },
  { value: "< 2s", label: "Average trade time" },
];

export default function StatsSection() {
  return (
    <section className="border-y border-[#1a1a1a] bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-[#1a1a1a]">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center lg:px-8 gap-1.5 text-center">
              <span className="text-4xl sm:text-5xl font-black text-white tracking-tight tabular-nums">
                {stat.value}
              </span>
              <span className="text-sm text-[#6b7280]">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
