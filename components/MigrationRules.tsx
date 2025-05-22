// components/MigrationRules.tsx
'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export const MigrationRules = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    
    // Verifica lo stato di connessione del wallet solo lato client
    if (typeof window !== 'undefined') {
      try {
        // Controlla lo stato di connessione tramite local storage o altre API client
        // Questa è una soluzione temporanea, potresti dover adattarla
        const walletState = localStorage.getItem('walletConnected');
        setIsConnected(walletState === 'true');
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      }
    }
  }, []);
  
  const handleOpenApp = () => {
    if (!isConnected) {
      // You might want to show a notification to connect wallet first
      console.log("Please connect your wallet first");
    }
    router.push("/app");
  };
  
  if (!isMounted) {
    return null; // Non renderizzare nulla durante SSR
  }
  
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
        {!isConnected && (
          <p className="mt-4 text-gray-400 text-sm">
            Connect your wallet first to use the app
          </p>
        )}
      </div>
    </div>
  );
};

export default MigrationRules;