import { isToday } from 'date-fns';
import { useEffect, useMemo } from 'react';
import { usePrayerTimeStore } from '@/store/PrayerTimeStore';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { useLocation } from './useLocation';
import { usePrayerTimeQuery } from './usePrayerTimeQuery';

export const usePrayerTime = () => {
  const {
    location,
    error: locationError,
    isLoading: isLocationLoading,
  } = useLocation();
  const prayerTimes = usePrayerTimeStore((state) => state.prayerTimes);
  const setPrayerTimes = usePrayerTimeStore((state) => state.setPrayerTimes);

  // Memoize readable date for query
  const readableDate = useMemo(
    () => prayerTimes?.date?.readable || '',
    [prayerTimes]
  );

  // Determine if we should fetch new data
  const shouldFetch = useMemo(() => {
    if (!location) {
      return false;
    }
    if (!prayerTimes) {
      return true;
    }

    // Don't fetch if we have valid cached data for current location and today
    const hasValidCache =
      prayerTimes.meta.latitude === location.latitude &&
      prayerTimes.meta.longitude === location.longitude &&
      isToday(prayerTimes.date.readable);

    return !hasValidCache;
  }, [location, prayerTimes]);

  const query = usePrayerTimeQuery(location, readableDate, shouldFetch);

  // Update store when new timings arrive
  useEffect(() => {
    if (query.data?.timings) {
      setPrayerTimes(query.data);
    }
  }, [query.data, setPrayerTimes]);

  // Early return: loading state or location error
  if (isLocationLoading) {
    return { data: null, isLoading: true, error: null };
  }

  if (locationError) {
    return { data: null, isLoading: false, error: locationError };
  }

  if (!(location?.latitude && location.longitude)) {
    return { data: null, isLoading: true, error: null };
  }

  // Return query error if present
  if (query.error) {
    return {
      data: null,
      isLoading: false,
      error: getErrorMessage(query.error),
    };
  }

  // If we have cached data and shouldn't fetch, return cached data
  if (!shouldFetch && prayerTimes) {
    return { data: prayerTimes, isLoading: false, error: null };
  }

  // Default: return query result
  return {
    data: query.data ? query.data : null,
    isLoading: query.isLoading,
    error: null,
  };
};
