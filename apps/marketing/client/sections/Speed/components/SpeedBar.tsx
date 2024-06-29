import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { ReactNode } from 'react';

export function SpeedBar({
  className,
  inView,
  label,
}: WithClassnames<{ inView: boolean; label: ReactNode }>) {
  return (
    <div className="text-black-500 flex w-full flex-col gap-3 md:gap-y-1.5">
      <div className="bg-white-400 rounded">
        <div
          className={joinClassNames(
            'h-3 origin-left rounded md:h-4',
            'bg-purple-800/50',
            inView ? 'scale-x-100' : 'scale-x-0',
            className,
          )}
        />
      </div>
      <div
        className={joinClassNames(
          'font-dmSans text-base font-normal delay-200 duration-300',
          inView ? 'opacity-100' : 'opacity-0',
        )}
      >
        {label}
      </div>
    </div>
  );
}
