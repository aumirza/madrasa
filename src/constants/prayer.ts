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
  Fajr: 'from-[#D6BDFF] to-[#3F7CE6]',
  Dhuhr: 'from-[#E77715] to-[#FFE392]',
  Asr: 'from-[#C9F3B3] to-[#006C5E]',
  Maghrib: 'from-[#FF88A8] to-[#FF9452]',
  Isha: 'from-[#811DEC] to-[#381079]',
};
