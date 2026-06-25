import type { Metadata, Viewport } from "next";
import { Toaster } from "react-hot-toast";
import SWRProvider from "@/components/providers/SWRProvider";
import PrivyAuthProvider from "@/components/providers/PrivyProvider";
import "./globals.css";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://chadwallet.xyz";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#080808",
};

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "ChadWallet — Trade Solana Like a Chad",
    template: "%s — ChadWallet",
  },
  description:
    "The fastest Solana wallet for discovering and trading memecoins. Real-time charts, Jupiter-powered swaps, and KOL tracking — all in one app.",
  keywords: ["Solana", "wallet", "memecoin", "DeFi", "trading", "crypto", "Jupiter", "swap"],
  authors: [{ name: "ChadWallet" }],
  creator: "ChadWallet",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    title: "ChadWallet — Trade Solana Like a Chad",
    description:
      "The fastest Solana wallet for discovering and trading memecoins.",
    siteName: "ChadWallet",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChadWallet — Trade Solana Like a Chad",
    description: "Trade Solana like a chad.",
    creator: "@chadwallet",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-[#080808] text-white antialiased">
        <SWRProvider>
          <PrivyAuthProvider>{children}</PrivyAuthProvider>
        </SWRProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 5000,
            style: {
              background: "#111111",
              color: "#ededed",
              border: "1px solid #1f1f1f",
              borderRadius: "8px",
              fontSize: "14px",
            },
            success: { iconTheme: { primary: "#39ff14", secondary: "#111111" } },
            error: { iconTheme: { primary: "#ff4444", secondary: "#111111" } },
          }}
        />
      </body>
    </html>
  );
}
