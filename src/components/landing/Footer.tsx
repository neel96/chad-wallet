import Image from "next/image";
import Link from "next/link";

const LINKS = {
  about: [
    { label: "Features", href: "#features" },
    { label: "Download", href: "#download" },
    { label: "Start Trading", href: "/trade/So11111111111111111111111111111111111111112" },
    { label: "Leaderboard", href: "#features" },
  ],
  social: [
    { label: "Twitter / X", href: "https://twitter.com/chadwallet", external: true },
    { label: "Telegram", href: "https://t.me/chadwallet", external: true },
    { label: "App Store", href: "https://apps.apple.com/us/app/chadwallet/id6757367474", external: true },
    { label: "Google Play", href: "https://play.google.com/store/apps/details?id=xyz.chadwallet.www", external: true },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "Contact", href: "mailto:hello@chadwallet.xyz" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] pt-16 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top: brand + columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/assets/images/logo/dark.png"
                alt="ChadWallet"
                width={32}
                height={32}
                className="rounded-xl"
              />
              <span className="font-bold text-base text-white tracking-tight">ChadWallet</span>
            </Link>
            <p className="text-sm text-[#6b7280] leading-relaxed max-w-[220px]">
              The fastest Solana wallet for traders who don't miss.
            </p>
            <a
              href="https://twitter.com/chadwallet"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 w-fit"
              aria-label="ChadWallet on X"
            >
              <Image
                src="/assets/images/x.png"
                alt="X"
                width={16}
                height={16}
                className="opacity-40 hover:opacity-100 transition-opacity"
                unoptimized
              />
            </a>
          </div>

          {/* About */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#4b5563] mb-4">About</div>
            <ul className="flex flex-col gap-3">
              {LINKS.about.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-[#6b7280] hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#4b5563] mb-4">Social</div>
            <ul className="flex flex-col gap-3">
              {LINKS.social.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.external ? "_blank" : undefined}
                    rel={l.external ? "noopener noreferrer" : undefined}
                    className="text-sm text-[#6b7280] hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#4b5563] mb-4">Legal</div>
            <ul className="flex flex-col gap-3">
              {LINKS.legal.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-[#6b7280] hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#1a1a1a] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#374151]">© 2026 ChadWallet. All rights reserved.</p>
          <p className="text-xs text-[#374151]">Built on Solana ⚡</p>
        </div>
      </div>
    </footer>
  );
}
