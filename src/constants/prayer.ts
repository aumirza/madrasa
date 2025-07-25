import {
  CloudMoonIcon,
  CloudSunIcon,
  MoonStarsIcon,
  SunHorizonIcon,
  SunIcon,
} from '@phosphor-icons/react';

export const ICON_MAP = {
  Fajr: CloudMoonIcon,
  Dhuhr: SunIcon,
  Asr: CloudSunIcon,
  Maghrib: SunHorizonIcon,
  Isha: MoonStarsIcon,
};

export const GRADIENT_MAP = {
  Fajr: 'from-[#3F7CE6] to-[#D6BDFF]',
  Dhuhr: 'from-[#E77715] to-[#FFE392]',
  Asr: 'from-[#006C5E] to-[#C9F3B3]',
  Maghrib: 'from-[#FF9452] to-[#FF88A8]',
  Isha: 'from-[#811DEC] to-[#381079]',
};
