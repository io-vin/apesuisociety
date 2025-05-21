import './globals.css';
import { Navbar } from '@/components/Navbar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ape Sui Society',
  description: 'Ape Sui Society NFT Collection',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-ape-bg text-ape-text font-ethnocentric">
        <Navbar />
        {children}
      </body>
    </html>
  );
}