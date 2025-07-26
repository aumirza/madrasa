// Prayer time utilities for 5 daily prayers

import type { PrayerTimings } from '../types/response';
import { formatTo12Hour, parseTimeToDate } from './time';

const PRAYER_ORDER = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const;

export function getFivePrayerTimes(timings: PrayerTimings) {
  return PRAYER_ORDER.map((name) => ({
    name,
    time: formatTo12Hour(timings[name]),
  }));
}

export function getCurrentAndNextPrayer(
  timings: PrayerTimings,
  now: Date = new Date()
): {
  current: string | null;
  next: string | null;
  nextTime: string | null;
} {
  const prayers = getFivePrayerTimes(timings);
  const today = new Date(now);
  let current: string | null = null;
  let next: string | null = null;
  let nextTime: string | null = null;

  for (const [i, prayer] of prayers.entries()) {
    const prayerTime = parseTimeToDate(timings[prayer.name], today);
    const nextPrayer = prayers.at(i + 1);
    const nextPrayerTime = nextPrayer
      ? parseTimeToDate(timings[nextPrayer.name], today)
      : null;

    if (now >= prayerTime && (!nextPrayerTime || now < nextPrayerTime)) {
      current = prayer.name;
      // If current prayer is Isha (last prayer), next is Fajr of next day
      if (nextPrayer) {
        next = nextPrayer.name;
        nextTime = nextPrayer.time;
      } else {
        next = 'Fajr';
        nextTime = timings.Fajr;
      }
      break;
    }

    if (now < prayerTime) {
      next = prayer.name;
      nextTime = prayer.time;
      break;
    }
  }

  // Special handling: after midnight but before Fajr, treat current as Isha
  const fajrTime = parseTimeToDate(timings.Fajr, today);
  const ishaDate = new Date(today);
  ishaDate.setDate(ishaDate.getDate() - 1);
  const ishaTime = parseTimeToDate(timings.Isha, ishaDate);
  if (now > ishaTime && now < fajrTime) {
    current = 'Isha';
    next = 'Fajr';
    nextTime = timings.Fajr;
  }

  return { current, next, nextTime };
}

export function getTimeRemainingToNextPrayer(
  timings: PrayerTimings,
  now: Date = new Date()
): string {
  const { next, nextTime } = getCurrentAndNextPrayer(timings, now);

  if (!nextTime) {
    return '';
  }

  const today = new Date(now);
  let nextPrayerTime = parseTimeToDate(
    timings[next as keyof PrayerTimings] || '',
    today
  );

  // If next prayer is Fajr and current time is after Isha,
  // the next Fajr is tomorrow
  if (next === 'Fajr') {
    const ishaTime = parseTimeToDate(timings.Isha, today);
    if (now >= ishaTime) {
      const nextDay = new Date(today);
      nextDay.setDate(nextDay.getDate() + 1);
      nextPrayerTime = parseTimeToDate(timings.Fajr, nextDay);
    }
  }

  const timeDiff = nextPrayerTime.getTime() - now.getTime();

  if (timeDiff <= 0) {
    return '';
  }

  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

export function calculatePrayerProgress(
  timings: PrayerTimings,
  now: Date = new Date()
): number[] {
  const prayers = getFivePrayerTimes(timings);
  const today = new Date(now);
  const { current } = getCurrentAndNextPrayer(timings, now);

  return prayers.map((prayer, index) => {
    // If no current prayer is found, all prayers are completed for the day
    if (!current) {
      return 1;
    }

    // If this prayer comes before the current prayer, it's completed
    if (prayers.findIndex((p) => p.name === current) > index) {
      return 1;
    }

    // Special handling for Isha after midnight but before Fajr
    if (prayer.name === 'Isha' && current === 'Isha') {
      const fajrTime = parseTimeToDate(timings.Fajr, today);
      const ishaDate = new Date(today);
      let currentPrayerTime = parseTimeToDate(timings.Isha, today);
      if (now < fajrTime && now.getHours() < 6) {
        ishaDate.setDate(ishaDate.getDate() - 1);
        currentPrayerTime = parseTimeToDate(timings.Isha, ishaDate);
      }
      const totalDuration = fajrTime.getTime() - currentPrayerTime.getTime();
      const elapsed = now.getTime() - currentPrayerTime.getTime();
      return Math.min(Math.max(elapsed / totalDuration, 0), 1);
    }

    // If this is the current prayer, calculate progress
    if (prayer.name === current) {
      const currentPrayerTime = parseTimeToDate(timings[prayer.name], today);
      const nextPrayer = prayers.at(index + 1);

      // If it's the last prayer of the day (Isha), calculate until Fajr of next day
      if (!nextPrayer) {
        const nextDay = new Date(today);
        nextDay.setDate(nextDay.getDate() + 1);
        const nextFajrTime = parseTimeToDate(timings.Fajr, nextDay);
        const totalDuration =
          nextFajrTime.getTime() - currentPrayerTime.getTime();
        const elapsed = now.getTime() - currentPrayerTime.getTime();
        return Math.min(Math.max(elapsed / totalDuration, 0), 1);
      }

      const nextPrayerTime = parseTimeToDate(timings[nextPrayer.name], today);
      const totalDuration =
        nextPrayerTime.getTime() - currentPrayerTime.getTime();
      const elapsed = now.getTime() - currentPrayerTime.getTime();

      return Math.min(Math.max(elapsed / totalDuration, 0), 1);
    }

    // If this prayer comes after the current prayer, it hasn't started
    return 0;
  });
}
