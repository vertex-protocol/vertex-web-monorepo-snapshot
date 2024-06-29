import {
  DEFAULT_SECTION_GAP,
  DEFAULT_SECTION_PADDING,
  DEFAULT_SECTION_WIDTH,
  SECTION_IDS,
} from 'client/consts';
import { FlexibilityHeader } from 'client/sections/Flexibility/components/FlexibilityHeader';
import Image from 'next/image';

// Images
import desktopShots from 'client/sections/Flexibility/assets/flexibility-shots.svg';
import mobileShots from 'client/sections/Flexibility/assets/mobile-flexibility-shots.svg';
import { joinClassNames } from '@vertex-protocol/web-common';

export function Flexibility() {
  return (
    <section
      className={joinClassNames(
        'flex w-full flex-col items-center justify-center overflow-hidden',
        DEFAULT_SECTION_PADDING,
        DEFAULT_SECTION_GAP,
        DEFAULT_SECTION_WIDTH,
        'pr-0',
      )}
      id={SECTION_IDS.flexibility}
    >
      <FlexibilityHeader />
      <Image
        className="xs:block hidden"
        src={desktopShots}
        alt="Universal Margin Account"
      />
      <Image
        className="xs:hidden w-full"
        src={mobileShots}
        alt="Universal Margin Account"
      />
    </section>
  );
}
