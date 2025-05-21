// app/providers.tsx
'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WalletProvider } from '@mysten/dapp-kit';
// Fix the import to match the older version structure
import { JsonRpcProvider } from '@mysten/sui.js';

interface ProvidersProps {
  children: ReactNode;
}

// Create a client for connecting to the Sui network
const provider = new JsonRpcProvider('https://fullnode.mainnet.sui.io:443');

// Create a query client for React Query
const queryClient = new QueryClient();

export function Providers({ children }: ProvidersProps) {
  const [mounted, setMounted] = useState(false);

  // Wait until component is mounted to render wallet components
  // This prevents hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <WalletProvider>
        {children}
      </WalletProvider>
    </QueryClientProvider>
  );
}