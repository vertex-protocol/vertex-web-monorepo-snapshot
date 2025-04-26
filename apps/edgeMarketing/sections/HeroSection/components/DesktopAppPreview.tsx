import { joinClassNames } from '@vertex-protocol/web-common';
import { AppCard } from 'sections/HeroSection/components/useBuiltOnEdge';

interface Props {
  selectedApp: AppCard | undefined;
}
export function DesktopAppPreview({ selectedApp }: Props) {
  return (
    <div
      className={joinClassNames(
        'absolute right-0 bottom-32 justify-end overflow-hidden',
        'h-[270px] w-[380px]',
        'z-1 hidden sm:flex',
        selectedApp ? 'visible' : 'invisible',
      )}
    >
      <div
        className={joinClassNames(
          'absolute flex flex-col gap-2',
          'rounded-[14px] border border-zinc-200 p-1.5',
          'bg-zinc-200/20 backdrop-blur-sm',
          'transition-all duration-300',
          selectedApp ? 'top-0 scale-100' : 'top-6 scale-90 opacity-0',
        )}
      >
        <div className="h-[196px] w-[350px] overflow-hidden rounded-[10px]">
          {selectedApp?.preview}
        </div>
        <div
          className={joinClassNames(
            'text-md flex h-9 justify-center rounded-[10px] bg-black py-2 text-white',
            selectedApp ? 'visible' : 'invisible',
          )}
        >
          {selectedApp?.feature}
        </div>
      </div>
    </div>
  );
}
