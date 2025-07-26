import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { BottomNavbar } from '@/components/BottomNavbar';
import { Header } from '@/components/Header';
import { Providers } from '@/components/Providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Madrasa',
  description: 'A islamic learning platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`relative ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="flex h-screen flex-col">
            <Header />
            <main className="flex-1 bg-gray-100">{children}</main>
            <BottomNavbar />
          </div>
        </Providers>
      </body>
    </html>
  );
}
