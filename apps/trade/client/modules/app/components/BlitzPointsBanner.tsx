'use client';

import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { LinkButton, Pill } from '@vertex-protocol/web-ui';
import { AppPromoBanner } from 'client/modules/app/components/AppPromoBanner';
import { useIsEnabledForBrand } from 'client/modules/envSpecificContent/hooks/useIsEnabledForBrand';
import { BLITZ_SPECIFIC_IMAGES } from 'common/brandMetadata/images';
import { BLITZ_SPECIFIC_LINKS } from 'common/brandMetadata/links/blitzLinks';
import Image from 'next/image';
import Link from 'next/link';

export function BlitzPointsBanner({ className }: WithClassnames) {
  const isBlitz = useIsEnabledForBrand(['blitz']);

  if (!isBlitz) {
    return null;
  }

  return (
    <AppPromoBanner
      disclosureKey="blitz_points_banner_phase_2"
      className={joinClassNames('bg-surface-1 gap-x-12', className)}
    >
      <div className="flex flex-row items-center gap-3 sm:flex-col">
        <Image
          src={BLITZ_SPECIFIC_IMAGES.blastLogo}
          priority
          alt="blast"
          className="h-4 w-auto"
        />
        <Pill
          className="text-accent-blast"
          sizeVariant="xs"
          colorVariant="primary"
          borderRadiusVariant="base"
        >
          Phase 2 now live
        </Pill>
      </div>
      <p className="text-text-secondary text-xs sm:text-sm">
        Phase 2 of Blast Incentives has started. Your Blast points and Gold will
        restart. You can still view and claim Phase 1 Blast rewards via the{' '}
        <LinkButton
          className="text-accent-blast"
          colorVariant="accent"
          external
          as={Link}
          href={BLITZ_SPECIFIC_LINKS.blastAirdropPoints}
        >
          Blast
        </LinkButton>{' '}
        app.
      </p>
    </AppPromoBanner>
  );
}
