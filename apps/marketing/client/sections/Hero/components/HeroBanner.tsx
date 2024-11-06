import { joinClassNames } from '@vertex-protocol/web-common';

export function HeroBanner() {
  return (
    <div
      className={joinClassNames(
        'flex flex-col items-center gap-y-2',
        'font-dmSans max-w-[682px]',
        'sm:gap-3.5',
        'lg:gap-y-4',
      )}
    >
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
            'xl:text-5xl',
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
      <div
        className={joinClassNames(
          'px-4 text-center text-sm',
          'sm:text-base',
          'lg:text-lg',
        )}
      >
        <p>
          Lightning-fast orderbook, cross-chain liquidity, and unbeatable fees.
        </p>
        <p>Vertex is not just another exchange.</p>
      </div>
    </div>
  );
}
