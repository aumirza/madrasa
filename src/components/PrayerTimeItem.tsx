import { ICON_MAP } from '@/constants/prayer';
import { cn } from '@/lib/utils';

export const PrayerTimeItem = ({
  name,
  time,
  isCurrent = false,
}: {
  name: string;
  time: string;
  isCurrent?: boolean;
}) => {
  const Icon = ICON_MAP[name as keyof typeof ICON_MAP] || null;
  return (
    <div className="flex flex-col items-center py-2">
      {Icon ? (
        <Icon
          className={cn('size-7', isCurrent ? 'text-white' : 'text-white/50')}
        />
      ) : null}
      <p className={cn('text-sm', isCurrent ? 'text-white' : 'text-white/50')}>
        {name}
      </p>
      <p
        className={cn(
          'font-semibold text-lg',
          isCurrent ? 'text-white' : 'text-white/70'
        )}
      >
        {time}
      </p>
    </div>
  );
};
