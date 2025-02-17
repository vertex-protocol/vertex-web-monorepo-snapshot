import {
  DELIST_REDUCE_ONLY_TIME_MILLIS,
  DELIST_TIME_MILLIS,
  PENDING_DELIST_PERP_PRODUCT_IDS,
} from '@vertex-protocol/react-client';
import {
  formatTimestamp,
  LinkButton,
  TimeFormatSpecifier,
} from '@vertex-protocol/web-ui';
import { WarningPanel } from 'client/components/WarningPanel';
import { PerpStaticMarketData } from 'client/hooks/markets/marketsStaticData/types';
import { LINKS } from 'common/brandMetadata/links/links';
import Link from 'next/link';

interface Props {
  currentMarket: PerpStaticMarketData | undefined;
}

export function ProductPendingDelistInfoPanel({ currentMarket }: Props) {
  if (!currentMarket) {
    return null;
  }

  const productId = currentMarket.productId;
  const isPendingDelist = PENDING_DELIST_PERP_PRODUCT_IDS.has(productId);

  if (!isPendingDelist) {
    return null;
  }

  const marketName = currentMarket.metadata.marketName;
  const reduceOnlyTime = formatTimestamp(DELIST_REDUCE_ONLY_TIME_MILLIS, {
    formatSpecifier: TimeFormatSpecifier.MMM_D_HH_12H_O,
  });
  const delistTime = formatTimestamp(DELIST_TIME_MILLIS, {
    formatSpecifier: TimeFormatSpecifier.MMM_D_HH_12H_O,
  });

  return (
    <WarningPanel title={`${marketName} will be delisted`}>
      <p>
        At <span className="text-text-primary">{reduceOnlyTime}</span>,{' '}
        {marketName} will enter settlement mode and you will only be allowed to
        close your position.
      </p>
      <p>
        Trading will fully cease at{' '}
        <span className="text-text-primary">{delistTime}</span> and positions
        will be force closed.
      </p>
      <LinkButton
        colorVariant="primary"
        as={Link}
        external
        withExternalIcon
        href={LINKS.feb13DelistInfo}
      >
        Full Details
      </LinkButton>
    </WarningPanel>
  );
}
