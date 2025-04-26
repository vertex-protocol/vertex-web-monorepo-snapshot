'use client';

import { CustomNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { LinkButton } from '@vertex-protocol/web-ui';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { useMoneyMarketsOverview } from 'client/pages/MoneyMarkets/components/MoneyMarketsOverview/useMoneyMarketsOverview';
import { MoneyMarketsSectionTitle } from 'client/pages/MoneyMarkets/components/MoneyMarketsSectionTitle';
import { LINKS } from 'common/brandMetadata/links/links';
import Link from 'next/link';

export function MoneyMarketsOverview() {
  const { data: moneyMarketsOverviewData } = useMoneyMarketsOverview();

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-baseline gap-x-4">
        <MoneyMarketsSectionTitle>Markets</MoneyMarketsSectionTitle>
        <LinkButton
          className="text-xs"
          external
          withExternalIcon
          as={Link}
          href={LINKS.stats}
          colorVariant="primary"
        >
          Stats Dashboard
        </LinkButton>
      </div>
      <div className="flex gap-x-6">
        <ValueWithLabel.Vertical
          sizeVariant="lg"
          label="Total Deposits"
          value={moneyMarketsOverviewData?.totalDepositsUsd}
          numberFormatSpecifier={
            CustomNumberFormatSpecifier.CURRENCY_LARGE_ABBREVIATED
          }
        />
        <ValueWithLabel.Vertical
          sizeVariant="lg"
          label="Total Borrows"
          value={moneyMarketsOverviewData?.totalBorrowsUsd}
          numberFormatSpecifier={
            CustomNumberFormatSpecifier.CURRENCY_LARGE_ABBREVIATED
          }
        />
      </div>
    </div>
  );
}
