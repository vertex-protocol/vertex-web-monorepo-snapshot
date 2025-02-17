import { LinkButton } from '@vertex-protocol/web-ui';
import { SonicPointsCard } from 'client/pages/SonicPoints/components/SonicPointsCard';
import { SonicPointsHeroCreditsCardMetrics } from 'client/pages/SonicPoints/components/hero/SonicPointsHeroCreditsCard/SonicPointsHeroCreditsCardMetrics';
import { VERTEX_SPECIFIC_LINKS } from 'common/brandMetadata/links/vertexLinks';
import Image from 'next/image';
import Link from 'next/link';

import creditsBg from 'client/pages/SonicPoints/components/hero/assets/credits-card-bg.png';

export function SonicPointsHeroCreditsCard() {
  return (
    <SonicPointsCard
      className="bg-transparent lg:gap-y-8"
      titleContent={
        <>
          Your Credits
          <LinkButton
            className="text-xs"
            colorVariant="primary"
            as={Link}
            href={VERTEX_SPECIFIC_LINKS.sonicGemsDocs}
            external
            withExternalIcon
          >
            Program Details
          </LinkButton>
        </>
      }
      titleContentClassName="flex items-center justify-between text-xl"
      contentClassName="gap-y-6 lg:justify-between"
    >
      {/* Background Image */}
      <Image
        quality={100}
        className="-z-10 object-cover object-top"
        src={creditsBg}
        alt=""
        fill
      />
      <SonicPointsHeroCreditsCardMetrics />
      <span className="text-text-tertiary text-xs">
        Credits update every hour.
      </span>
    </SonicPointsCard>
  );
}
