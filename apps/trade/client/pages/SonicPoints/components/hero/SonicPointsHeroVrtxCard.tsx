import { joinClassNames } from '@vertex-protocol/web-common';
import { LinkButton } from '@vertex-protocol/web-ui';
import { ROUTES } from 'client/modules/app/consts/routes';
import { SonicPointsCard } from 'client/pages/SonicPoints/components/SonicPointsCard';
import Image from 'next/image';
import Link from 'next/link';

import vLogo from 'client/pages/SonicPoints/components/hero/assets/vrtx-logo.png';

export function SonicPointsHeroVrtxCard() {
  return (
    <SonicPointsCard titleContent="VRTX Rewards" className="group">
      <Image
        quality={100}
        className={joinClassNames(
          'absolute -right-2 top-2 h-24 w-auto',
          'lg:-top-1/4 lg:right-8 lg:h-44',
          'duration-1000 group-hover:scale-105',
        )}
        src={vLogo}
        alt=""
      />
      <p>You also earn VRTX by trading.</p>
      <p>
        To view and claim, visit the{' '}
        <LinkButton colorVariant="primary" as={Link} href={ROUTES.rewards}>
          Rewards page
        </LinkButton>
        .
      </p>
    </SonicPointsCard>
  );
}
