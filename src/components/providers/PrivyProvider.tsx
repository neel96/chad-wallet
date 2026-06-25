"use client";

import { PrivyProvider } from "@privy-io/react-auth";

const APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID ?? "";

export default function PrivyAuthProvider({ children }: { children: React.ReactNode }) {
  // Render children without Privy if no app ID configured (dev/preview without env vars)
  if (!APP_ID) {
    return <>{children}</>;
  }

  return (
    <PrivyProvider
      appId={APP_ID}
      clientId={process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID}
      config={{
        loginMethods: ["apple", "google"],
        appearance: {
          theme: "dark",
          accentColor: "#39ff14",
          landingHeader: "Sign in to ChadWallet",
          loginMessage: "Trade Solana tokens like a chad.",
        },
        embeddedWallets: {
          ethereum: { createOnLogin: "off" },
          solana: { createOnLogin: "users-without-wallets" },
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
