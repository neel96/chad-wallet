export const revalidate = 60;

import { TickerBanner } from "@/components/landing/TickerBanner";
import NavBar from "@/components/landing/NavBar";
import HeroSection from "@/components/landing/HeroSection";
import TradeAnywhereSection from "@/components/landing/TradeAnywhereSection";
import FeaturesGrid from "@/components/landing/FeaturesGrid";
import StatsSection from "@/components/landing/StatsSection";
import VideoSection from "@/components/landing/VideoSection";
import FeatureRows from "@/components/landing/FeatureRows";
import DownloadCTA from "@/components/landing/DownloadCTA";
import Footer from "@/components/landing/Footer";
import { birdeye } from "@/lib/birdeye";
import { TokenListResponseSchema, type BirdEyeToken } from "@/types/birdeye";

async function getTokens(): Promise<BirdEyeToken[]> {
  try {
    const raw = await birdeye.fetch<unknown>("/defi/tokenlist", {
      sort_by: "v24hUSD",
      sort_type: "desc",
      offset: "0",
      limit: "30",
    }, 60);
    const parsed = TokenListResponseSchema.safeParse(raw);
    if (parsed.success) return parsed.data.data.tokens;
    const r = raw as { data?: { tokens?: BirdEyeToken[] } };
    return r?.data?.tokens ?? [];
  } catch {
    return [];
  }
}

export default async function LandingPage() {
  const tokens = await getTokens();

  return (
    <div className="min-h-screen bg-[#080808] overflow-x-hidden">
      <TickerBanner tokens={tokens} variant="top" />
      <NavBar />
      <main>
        <HeroSection />
        <TradeAnywhereSection />
        <FeaturesGrid />
        <StatsSection />
        <VideoSection />
        <FeatureRows />
        <DownloadCTA />
      </main>
      <Footer />
      <TickerBanner tokens={tokens} variant="bottom" />
    </div>
  );
}
