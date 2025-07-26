import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Head from 'next/head';
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
      <Head>
        <link
          href="android_chrome_192X192.png"
          rel="icon"
          sizes="192x192"
          type="image/png"
        />
        <link
          href="android_chrome_512X512.png"
          rel="icon"
          sizes="512x512"
          type="image/png"
        />
        <link
          href="apple_touch_icon.png"
          rel="icon"
          sizes="180x180"
          type="image/png"
        />
        <link
          href="favicon_16X16.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <link
          href="favicon_32X32.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="favicon_96X96.png"
          rel="icon"
          sizes="96x96"
          type="image/png"
        />
        <link
          href="mstile_150X150.png"
          rel="icon"
          sizes="150x150"
          type="image/png"
        />
        <link
          href="safari_pinned_tab.png"
          rel="icon"
          sizes="512x512"
          type="image/png"
        />
      </Head>
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
