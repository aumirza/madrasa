'use client';

import { useEffect, useState } from 'react';
import { getMyIpLocation } from '@/lib/IPLocation';
import type { GeoLocation } from '@/types';
import { useUserLocation } from './useUserLocation';

function getErrorMessage(error: unknown): string {
  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as { message?: unknown }).message === 'string'
  ) {
    return (error as { message: string }).message;
  }
  return String(error);
}

export const useLocation = () => {
  const [location, setLocation] = useState<GeoLocation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isIp, setIsIp] = useState(false);

  const { location: userLocation, error: locationError } = useUserLocation();

  useEffect(() => {
    const fetchLocation = async () => {
      setIsLoading(true);
      setError(null);

      // If user location is available, use it
      if (userLocation && !locationError) {
        setLocation({
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        });
        setIsIp(false);
        setIsLoading(false);
        return;
      }

      // If there's a location error (permission denied, etc.), fallback to IP location
      if (locationError) {
        try {
          const ipLocation = await getMyIpLocation();
          setLocation({
            latitude: ipLocation.latitude,
            longitude: ipLocation.longitude,
          });
          setIsIp(true);
        } catch (ipError) {
          setError(getErrorMessage(ipError));
        }
      }

      setIsLoading(false);
    };

    fetchLocation();
  }, [userLocation, locationError]);

  return { location, error, isLoading, isIp };
};
