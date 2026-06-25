export default function AppDownloadButtons() {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-3">
      <a
        href="https://apps.apple.com/us/app/chadwallet/id6757367474"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 px-5 py-3 rounded-xl border border-[#1f1f1f] bg-[#111111] hover:bg-[#161616] transition-colors group"
        aria-label="Download on the App Store"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-6 text-white">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
        <div className="text-left">
          <div className="text-[10px] text-[#6b7280] leading-none">Download on the</div>
          <div className="text-sm font-semibold text-white leading-tight">App Store</div>
        </div>
      </a>

      <a
        href="https://play.google.com/store/apps/details?id=xyz.chadwallet.www"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 px-5 py-3 rounded-xl border border-[#1f1f1f] bg-[#111111] hover:bg-[#161616] transition-colors group"
        aria-label="Get it on Google Play"
      >
        <svg viewBox="0 0 24 24" className="size-6">
          <path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l14 8.5c.6.37.6 1.23 0 1.6L4.6 21.3c-.66.5-1.6.03-1.6-.8z" fill="#34A853" />
          <path d="M3 3.5l9.5 9.5L3 20.5V3.5z" fill="#4285F4" />
          <path d="M12.5 13L3 20.5l12-7.5H12.5z" fill="#EA4335" />
          <path d="M3 3.5L15.5 11 12.5 13 3 3.5z" fill="#FBBC05" />
        </svg>
        <div className="text-left">
          <div className="text-[10px] text-[#6b7280] leading-none">Get it on</div>
          <div className="text-sm font-semibold text-white leading-tight">Google Play</div>
        </div>
      </a>
    </div>
  );
}
