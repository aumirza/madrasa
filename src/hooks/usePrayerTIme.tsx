import { useQuery } from '@tanstack/react-query';
import { createEndpoint } from '@/lib/api';
import { axiosClient } from '@/lib/axios';
import type { PrayerTimesResponse } from '@/types/response';
import { useUserLocation } from './useUserLocation';

export const usePrayerTime = () => {
  const { location, error } = useUserLocation();

  const query = useQuery({
    queryKey: ['prayer-time'],
    queryFn: async () => {
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

  if (error) {
    console.error('Error fetching user location:', error);
    return { data: null, isLoading: false, error };
  }

  return query;
};
