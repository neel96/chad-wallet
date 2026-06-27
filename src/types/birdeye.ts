import { z } from "zod";

// ---------- Token List ----------

export const BirdEyeTokenSchema = z.object({
  address: z.string(),
  symbol: z.string(),
  name: z.string(),
  decimals: z.number(),
  logoURI: z.string().optional().nullable(),
  price: z.number().optional().nullable(),
  priceChange24hPercent: z.number().optional().nullable(),
  v24hUSD: z.number().optional().nullable(),
  mc: z.number().optional().nullable(),
  liquidity: z.number().optional().nullable(),
});

export type BirdEyeToken = z.infer<typeof BirdEyeTokenSchema>;

export const TokenListResponseSchema = z.object({
  data: z.object({
    tokens: z.array(BirdEyeTokenSchema),
    total: z.number(),
  }),
  success: z.boolean(),
});

export type TokenListResponse = z.infer<typeof TokenListResponseSchema>;

// ---------- Token Overview ----------

export const TokenOverviewSchema = z.object({
  address: z.string(),
  symbol: z.string(),
  name: z.string(),
  decimals: z.number(),
  logoURI: z.string().optional().nullable(),
  price: z.number(),
  priceChange30mPercent: z.number().optional().nullable(),
  priceChange1hPercent: z.number().optional().nullable(),
  priceChange2hPercent: z.number().optional().nullable(),
  priceChange4hPercent: z.number().optional().nullable(),
  priceChange6hPercent: z.number().optional().nullable(),
  priceChange24hPercent: z.number().optional().nullable(),
  v24hUSD: z.number().optional().nullable(),
  v24hChangePercent: z.number().optional().nullable(),
  mc: z.number().optional().nullable(),
  fdv: z.number().optional().nullable(),
  supply: z.number().optional().nullable(),
  holder: z.number().optional().nullable(),
  liquidity: z.number().optional().nullable(),
});

export type TokenOverview = z.infer<typeof TokenOverviewSchema>;

export const TokenOverviewResponseSchema = z.object({
  data: TokenOverviewSchema,
  success: z.boolean(),
});

// ---------- OHLCV ----------

export const OHLCVBarSchema = z.object({
  unixTime: z.number(),
  o: z.number(),
  h: z.number(),
  l: z.number(),
  c: z.number(),
  v: z.number().optional(),
}).transform((bar) => ({
  unixTime: bar.unixTime,
  open: bar.o,
  high: bar.h,
  low: bar.l,
  close: bar.c,
  volume: bar.v,
}));

export type OHLCVBar = z.infer<typeof OHLCVBarSchema>;

export const OHLCVResponseSchema = z.object({
  data: z.object({
    items: z.array(OHLCVBarSchema),
  }),
  success: z.boolean(),
});

// ---------- Top Traders ----------

export const TopTraderSchema = z.object({
  address: z.string(),
  networkId: z.string().optional(),
  volume: z.number().optional().nullable(),
  trade: z.number().optional().nullable(),
  tradeBuy: z.number().optional().nullable(),
  tradeSell: z.number().optional().nullable(),
  volumeBuy: z.number().optional().nullable(),
  volumeSell: z.number().optional().nullable(),
  pnl: z.number().optional().nullable(),
  pnlUsd: z.number().optional().nullable(),
});

export type TopTrader = z.infer<typeof TopTraderSchema>;

export const TopTradersResponseSchema = z.object({
  data: z.object({
    items: z.array(TopTraderSchema),
  }),
  success: z.boolean(),
});

// ---------- Token Transactions ----------

export const TokenTxSchema = z.object({
  txHash: z.string(),
  blockUnixTime: z.number(),
  side: z.enum(["buy", "sell"]),
  priceUsd: z.number().optional().nullable(),
  from: z.object({
    address: z.string(),
    amount: z.number(),
    uiAmount: z.number().optional(),
    symbol: z.string().optional(),
  }),
  to: z.object({
    address: z.string(),
    amount: z.number(),
    uiAmount: z.number().optional(),
    symbol: z.string().optional(),
  }),
  owner: z.string().optional(),
  source: z.string().optional(),
  volumeUsd: z.number().optional().nullable(),
});

export type TokenTx = z.infer<typeof TokenTxSchema>;

export const TokenTxsResponseSchema = z.object({
  data: z.object({
    items: z.array(TokenTxSchema),
    total: z.number().optional(),
  }),
  success: z.boolean(),
});
