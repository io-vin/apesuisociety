// components/CustomConnectButton.tsx
'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Importa il componente ConnectButton solo lato client
const DynamicConnectButton = dynamic(
  () => import('@mysten/dapp-kit').then((mod) => mod.ConnectButton),
  { ssr: false }
);

export const CustomConnectButton = () => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    // Restituisce un pulsante placeholder durante il SSR
    return (
      <button 
        className="connect-wallet-button"
        disabled={true}
      >
        Connect Wallet
      </button>
    );
  }
  
  // Renderizza il componente ConnectButton solo lato client
  return <DynamicConnectButton />;
};

export default CustomConnectButton;