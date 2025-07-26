'use client';

import Image from 'next/image';
import logo from '@/assets/madrasa-logo.png';
import { LocationSelector } from './LocationSelector';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 py-4 backdrop-blur-sm">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* Logo section */}
        <div className="flex items-center space-x-2">
          <Image alt="Madrasa Logo" height={50} src={logo} />
        </div>

        {/* Location selector */}
        <LocationSelector />
      </div>
    </header>
  );
}
