'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useAccounts, useCurrentAccount } from '@mysten/dapp-kit';
import { useEffect, useState } from 'react';
import { ConnectButton } from '@mysten/dapp-kit';

export const Navbar = ({ isPlace = false }) => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [truncatedAddress, setTruncatedAddress] = useState<string>('');

  // Chiamata all'hook qui direttamente
  const currentAccount = useCurrentAccount();
  
  // Utilizzo l'effetto solo per il montaggio
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && currentAccount?.address) {
      const address = currentAccount.address;
      setTruncatedAddress(
        `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
      );
    } else {
      setTruncatedAddress('');
    }
  }, [currentAccount, isMounted]);

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
        {pathname === '/migrate' && isMounted && (
          <ConnectButton />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
