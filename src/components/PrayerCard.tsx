'use client';

import { GRADIENT_MAP, ICON_MAP } from '@/constants/prayer';
import { usePrayerTime } from '@/hooks/usePrayerTIme';
import { cn } from '@/lib/utils';
import {
  calculatePrayerProgress,
  getCurrentAndNextPrayer,
  getFivePrayerTimes,
  getTimeRemainingToNextPrayer,
} from '@/utils/prayer';
import { PrayerTimeItem } from './PrayerTimeItem';
import { ProgressArc } from './ProgressArc';
import { Badge } from './ui/badge';

export function PrayerCard() {
  const { data, isLoading } = usePrayerTime();
  if (!(data || isLoading)) {
    return <div>Error fetching prayer times</div>;
  }
  if (!data) {
    return <div>Error fetching prayer times</div>;
  }
  const { current } = getCurrentAndNextPrayer(data.timings);
  const allPrayers = getFivePrayerTimes(data.timings);
  const prayerProgress = calculatePrayerProgress(data.timings);
  const timeRemaining = getTimeRemainingToNextPrayer(data.timings);

  const Icon = current
    ? ICON_MAP[current as keyof typeof ICON_MAP] || null
    : null;

  return (
    <div
      className={cn(
        'relative flex h-80 w-84 flex-col justify-between rounded-xl bg-gradient-to-t p-5',
        GRADIENT_MAP[current as keyof typeof GRADIENT_MAP] || 'bg-purple-800'
      )}
    >
      {isLoading && <p>Loading...</p>}
      <div className="mb-4 flex items-start justify-between">
        <div className="">
          <div className="flex items-center gap-2">
            {Icon ? <Icon className="size-8 text-white" /> : null}
            <p className="font-semibold text-3xl text-white">{current}</p>
          </div>
          <p className="text-white">
            Next Prayer in {timeRemaining || 'calculating...'}
          </p>
        </div>
        <Badge className="rounded-full bg-white/40 ">
          {data.date.gregorian.weekday.en}
        </Badge>
      </div>
      <div className="flex justify-around">
        {Object.entries(allPrayers).map(([ind, { name, time }]) => (
          <PrayerTimeItem
            isCurrent={name === current}
            key={ind}
            name={name}
            time={time}
          />
        ))}
      </div>
      <ProgressArc progress={prayerProgress} />
    </div>
  );
}
