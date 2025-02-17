import { joinClassNames } from '@vertex-protocol/web-common';
import Image from 'next/image';

import balloon from 'client/pages/SonicPoints/components/hero/assets/balloon.svg';
import desktopBg from 'client/pages/SonicPoints/components/hero/assets/banner-bg-desktop.png';
import mobileBg from 'client/pages/SonicPoints/components/hero/assets/banner-bg-mobile.png';
import gemsDesktop from 'client/pages/SonicPoints/components/hero/assets/gems-desktop.svg';
import gemsMobile from 'client/pages/SonicPoints/components/hero/assets/gems-mobile.svg';

export function SonicPointsDismissibleBannerContent() {
  const commonImageClassName =
    'absolute bottom-0 transform-gpu duration-1000 group-hover:scale-[1.025]';

  const backgroundImage = (
    <>
      <Image
        quality={100}
        src={mobileBg}
        alt=""
        className="top-0 -z-10 object-cover object-top sm:hidden"
        fill
      />
      <Image
        quality={100}
        src={desktopBg}
        alt=""
        className="-z-10 hidden object-cover object-top sm:block"
        fill
      />
    </>
  );

  const gemsImage = (
    <>
      <Image
        src={gemsMobile}
        alt=""
        className={joinClassNames(
          'left-1/2 h-40 w-auto -translate-x-1/2 sm:hidden',
          commonImageClassName,
        )}
      />
      <Image
        src={gemsDesktop}
        alt=""
        className={joinClassNames(
          'right-1/4 translate-x-1/3',
          'hidden h-20 w-auto sm:block lg:h-auto',
          commonImageClassName,
        )}
      />
    </>
  );

  const infoContent = (
    <>
      <h3 className="text-text-primary">Farming Details</h3>
      <div className="text-text-secondary text-xs sm:w-1/2 lg:w-1/3">
        <p>Vertex receives Gems from Sonic.</p>
        <p>
          Gems will be redistributed to traders based on Credits earned from
          trading, TVL, and referring others.
        </p>
      </div>
    </>
  );

  return (
    <>
      {/* Shared Image */}
      <Image
        src={balloon}
        alt=""
        className={joinClassNames(
          'absolute -right-6 top-1/3',
          'sm:-top-8 sm:right-1/3',
          'lg:left-1/3 lg:right-auto',
          'duration-1000 group-hover:-rotate-2 group-hover:scale-90',
        )}
      />
      {backgroundImage}
      {gemsImage}
      {infoContent}
    </>
  );
}
