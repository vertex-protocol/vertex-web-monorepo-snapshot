import { joinClassNames } from '@vertex-protocol/web-common';

export function HeroBanner() {
  return (
    <div className="font-dmSans text-white-700 flex max-w-[682px] flex-col items-center gap-y-3.5 lg:gap-y-5">
      <div
        className={joinClassNames(
          'text-center font-sans font-bold',
          'md:tracking-normal',
        )}
      >
        <div
          className={joinClassNames(
            'text-xl leading-none text-purple-800',
            'sm:text-3xl',
            'lg:text-4xl',
            'xl:text-6xl',
          )}
        >
          Decentralized trading
        </div>
        <div
          className={joinClassNames(
            'text-6xl leading-tight text-white',
            'sm:-mt-2 sm:text-8xl',
            'lg:text-9xl',
            'xl:text-10xl',
          )}
        >
          Powerhouse
        </div>
      </div>
      <p
        className={joinClassNames(
          'px-3 text-center text-base leading-tight',
          'xs:px-10',
          'sm:px-32',
          'lg:px-12 lg:text-xl',
          'xl:px-4 xl:text-2xl',
        )}
      >
        Lightning-fast orderbook DEX with powerful trading features &amp;
        cross-margining for max efficiency.
      </p>
    </div>
  );
}
