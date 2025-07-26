import { MapPinIcon } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { useLocation } from '@/hooks/useLocation';
import { useReverseGeocode } from '@/hooks/useReverseGeocode';
import { useUserLocation } from '@/hooks/useUserLocation';

export function LocationSelector() {
  const [address, setAddress] = useState<string | null>(null);
  const [isRequesting, setIsRequesting] = useState(false);
  const { requestLocationPermission } = useUserLocation();
  const { location, isIp } = useLocation();
  const { reverseGeocode } = useReverseGeocode();

  const handleEnableLocation = async () => {
    if (isRequesting) {
      return;
    }

    setIsRequesting(true);

    try {
      const result = await requestLocationPermission();

      switch (result) {
        case 'granted':
          // Location will be automatically updated via the store
          break;
        case 'denied':
          // Show a temporary message or keep the current state
          break;
        case 'blocked':
          // Could show a modal or toast with instructions to manually enable location
          alert(
            'Location access is blocked. Please enable location access in your browser settings and refresh the page.'
          );
          break;
        default:
          // Handle any unexpected result
          break;
      }
    } catch {
      // Error handling without console
    } finally {
      setIsRequesting(false);
    }
  };

  useEffect(() => {
    if (location) {
      reverseGeocode({
        latitude: location.latitude,
        longitude: location.longitude,
      })
        .then((place) => {
          if (place) {
            const formatted = place.place_formatted;
            setAddress(
              formatted.length > 25 ? `${formatted.slice(0, 25)}...` : formatted
            );
          } else {
            setAddress('Address Unavailable');
            // console.error('No address found');
          }
        })
        .catch((_error) => {
          // console.error('Error fetching address:', error);
        });
    }
  }, [location, reverseGeocode]);

  return (
    <div className="flex flex-col items-end justify-end">
      {!address && <div className="font-semibold">Select location</div>}
      {isIp && (
        <button
          className="mt-1 mb-2 text-purple-500 text-xs underline hover:text-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isRequesting}
          onClick={handleEnableLocation}
          type="button"
        >
          {isRequesting
            ? 'Requesting permission...'
            : 'Enable location for better accuracy'}
        </button>
      )}
      <div className="flex items-center gap-2">
        <MapPinIcon
          aria-label="Location icon"
          className="text-purple-600"
          size={20}
          weight="fill"
        />
        <div className="text-purple-600 text-sm">
          {address || 'Get accurate namaz time'}
        </div>
      </div>
    </div>
  );
}
