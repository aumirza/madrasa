import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { GeoLocation } from '@/types';

interface UserLocationState {
  isHydrated: boolean;
  location: GeoLocation | null;
  error: string | null;
  setLocation: (location: GeoLocation) => void;
  setError: (error: string | null) => void;
}

export const useUserLocationStore = create<UserLocationState>()(
  persist(
    immer((set) => ({
      isHydrated: false,
      location: null,
      error: null,
      setLocation: (location) =>
        set((state) => {
          state.location = location;
        }),
      setError: (error) =>
        set((state) => {
          state.error = error;
        }),
    })),
    {
      name: 'user-location-store',
      partialize: (state) => ({ location: state.location }), // only persist location
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isHydrated = true;
        }
      },
    }
  )
);
