'use client';

import { LinkButton } from '@vertex-protocol/web-ui';
import { useEnabledFeatures } from 'client/modules/envSpecificContent/hooks/useEnabledFeatures';
import { LINKS } from 'common/brandMetadata/links/links';
import Link from 'next/link';

export function StatsLinkButton() {
  const { isStatsLinkEnabled } = useEnabledFeatures();

  if (!isStatsLinkEnabled) {
    return null;
  }

  return (
    <LinkButton
      colorVariant="primary"
      as={Link}
      href={LINKS.stats}
      className="text-sm"
      external
      withExternalIcon
    >
      Stats Dashboard
    </LinkButton>
  );
}
