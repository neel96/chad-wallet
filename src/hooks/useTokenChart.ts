import useSWR from "swr";
import { useMemo } from "react";
import type { UTCTimestamp } from "lightweight-charts";
import type { OHLCVBar } from "@/types/birdeye";

interface RawOHLCVResponse {
  data?: { items?: OHLCVBar[] };
  success?: boolean;
}

export type ChartInterval = "1m" | "5m" | "15m" | "1H" | "4H" | "1D" | "1W";

export interface CandlestickPoint {
  time: UTCTimestamp;
  open: number;
  high: number;
  low: number;
  close: number;
}

export function useTokenChart(mint: string | null, interval: ChartInterval = "15m") {
  const { data, error, isLoading } = useSWR<RawOHLCVResponse>(
    mint ? `/api/birdeye/history?address=${mint}&type=${interval}` : null,
    { refreshInterval: 15_000, revalidateOnFocus: false }
  );

  const chartData = useMemo<CandlestickPoint[]>(() => {
    const items = data?.data?.items;
    if (!items?.length) return [];
    return items.map((bar) => ({
      time: bar.unixTime as UTCTimestamp,
      open: bar.open,
      high: bar.high,
      low: bar.low,
      close: bar.close,
    }));
  }, [data]);

  const isLineOnly = useMemo(() => {
    if (!chartData.length) return false;
    return chartData.every(
      (d) => d.open === d.high && d.high === d.low && d.low === d.close
    );
  }, [chartData]);

  return { chartData, isLineOnly, error, isLoading };
}
