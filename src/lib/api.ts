import { format } from 'date-fns';

export const createEndpoint = {
  getTodaysPrayerTimes: () => {
    const today = format(new Date(), 'dd-MM-yyyy'); // Format today's date as DD-MM-YYYY
    return `/timings/${today}`;
  },
  getPrayerTimeByDate: (date: Date) => {
    const dateString = format(date, 'dd-MM-yyyy'); // Format the date as DD-MM-YYYY
    return `/timings/${dateString}`;
  },
};
