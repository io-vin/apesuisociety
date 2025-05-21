// components/MigrationRules.tsx
'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@mysten/dapp-kit';

export const MigrationRules = () => {
  const router = useRouter();
  const { connected } = useWallet();
  
  const handleOpenApp = () => {
    if (!connected) {
      // You might want to show a notification to connect wallet first
      console.log("Please connect your wallet first");
    }
    router.push("/app");
  };
  
  return (
    <div className="migration-container">
      <div className="flex flex-col items-center justify-center">
        <button
          onClick={handleOpenApp}
          type="button"
          className="open-app-button animate-pulse-glow"
        >
          <span className="btn-text">Launch App</span>
          <span className="btn-glow"></span>
        </button>
        
        {!connected && (
          <p className="mt-4 text-gray-400 text-sm">
            Connect your wallet first to use the app
          </p>
        )}
      </div>
    </div>
  );
};