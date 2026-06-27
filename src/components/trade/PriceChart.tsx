"use client";

import { useEffect, useRef, useState } from "react";
import {
  createChart,
  CandlestickSeries,
  HistogramSeries,
  LineSeries,
  type IChartApi,
  type ISeriesApi,
  type UTCTimestamp,
  ColorType,
  CrosshairMode,
} from "lightweight-charts";
import { useTokenChart, type ChartInterval } from "@/hooks/useTokenChart";
import { Skeleton } from "@/components/ui/Skeleton";

const INTERVALS: { label: string; value: ChartInterval }[] = [
  { label: "1m", value: "1m" },
  { label: "5m", value: "5m" },
  { label: "15m", value: "15m" },
  { label: "1H", value: "1H" },
  { label: "4H", value: "4H" },
  { label: "1D", value: "1D" },
];

interface PriceChartProps {
  mint: string;
}

export function PriceChart({ mint }: PriceChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | ISeriesApi<"Line"> | null>(null);
  const seriesTypeRef = useRef<"Candlestick" | "Line" | null>(null);
  const volSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null);

  const [interval, setInterval] = useState<ChartInterval>("15m");
  const { chartData, isLineOnly, isLoading, isValidating } = useTokenChart(mint, interval);

  // Initialize chart once
  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "#0a0a0a" },
        textColor: "#6b7280",
      },
      grid: {
        vertLines: { color: "#111111" },
        horzLines: { color: "#111111" },
      },
      crosshair: { mode: CrosshairMode.Normal },
      rightPriceScale: { borderColor: "#1f1f1f" },
      timeScale: {
        borderColor: "#1f1f1f",
        timeVisible: true,
        secondsVisible: false,
      },
    });

    chartRef.current = chart;

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#00ff7f",
      downColor: "#ff4444",
      borderUpColor: "#00ff7f",
      borderDownColor: "#ff4444",
      wickUpColor: "#00ff7f",
      wickDownColor: "#ff4444",
    });
    seriesRef.current = candleSeries;
    seriesTypeRef.current = "Candlestick";

    const volSeries = chart.addSeries(HistogramSeries, {
      color: "#1f1f1f",
      priceFormat: { type: "volume" },
      priceScaleId: "volume",
    });
    chart.priceScale("volume").applyOptions({
      scaleMargins: { top: 0.85, bottom: 0 },
      visible: false,
    });
    volSeriesRef.current = volSeries;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        chart.applyOptions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
      seriesTypeRef.current = null;
      volSeriesRef.current = null;
    };
  }, []);

  // Update series data when chart data or mode changes
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart || !chartData.length) return;

    if (isLineOnly) {
      if (seriesTypeRef.current !== "Line") {
        if (seriesRef.current) chart.removeSeries(seriesRef.current);
        const lineSeries = chart.addSeries(LineSeries, {
          color: "#39ff14",
          lineWidth: 2,
        });
        seriesRef.current = lineSeries;
        seriesTypeRef.current = "Line";
      }
      (seriesRef.current as ISeriesApi<"Line">).setData(
        chartData.map((d) => ({ time: d.time as UTCTimestamp, value: d.close }))
      );
    } else {
      if (seriesTypeRef.current !== "Candlestick") {
        if (seriesRef.current) chart.removeSeries(seriesRef.current);
        const candleSeries = chart.addSeries(CandlestickSeries, {
          upColor: "#00ff7f",
          downColor: "#ff4444",
          borderUpColor: "#00ff7f",
          borderDownColor: "#ff4444",
          wickUpColor: "#00ff7f",
          wickDownColor: "#ff4444",
        });
        seriesRef.current = candleSeries;
        seriesTypeRef.current = "Candlestick";
      }
      (seriesRef.current as ISeriesApi<"Candlestick">).setData(
        chartData.map((d) => ({
          time: d.time as UTCTimestamp,
          open: d.open,
          high: d.high,
          low: d.low,
          close: d.close,
        }))
      );
    }

    volSeriesRef.current?.setData(
      chartData.map((d) => ({
        time: d.time as UTCTimestamp,
        value: 1, // placeholder — BirdEye OHLCV doesn't always include volume
        color: d.close >= d.open ? "rgba(0,255,127,0.12)" : "rgba(255,68,68,0.12)",
      }))
    );

    chart.timeScale().fitContent();
  }, [chartData, isLineOnly]);

  return (
    <div className="flex flex-col h-full">
      {/* Interval selector */}
      <div className="flex items-center gap-1 px-3 py-2 border-b border-[#1f1f1f] shrink-0">
        {INTERVALS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setInterval(value)}
            className={`px-2.5 py-1 text-xs rounded transition-colors ${
              interval === value
                ? "bg-[#39ff14]/10 text-[#39ff14] font-medium"
                : "text-[#6b7280] hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
        {isValidating && (
          <div className="ml-auto mr-1 size-3 rounded-full border border-[#6b7280] border-t-transparent animate-spin" />
        )}
      </div>

      {/* Chart container */}
      <div className="relative flex-1 min-h-0">
        {isLoading && !chartData.length && (
          <div className="absolute inset-0 z-10">
            <Skeleton className="w-full h-full rounded-none" />
          </div>
        )}
        <div ref={containerRef} className="w-full h-full" />
      </div>
    </div>
  );
}
