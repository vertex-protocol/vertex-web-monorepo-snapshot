'use client';

import { LinkButton } from '@vertex-protocol/web-ui';
import { LINKS } from 'common/brandMetadata/links/links';
import Link from 'next/link';

export function StatsLinkButton() {
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
