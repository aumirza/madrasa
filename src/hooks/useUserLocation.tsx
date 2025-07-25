'use client';

import { useEffect } from 'react';
import { useUserLocationStore } from '@/store/UserLocationStore';

export function useUserLocation() {
  const { location, error, setLocation, setError } = useUserLocationStore();

  useEffect(() => {
    if (location) {
      return;
    }
    if (!navigator.geolocation) {
      setError('This browser does not support geolocation.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setError(null);
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setError('The user denied the request for Geolocation.');
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          setError('The location information is unavailable.');
        } else if (err.code === err.TIMEOUT) {
          setError('The request to get user location timed out.');
        } else {
          setError(`An unknown error occurred: ${err.message}`);
        }
      }
    );
  }, [location, setLocation, setError]);

  return { location, error };
}
