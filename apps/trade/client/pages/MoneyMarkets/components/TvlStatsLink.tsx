'use client';

import {
  formatNumber,
  CustomNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { LinkButton } from '@vertex-protocol/web-ui';
import { useEnabledFeatures } from 'client/modules/envSpecificContent/hooks/useEnabledFeatures';
import { useTvlUsd } from 'client/pages/MoneyMarkets/hooks/useTvlUsd';
import { LINKS } from 'common/brandMetadata/links/links';
import { clientEnv } from 'common/environment/clientEnv';
import Link from 'next/link';

export function TvlStatsLink() {
  const tvlUsd = useTvlUsd();
  const { isStatsLinkEnabled } = useEnabledFeatures();

  return (
    <span className="text-xs lg:text-sm">
      {clientEnv.brandMetadata.displayName} TVL:{' '}
      <span className="text-text-primary">
        {formatNumber(tvlUsd, {
          formatSpecifier:
            CustomNumberFormatSpecifier.CURRENCY_LARGE_ABBREVIATED,
        })}
      </span>
      {isStatsLinkEnabled && (
        <LinkButton
          external
          withExternalIcon
          as={Link}
          href={LINKS.stats}
          colorVariant="primary"
          className="ml-2"
        >
          Stats
        </LinkButton>
      )}
    </span>
  );
}
