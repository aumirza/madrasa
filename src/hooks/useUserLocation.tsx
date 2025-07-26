'use client';

import { useEffect } from 'react';
import { useUserLocationStore } from '@/store/UserLocationStore';

function getGeolocationErrorMessage(err: GeolocationPositionError): string {
  if (err.code === err.PERMISSION_DENIED) {
    return 'The user denied the request for Geolocation.';
  }
  if (err.code === err.POSITION_UNAVAILABLE) {
    return 'The location information is unavailable.';
  }
  if (err.code === err.TIMEOUT) {
    return 'The request to get user location timed out.';
  }
  if (typeof err.message === 'string' && err.message.trim()) {
    return `An unknown error occurred: ${err.message}`;
  }
  return 'An unknown error occurred while retrieving location.';
}

export function useUserLocation() {
  const { location, error, setLocation, setError, isHydrated } =
    useUserLocationStore();

  const requestLocationPermission = async (): Promise<
    'granted' | 'denied' | 'blocked'
  > => {
    if (!navigator.geolocation) {
      setError('This browser does not support geolocation.');
      return 'blocked';
    }

    try {
      // Check current permission state
      if (
        'permissions' in navigator &&
        typeof navigator.permissions.query === 'function'
      ) {
        const permission = await navigator.permissions.query({
          name: 'geolocation',
        });

        if (permission.state === 'denied') {
          setError(
            'Location permission is blocked. Please enable location access in your browser settings.'
          );
          return 'blocked';
        }
      }

      // Attempt to get location (this will prompt if permission is needed)
      return new Promise((resolve) => {
        let didRespond = false;
        const timeoutId = setTimeout(() => {
          if (!didRespond) {
            setError(
              'Unable to retrieve location. Please ensure location services are enabled on your device.'
            );
            resolve('denied');
          }
        }, 5000);

        navigator.geolocation.getCurrentPosition(
          (position) => {
            didRespond = true;
            clearTimeout(timeoutId);
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            setError(null);
            resolve('granted');
          },
          (err) => {
            didRespond = true;
            clearTimeout(timeoutId);

            if (err.code === err.PERMISSION_DENIED) {
              setError(
                'Location permission is blocked. Please enable location access in your browser settings.'
              );
              resolve('blocked');
            } else {
              setError(getGeolocationErrorMessage(err));
              resolve('denied');
            }
          },
          { timeout: 5000 }
        );
      });
    } catch {
      setError('An error occurred while checking location permissions.');
      return 'denied';
    }
  };

  useEffect(() => {
    if (!isHydrated) {
      return;
    }
    if (location) {
      return;
    }
    if (!navigator.geolocation) {
      setError('This browser does not support geolocation.');
      return;
    }

    let didRespond = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    function handleLocationSuccess(position: GeolocationPosition) {
      didRespond = true;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setError(null);
    }

    function handleLocationError(err: GeolocationPositionError) {
      didRespond = true;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      setError(getGeolocationErrorMessage(err));
    }

    function startLocationTimeout() {
      timeoutId = setTimeout(() => {
        if (!didRespond) {
          setError(
            'Unable to retrieve location. Please ensure location services are enabled on your device.'
          );
        }
      }, 5000);
    }

    function requestLocation() {
      startLocationTimeout();
      navigator.geolocation.getCurrentPosition(
        handleLocationSuccess,
        handleLocationError,
        { timeout: 5000 }
      );
    }

    function handlePermissionResult(result: PermissionStatus) {
      if (result.state === 'denied') {
        setError(
          'Location permission is denied. Please enable location access in your browser settings.'
        );
      } else if (result.state === 'prompt' || result.state === 'granted') {
        requestLocation();
      } else {
        setError('Unable to determine location permission status.');
      }
    }

    function checkPermissionsAndRequestLocation() {
      if (
        'permissions' in navigator &&
        typeof navigator.permissions.query === 'function'
      ) {
        navigator.permissions
          .query({ name: 'geolocation' })
          .then(handlePermissionResult)
          .catch(() => {
            requestLocation();
          });
      } else {
        requestLocation();
      }
    }

    checkPermissionsAndRequestLocation();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isHydrated, location, setLocation, setError]);

  return {
    location,
    error,
    requestLocationPermission,
  };
}
