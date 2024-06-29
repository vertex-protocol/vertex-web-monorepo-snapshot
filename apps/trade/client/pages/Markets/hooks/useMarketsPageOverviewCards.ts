import { useMarketsOverview } from 'client/hooks/markets/useMarketsOverview';
import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { formatNumber } from '@vertex-protocol/react-client';
import { ReactNode, useMemo } from 'react';

interface CardProps {
  title: string;
  value: ReactNode;
}

export function useMarketsPageOverviewCards() {
  const marketsOverview = useMarketsOverview();
  return useMemo(
    (): CardProps[] => [
      {
        title: '24h Volume',
        value: formatNumber(marketsOverview.data?.totalDailyVolumeUsd, {
          formatSpecifier:
            CustomNumberFormatSpecifier.CURRENCY_LARGE_ABBREVIATED,
        }),
      },
      {
        title: 'Open Interest',
        value: formatNumber(marketsOverview.data?.openInterestUsd, {
          formatSpecifier:
            CustomNumberFormatSpecifier.CURRENCY_LARGE_ABBREVIATED,
        }),
      },
      {
        title: '24h Trades',
        value: formatNumber(marketsOverview.data?.totalDailyTrades, {
          formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
        }),
      },
      {
        title: 'All Time Volume',
        value: formatNumber(marketsOverview.data?.totalCumulativeVolumeUsd, {
          formatSpecifier:
            CustomNumberFormatSpecifier.CURRENCY_LARGE_ABBREVIATED,
        }),
      },
    ],
    [marketsOverview],
  );
}
