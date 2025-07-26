import { headers } from 'next/headers';
import { PrayerCard } from '@/components/PrayerCard';
import { getLocationFromIp } from '@/lib/IPLocation';

export default async function Home() {
  const headersList = await headers();
  const forwardedFor = headersList.get('x-forwarded-for');
  const ip = forwardedFor?.split(',')[0] || 'Unknown IP';

  const { latitude, longitude } = await getLocationFromIp(ip);
  return (
    <div className="flex flex-1 flex-col items-center p-5 md:p-8">
      <PrayerCard ipLocation={{ latitude, longitude }} />
    </div>
  );
}
