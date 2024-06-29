import { GradientButton } from 'client/components/Button/GradientButton';
import { EXTERNAL_LINKS, SECTION_IDS } from 'client/consts';
import Image from 'next/image';
import Link from 'next/link';
import { HeroBanner } from './components/HeroBanner';
import { HeroMetrics } from './components/HeroMetrics';
import { joinClassNames } from '@vertex-protocol/web-common';

// Images
import desktopShots from 'client/sections/Hero/assets/desktop-hero-shots.svg';
import mobileShots1 from 'client/sections/Hero/assets/mobile-hero-shots-1.svg';
import mobileShots2 from 'client/sections/Hero/assets/mobile-hero-shots-2.svg';

export function Hero() {
  const sectionPaddingClassName = 'pt-32 sm:pb-8 sm:pt-40 md:pt-44 xl:py-48';

  return (
    <section
      className={joinClassNames(
        'z-10 -mb-28 flex w-full gap-y-20',
        'flex-col justify-center overflow-visible',
        'sm:items-center sm:gap-y-8',
        sectionPaddingClassName,
      )}
      id={SECTION_IDS.hero}
    >
      <div className="flex flex-col gap-y-14 md:gap-y-20 lg:gap-y-28 xl:gap-y-32">
        <div className="flex flex-1 flex-col items-center justify-center gap-y-6 xl:gap-y-8">
          <div
            className={joinClassNames(
              'bg-black-800 border-white-400 text-white-700',
              'rounded-full border px-4 py-1.5 text-xs',
              'sm:text-sm',
              'lg:text-base',
            )}
          >
            Take back control from CEXs
          </div>
          <HeroBanner />
          <GradientButton
            className={joinClassNames(
              'z-20 px-8 py-2 text-sm',
              'sm:text-base',
              'lg:py-3 lg:text-lg',
            )}
            as={Link}
            href={EXTERNAL_LINKS.app}
            external
          >
            Start Trading
          </GradientButton>
        </div>
        <HeroMetrics />
      </div>
      <Image
        className="drop-shadow-heroShots z-20 hidden w-full sm:block"
        src={desktopShots}
        alt="hero shots"
        priority
        quality={100}
      />
      <div className="xs:h-[40rem] relative flex h-[30rem] w-full sm:hidden">
        <Image
          className="backdrop-blur-nav absolute left-0 top-0 z-20 min-w-[60%] drop-shadow-2xl"
          src={mobileShots1}
          alt="hero shots"
          quality={100}
          priority
        />
        <Image
          className="absolute bottom-0 right-0 z-10 min-w-[60%] drop-shadow-2xl backdrop-blur"
          src={mobileShots2}
          alt="hero shots"
          quality={100}
        />
      </div>
    </section>
  );
}
