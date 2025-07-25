'use client';

import { format } from 'date-fns';
import { usePrayerTime } from '@/hooks/usePrayerTIme';

export function PrayerTImes() {
  const { data, isLoading } = usePrayerTime();

  return (
    <div>
      <h2>Prayer Times</h2>
      {isLoading && <p>Loading...</p>}
      {/* {error && <p>Error fetching prayer times</p>} */}
      {data && (
        <ul>
          {Object.entries(data.timings).map(([key, value]) => (
            <li key={key}>
              {key}: {format(new Date(`1970-01-01T${value}:00`), 'hh:mm a')}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
