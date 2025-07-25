import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PrayerTimesResponse } from '@/types/response';

interface PrayerTimeState {
  prayerTimes: PrayerTimesResponse['data'] | null;
  setPrayerTimes: (data: PrayerTimesResponse['data']) => void;
  clearPrayerTimes: () => void;
}

export const usePrayerTimeStore = create<PrayerTimeState>()(
  persist(
    (set) => ({
      prayerTimes: null,
      setPrayerTimes: (data) => set({ prayerTimes: data }),
      clearPrayerTimes: () => set({ prayerTimes: null }),
    }),
    {
      name: 'prayerTimes', // storage key
    }
  )
);
