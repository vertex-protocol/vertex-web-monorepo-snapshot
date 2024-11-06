import { joinClassNames } from '@vertex-protocol/web-common';
import { SECTION_IDS } from 'client/consts';
import { HeroBanner } from 'client/sections/Hero/components/HeroBanner';
import { HeroMetrics } from 'client/sections/Hero/components/HeroMetrics';
import { HeroTradingCta } from 'client/sections/Hero/components/HeroTradingCta';
import Image from 'next/image';

// Images
import desktopShots from 'client/sections/Hero/assets/desktop-hero-shots.png';
import mobileShots from 'client/sections/Hero/assets/mobile-hero-shots.png';

export function Hero() {
  const sectionPaddingClassName = 'pt-40 sm:pt-44 xl:pt-52 pb-16';

  return (
    <section
      className={joinClassNames(
        'text-white-700 z-10 flex w-full gap-y-16',
        'flex-col justify-center overflow-hidden',
        'sm:items-center sm:gap-y-12 xl:gap-y-20',
        sectionPaddingClassName,
      )}
      id={SECTION_IDS.hero}
    >
      <div className="flex flex-col items-center gap-y-14 px-8 sm:gap-y-28 xl:gap-y-40">
        <div
          className={joinClassNames(
            'flex flex-1 flex-col items-center justify-center gap-y-12',
            'xl:gap-y-8',
          )}
        >
          <HeroBanner />
          <HeroTradingCta className="w-full" />
        </div>
        <HeroMetrics />
      </div>
      <Image
        className="hidden w-full sm:block"
        src={desktopShots}
        alt="hero shots"
        priority
        quality={100}
      />
      <div className="relative mx-auto flex h-[24rem] items-center overflow-hidden px-4 sm:hidden">
        <Image
          className="h-full w-auto drop-shadow-2xl"
          src={mobileShots}
          alt="hero shots"
          quality={100}
          priority
        />
      </div>
    </section>
  );
}
