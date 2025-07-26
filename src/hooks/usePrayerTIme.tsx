import { isToday } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';

import { usePrayerTimeStore } from '@/store/PrayerTimeStore';
import type { GeoLocation } from '@/types';
import { usePrayerTimeQuery } from './usePrayerTimeQuery';
import { useUserLocation } from './useUserLocation';

export const usePrayerTime = (ipLocation: GeoLocation) => {
  const [location, setLocation] = useState<GeoLocation | null>(null);
  const { location: userLocation, error: locationError } = useUserLocation();
  const prayerTimes = usePrayerTimeStore((state) => state.prayerTimes);
  const setPrayerTimes = usePrayerTimeStore((state) => state.setPrayerTimes);

  // Set location based on user or fallback to IP
  useEffect(() => {
    if (locationError) {
      setLocation(ipLocation);
      return;
    }
    if (userLocation) {
      setLocation({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      });
    }
  }, [userLocation, locationError, ipLocation]);

  // Memoize readable date for query
  const readableDate = useMemo(
    () => prayerTimes?.date?.readable || '',
    [prayerTimes]
  );
  const query = usePrayerTimeQuery(location, readableDate);

  // Update store when new timings arrive
  useEffect(() => {
    if (query.data?.timings) {
      setPrayerTimes(query.data);
    }
  }, [query.data, setPrayerTimes]);

  // Early return: loading state
  if (!(location?.latitude && location.longitude)) {
    return { data: null, isLoading: true };
  }

  // if (locationError) {
  //   console.error('Error fetching user location:', locationError);
  // can show location error to user but we are using ip fallback , so not needed
  //   return { data: null, isLoading: false };
  // }

  // Use cached prayer times if available and up-to-date
  if (
    prayerTimes &&
    prayerTimes.meta.latitude === location.latitude &&
    prayerTimes.meta.longitude === location.longitude &&
    isToday(prayerTimes.date.readable)
  ) {
    return { data: prayerTimes, isLoading: false };
  }

  // Default: return query result
  return {
    data: query.data,
    isLoading: query.isLoading,
  };
};
