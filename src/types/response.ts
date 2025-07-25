export type PrayerTimings = {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Sunset: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
  Firstthird: string;
  Lastthird: string;
};

export type HijriWeekday = {
  en: string;
  ar: string;
};

export type HijriMonth = {
  number: number;
  en: string;
  ar: string;
  days: number;
};

export type HijriDesignation = {
  abbreviated: string;
  expanded: string;
};

export type HijriDate = {
  date: string;
  format: string;
  day: string;
  weekday: HijriWeekday;
  month: HijriMonth;
  year: string;
  designation: HijriDesignation;
  holidays: unknown[];
  adjustedHolidays: string[];
  method: string;
};

export type GregorianWeekday = {
  en: string;
};

export type GregorianMonth = {
  number: number;
  en: string;
};

export type GregorianDesignation = {
  abbreviated: string;
  expanded: string;
};

export type GregorianDate = {
  date: string;
  format: string;
  day: string;
  weekday: GregorianWeekday;
  month: GregorianMonth;
  year: string;
  designation: GregorianDesignation;
  lunarSighting: boolean;
};

export type DateData = {
  readable: string;
  timestamp: string;
  hijri: HijriDate;
  gregorian: GregorianDate;
};

export type MethodParams = {
  Fajr: number;
  Isha: number;
};

export type MethodLocation = {
  latitude: number;
  longitude: number;
};

export type CalculationMethod = {
  id: number;
  name: string;
  params: MethodParams;
  location: MethodLocation;
};

export type OffsetTimings = {
  Imsak: number;
  Fajr: number;
  Sunrise: number;
  Dhuhr: number;
  Asr: number;
  Sunset: number;
  Maghrib: number;
  Isha: number;
  Midnight: number;
};

export type MetaData = {
  latitude: number;
  longitude: number;
  timezone: string;
  method: CalculationMethod;
  latitudeAdjustmentMethod: string;
  midnightMode: string;
  school: string;
  offset: OffsetTimings;
};

export interface IResponse<T> {
  code: number;
  status: string;
  data: T;
}

export type PrayerTimesResponse = IResponse<{
  timings: PrayerTimings;
  date: DateData;
  meta: MetaData;
}>;
