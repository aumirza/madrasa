import { MapPinIcon } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { useReverseGeocode } from '@/hooks/useReverseGeocode';
import { useUserLocation } from '@/hooks/useUserLocation';

export function LocationSelector() {
  const [address, setAddress] = useState<string | null>(null);
  const { location } = useUserLocation();
  const { reverseGeocode } = useReverseGeocode();

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
