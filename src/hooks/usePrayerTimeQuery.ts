import { useQuery } from '@tanstack/react-query';
import { createEndpoint } from '@/lib/api';
import { axiosClient } from '@/lib/axios';
import type { GeoLocation } from '@/types';
import type { PrayerTimesResponse } from '@/types/response';

export function usePrayerTimeQuery(
  location: GeoLocation | null,
  _cachedDate: string,
  shouldFetch = true
) {
  return useQuery({
    queryKey: ['prayer-time', location?.latitude, location?.longitude],
    select: (data) => data.data,
    enabled:
      !!location && !!location.latitude && !!location.longitude && shouldFetch,
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
      return response.data as PrayerTimesResponse;
    },
    refetchOnWindowFocus: false,
  });
}
