// components/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useWallet } from '@mysten/dapp-kit';
import { useEffect, useState } from 'react';

export const Navbar = () => {
  const pathname = usePathname();
  const { 
    wallets, 
    currentWallet, 
    selectWallet, // This was 'select' in newer versions
    connected, 
    connecting, 
    connect, 
    disconnect 
  } = useWallet();
  
  const [truncatedAddress, setTruncatedAddress] = useState<string>('');

  useEffect(() => {
    // Set selected wallet name when current wallet changes
    if (currentWallet) {
      // Truncate wallet address for display
      if (currentWallet.accounts && currentWallet.accounts.length > 0) {
        const address = currentWallet.accounts[0].address;
        setTruncatedAddress(
          `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
        );
      }
    } else {
      setTruncatedAddress('');
    }
  }, [currentWallet]);

  const handleConnect = async () => {
    try {
      if (connected) {
        await disconnect();
      } else if (wallets.length > 0) {
        // Select first available wallet if not already selected
        const walletToUse = currentWallet || wallets[0];
        if (!currentWallet) {
          await selectWallet(walletToUse.name);
        }
        await connect();
      }
    } catch (e) {
      console.error("Wallet connection error:", e);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link href="/">
          <div className="relative w-[60px] h-[60px]">
            <Image src="/logo.png" alt="logo" width={60} height={60} className="object-contain" />
          </div>
        </Link>
      </div>
      
      <div className="navbar-links">
        <Link 
          href="/apes" 
          className={pathname === '/apes' ? 'navbar-link active' : 'navbar-link'}
        >
          Apes
        </Link>
        <Link 
          href="/migrate" 
          className={pathname === '/migrate' ? 'navbar-link active' : 'navbar-link'}
        >
          Migrate
        </Link>
        <Link 
          href="#" 
          className="navbar-link"
        >
          More
        </Link>
      </div>
      
      <div className="navbar-actions">
        {pathname === '/migrate' && (
          <button 
            onClick={handleConnect} 
            className="connect-wallet-button"
            disabled={connecting}
          >
            {connecting ? (
              "Connecting..."
            ) : connected ? (
              truncatedAddress || 'Connected'
            ) : (
              'Connect Wallet'
            )}
          </button>
        )}
      </div>
    </nav>
  );
};