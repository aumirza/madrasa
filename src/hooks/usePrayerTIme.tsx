import { useQuery } from '@tanstack/react-query';
import { isToday } from 'date-fns';
import { createEndpoint } from '@/lib/api';
import { axiosClient } from '@/lib/axios';
import { usePrayerTimeStore } from '@/store/PrayerTimeStore';
import type { PrayerTimesResponse } from '@/types/response';
import { useUserLocation } from './useUserLocation';

export const usePrayerTime = () => {
  const { location, error: locationError } = useUserLocation();
  const prayerTimes = usePrayerTimeStore((state) => state.prayerTimes);
  const setPrayerTimes = usePrayerTimeStore((state) => state.setPrayerTimes);

  const query = useQuery({
    queryKey: ['prayer-time', location?.latitude, location?.longitude],
    select: (data) => data.data,
    enabled:
      !!location && !!location.latitude && !!location.longitude && !prayerTimes,
    queryFn: async () => {
      if (!location) {
        return { data: null, isLoading: false };
      }

      const response = await axiosClient.get(
        createEndpoint.getTodaysPrayerTimes(),
        {
          params: {
            latitude: location?.latitude,
            longitude: location?.longitude,
          },
        }
      );
      setPrayerTimes(response.data.data);
      return response.data as PrayerTimesResponse;
    },
    refetchOnWindowFocus: false,
  });

  if (!(location?.latitude && location.longitude)) {
    return { data: null, isLoading: true, locationError };
  }

  if (
    prayerTimes &&
    prayerTimes.meta.latitude === location.latitude &&
    prayerTimes.meta.longitude === location.longitude &&
    isToday(prayerTimes.date.readable)
  ) {
    return { data: prayerTimes, isLoading: false };
  }

  if (locationError) {
    // biome-ignore lint/suspicious/noConsole: false positive
    console.error('Error fetching user location:', locationError);
    return { data: null, isLoading: false, locationError };
  }

  return query;
};
