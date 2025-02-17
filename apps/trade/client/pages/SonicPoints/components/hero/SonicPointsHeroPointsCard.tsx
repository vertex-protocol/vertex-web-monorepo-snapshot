import { joinClassNames } from '@vertex-protocol/web-common';
import { LinkButton } from '@vertex-protocol/web-ui';
import { SonicPointsCard } from 'client/pages/SonicPoints/components/SonicPointsCard';
import { VERTEX_SPECIFIC_LINKS } from 'common/brandMetadata/links/vertexLinks';
import Image from 'next/image';
import Link from 'next/link';

import pointsDesktop from 'client/pages/SonicPoints/components/hero/assets/points-desktop.svg';
import pointsMobile from 'client/pages/SonicPoints/components/hero/assets/points-mobile.svg';

export function SonicPointsHeroPointsCard() {
  const sharedImageClassName =
    'absolute -bottom-2 top-0 group-hover:scale-105 duration-1000';

  return (
    <SonicPointsCard titleContent="Sonic Points" className="group">
      {/* Desktop Image */}
      <Image
        src={pointsDesktop}
        alt=""
        className={joinClassNames(
          'right-4 hidden lg:block',
          sharedImageClassName,
        )}
      />
      {/* Mobile Image */}
      <Image
        src={pointsMobile}
        alt=""
        className={joinClassNames('right-0 lg:hidden', sharedImageClassName)}
      />
      <p>Sonic has an additional points program.</p>
      <p>
        To view Sonic points, visit the{' '}
        <LinkButton
          colorVariant="primary"
          as={Link}
          href={VERTEX_SPECIFIC_LINKS.sonicApp}
          external
          withExternalIcon
        >
          Sonic app
        </LinkButton>
      </p>
    </SonicPointsCard>
  );
}
