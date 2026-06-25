import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/assets/images/logo/dark.png"
            alt="ChadWallet"
            width={28}
            height={28}
            className="rounded-lg"
          />
          <span className="font-bold text-sm text-white">ChadWallet</span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-6 text-sm text-[#6b7280]">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#download" className="hover:text-white transition-colors">Download</a>
          <a
            href="https://apps.apple.com/us/app/chadwallet/id6757367474"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            App Store
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=xyz.chadwallet.www"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Google Play
          </a>
          <a
            href="https://twitter.com/chadwallet"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1.5"
            aria-label="ChadWallet on X (Twitter)"
          >
            <Image
              src="/assets/images/x.png"
              alt="X"
              width={14}
              height={14}
              className="opacity-50 hover:opacity-100 transition-opacity"
              unoptimized
            />
          </a>
        </nav>

        {/* Copyright */}
        <p className="text-xs text-[#374151]">© 2024 ChadWallet</p>
      </div>
    </footer>
  );
}
