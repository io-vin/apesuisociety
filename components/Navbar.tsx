'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed z-10 top-0 left-0 right-0 flex justify-between items-center h-[72px] px-4 bg-ape-bg">
      <div className="flex-grow flex-basis-0 pl-[10px]">
        <Link href="/">
          <div className="relative w-[60px] h-[60px]">
            <Image src="/logo.png" alt="logo" fill className="object-contain" />
          </div>
        </Link>
      </div>
      
      <div className="flex-grow flex-basis-0 flex justify-center">
        <Link 
          href="/apes" 
          className={`mx-[10px] text-[0.875rem] ${pathname === '/apes' ? 'active-nav-link' : ''}`}
        >
          Apes
        </Link>
        <Link 
          href="/migrate" 
          className={`mx-[10px] text-[0.875rem] ${pathname === '/migrate' ? 'active-nav-link' : ''}`}
        >
          Migrate
        </Link>
        <Link 
          href="#" 
          className="mx-[10px] text-[0.875rem]"
        >
          More
        </Link>
      </div>
      
      <div className="flex-grow flex-basis-0 flex justify-end">
        {pathname === '/migrate' && (
          <button className="connect-button">Migrate</button>
        )}
      </div>
    </nav>
  );
};