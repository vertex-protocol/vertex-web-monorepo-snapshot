import { joinClassNames } from '@vertex-protocol/web-common';
import { DEFAULT_SECTION_WIDTH } from 'client/consts';
import Image from 'next/image';
import { VrtxHeaderContent } from './components/VrtxHeaderContent';
import { VrtxInfoSectionContent } from './components/VrtxInfoSectionContent/VrtxInfoSectionContent';

import vovrtx from './assets/vovrtx-logo.png';

export function Vrtx() {
  return (
    <section
      className={joinClassNames(
        DEFAULT_SECTION_WIDTH,
        'flex flex-col gap-y-16 lg:gap-y-24',
        'px-5 py-8 sm:px-20 sm:py-12 lg:px-44 lg:py-24 xl:px-60',
      )}
    >
      <div>
        {/* Mobile logo */}
        <Image
          src={vovrtx}
          alt="voVRTX logo"
          // Using margin to properly align the mobile image
          className="mx-auto -mt-20 h-auto w-full  max-w-96 md:hidden"
        />
        <VrtxHeaderContent />
      </div>
      <div className="flex items-center md:grid md:grid-cols-2 md:gap-x-24">
        <VrtxInfoSectionContent className="w-full" />
        {/* Desktop Logo */}
        <Image
          src={vovrtx}
          alt="voVRTX logo"
          className="hidden max-w-[500px] md:block"
        />
      </div>
    </section>
  );
}
