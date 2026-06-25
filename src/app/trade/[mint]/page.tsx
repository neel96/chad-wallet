import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TradingLayout } from "@/components/trade/TradingLayout";
import { birdeye } from "@/lib/birdeye";

interface TradePageProps {
  params: Promise<{ mint: string }>;
}

const SOL_ADDRESS_RE = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

export async function generateMetadata({ params }: TradePageProps): Promise<Metadata> {
  const { mint } = await params;
  if (!SOL_ADDRESS_RE.test(mint)) return { title: "Trade — ChadWallet" };

  try {
    const raw = await birdeye.fetch<{ data?: { symbol?: string; name?: string; price?: number } }>(
      "/defi/token_overview",
      { address: mint },
      30
    );
    const token = raw?.data;
    if (token?.symbol) {
      return {
        title: `${token.symbol} — ChadWallet`,
        description: `Trade ${token.name ?? token.symbol} on ChadWallet. Current price: $${token.price?.toFixed(6) ?? "0"}`,
      };
    }
  } catch {}

  return {
    title: "Trade — ChadWallet",
    description: "Trade Solana tokens on ChadWallet.",
  };
}

export default async function TradePage({ params }: TradePageProps) {
  const { mint } = await params;
  if (!SOL_ADDRESS_RE.test(mint)) notFound();
  return <TradingLayout mint={mint} />;
}
