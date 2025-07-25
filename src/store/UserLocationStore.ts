import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export type UserLocation = {
  latitude: number;
  longitude: number;
};

interface UserLocationState {
  location: UserLocation | null;
  error: string | null;
  setLocation: (location: UserLocation) => void;
  setError: (error: string | null) => void;
}

export const useUserLocationStore = create<UserLocationState>()(
  persist(
    immer((set) => ({
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
    }
  )
);
