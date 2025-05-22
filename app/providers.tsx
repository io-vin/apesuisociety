// app/providers.tsx
'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import '@mysten/dapp-kit/dist/index.css';
import { SuiClientProvider } from '@mysten/dapp-kit';
import { WalletProvider } from '@mysten/dapp-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface ProvidersProps {
  children: ReactNode;
}

// Crea un client per React Query
const queryClient = new QueryClient();

// Configura le reti disponibili direttamente con gli URL
const networks = {
  devnet: { url: 'https://fullnode.devnet.sui.io:443' },
  testnet: { url: 'https://fullnode.testnet.sui.io:443' },
  mainnet: { url: 'https://fullnode.mainnet.sui.io:443' },
};

export function Providers({ children }: ProvidersProps) {
  const [mounted, setMounted] = useState(false);
  
  // Attendi che il componente sia montato per renderizzare i componenti wallet
  // Questo previene gli errori di idratazione
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networks} defaultNetwork="mainnet">
        <WalletProvider>
          {children}
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}