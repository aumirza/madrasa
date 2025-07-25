// Convert 24-hour time format (HH:mm) to 12-hour format (h:mm AM/PM)
export function formatTo12Hour(time24: string): string {
  const [hours, minutes] = time24.split(':').map(Number);
  //   const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes.toString().padStart(2, '0')}`;
}

export function parseTimeToDate(time: string, baseDate: Date): Date {
  // time: "HH:mm"; baseDate: Date
  const [hour, minute] = time.split(':').map(Number);
  const date = new Date(baseDate);
  date.setHours(hour, minute, 0, 0);
  return date;
}
