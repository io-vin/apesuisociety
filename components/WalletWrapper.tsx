// components/WalletWrapper.tsx
'use client';
import React, { ReactNode, useEffect, useState } from 'react';

interface WalletWrapperProps {
  children: ReactNode;
}

export const WalletWrapper = ({ children }: WalletWrapperProps) => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    // Restituisce un placeholder o null durante il SSR
    return null;
  }
  
  // Renderizza il contenuto solo lato client
  return <>{children}</>;
};

export default WalletWrapper;