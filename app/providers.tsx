// app/providers.tsx
'use client';

import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';

const queryClient = new QueryClient();

const networks = {
  devnet: { url: 'https://fullnode.devnet.sui.io:443' },
  testnet: { url: 'https://fullnode.testnet.sui.io:443' },
  mainnet: { url: 'https://fullnode.mainnet.sui.io:443' },
};

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networks} defaultNetwork="mainnet">
        <WalletProvider>
          <Navbar />
          {children}
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}
