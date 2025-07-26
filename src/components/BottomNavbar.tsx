'use client';

import {
  BookOpenTextIcon,
  HouseSimpleIcon,
  ListHeartIcon,
  MosqueIcon,
} from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import menuIcon from '@/assets/menu-icon.png';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

const navItems = [
  {
    label: 'Home',
    href: '/',
    icon: HouseSimpleIcon,
  },
  {
    label: 'Quran',
    href: '/quran',
    icon: BookOpenTextIcon,
  },
  {
    label: 'Maktab',
    href: '/maktab',
    icon: MosqueIcon,
  },
  {
    label: 'Dua',
    href: '/dua',
    icon: ListHeartIcon,
  },
];

export function BottomNavbar() {
  const pathname = usePathname();

  // Split nav items for 2-menu-2 layout
  const firstHalf = navItems.slice(0, 2);
  const secondHalf = navItems.slice(2, 4);

  return (
    <nav className="safe-area-pb fixed right-0 bottom-0 left-0 z-50 border-gray-200 border-t bg-white px-4 py-2">
      <div className="mx-auto flex max-w-md items-center justify-around">
        {/* First 2 nav items */}
        {firstHalf.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              className={cn(
                'flex flex-col items-center justify-center rounded-lg p-2 transition-all duration-200',
                isActive
                  ? 'text-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              )}
              href={item.href}
              key={item.href}
            >
              <div
                className={cn('rounded-full p-2 transition-all duration-200')}
              >
                <Icon
                  className={cn(
                    'transition-all duration-200',
                    isActive && 'text-purple-600'
                  )}
                  size={24}
                  weight="bold"
                />
              </div>
              <span
                className={cn(
                  'mt-1 font-medium text-xs transition-all duration-200',
                  isActive ? 'text-purple-600' : 'text-gray-500'
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}

        {/* Central Menu Button */}
        <Button
          className="flex size-12 rounded-full bg-gradient-to-tr from-20% from-[#6D2DD3] to-[#FBD2FF] p-3"
          size="icon"
          type="button"
        >
          <Image alt="Menu" height={24} src={menuIcon} width={24} />
        </Button>

        {/* Last 2 nav items */}
        {secondHalf.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              className={cn(
                'flex min-w-[60px] flex-col items-center justify-center rounded-lg p-2 transition-all duration-200',
                isActive
                  ? 'text-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              )}
              href={item.href}
              key={item.href}
            >
              <div
                className={cn('rounded-full p-2 transition-all duration-200')}
              >
                <Icon
                  className={cn(
                    'transition-all duration-200',
                    isActive && 'text-purple-600'
                  )}
                  size={24}
                  weight="bold"
                />
              </div>
              <span
                className={cn(
                  'mt-1 font-medium text-xs transition-all duration-200',
                  isActive ? 'text-purple-600' : 'text-gray-500'
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
