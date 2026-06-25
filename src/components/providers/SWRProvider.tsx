"use client";

import { SWRConfig } from "swr";
import { fetcher } from "@/lib/fetcher";

export default function SWRProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        // Collapse identical requests within 4 s into one in-flight fetch
        dedupingInterval: 4_000,
        // Keep stale data visible while revalidating (no empty flash)
        keepPreviousData: true,
        errorRetryCount: 3,
        errorRetryInterval: 5_000,
      }}
    >
      {children}
    </SWRConfig>
  );
}
