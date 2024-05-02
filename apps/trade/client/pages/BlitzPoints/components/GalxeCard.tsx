import {
  BLITZ_SPECIFIC_LINKS,
  joinClassNames,
} from '@vertex-protocol/web-common';
import { Card, Icons, SecondaryButton } from '@vertex-protocol/web-ui';
import { IMAGES } from 'client/modules/brand/images';

import galxeLogo from 'client/pages/BlitzPoints/assets/galxe-logo.svg';
import Image from 'next/image';
import Link from 'next/link';

export function GalxeCard() {
  return (
    <Card className="flex flex-col gap-y-4 p-6 lg:p-10">
      <div className="flex items-center justify-start gap-x-2">
        <Image src={IMAGES.brandLogo} alt="blitz" className="h-3 w-auto" />
        <Icons.PiXBold className="text-text-primary aspect-square w-2 sm:w-3" />
        <Image src={galxeLogo} alt="galxe" className="h-3 w-auto" />
      </div>
      <div
        className={joinClassNames(
          'flex flex-col gap-y-9',
          'lg:flex-row lg:justify-between lg:gap-x-4',
        )}
      >
        <p className="text-text-secondary text-sm">
          Complete missions on Galxe to earn community points.
        </p>
        <SecondaryButton
          size="lg"
          as={Link}
          href={BLITZ_SPECIFIC_LINKS.galxe}
          external
        >
          Explore Missions
        </SecondaryButton>
      </div>
    </Card>
  );
}
