import { joinClassNames } from '@vertex-protocol/web-common';

export function IncrementMarker({ increment }: { increment: string }) {
  return (
    <div
      className={joinClassNames(
        'flex h-12 w-full flex-col items-end justify-end gap-y-1 overflow-visible',
        'font-dmSans text-xs font-normal',
        'sm:text-sm',
        'md:text-base',
      )}
    >
      <div className="flex flex-col items-center">
        <div className="bg-white-600 h-full w-0.5 py-2" />
        {increment}
      </div>
    </div>
  );
}
