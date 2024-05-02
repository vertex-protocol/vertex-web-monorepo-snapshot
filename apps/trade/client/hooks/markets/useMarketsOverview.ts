import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { BigDecimal, sumBigDecimalBy } from '@vertex-protocol/utils';
import { createQueryKey } from '@vertex-protocol/web-data';
import { useAllMarketsHistoricalMetrics } from 'client/hooks/markets/useAllMarketsHistoricalMetrics';
import { useQuotePriceUsd } from 'client/hooks/markets/useQuotePriceUsd';
import { useAllMarkets } from 'client/hooks/query/markets/useAllMarkets';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';
import { BigDecimals } from 'client/utils/BigDecimals';
import { removeDecimals } from 'client/utils/decimalAdjustment';
import { REACT_QUERY_CONFIG } from 'client/utils/reactQueryConfig';
import {
  StaticMarketData,
  useAllMarketsStaticData,
} from './useAllMarketsStaticData';

interface MarketsOverviewData {
  totalCumulativeVolumeUsd: BigDecimal;
  totalDailyVolumeUsd: BigDecimal;
  totalDailyTrades: BigDecimal;
  openInterestUsd: BigDecimal;
  hottestMarket: StaticMarketData | undefined;
}

function marketsOverviewQueryKey(
  marketsUpdatedAt: number,
  marketSnapshotsUpdatedAt: number,
) {
  return createQueryKey(
    'marketsOverview',
    marketsUpdatedAt,
    marketSnapshotsUpdatedAt,
  );
}

export function useMarketsOverview() {
  const { data: marketMetrics, dataUpdatedAt: marketSnapshotsUpdatedAt } =
    useAllMarketsHistoricalMetrics();
  const { data: allMarketsData } = useAllMarkets();
  const { data: allMarketsStaticData, dataUpdatedAt: marketsStaticUpdatedAt } =
    useAllMarketsStaticData();
  const quotePriceUsd = useQuotePriceUsd();

  const disabled = !marketMetrics || !allMarketsStaticData;

  const queryFn = (): MarketsOverviewData => {
    if (disabled) {
      throw new QueryDisabledError();
    }

    let totalDailyVolumeQuote = BigDecimals.ZERO;
    let totalDailyTrades = BigDecimals.ZERO;
    let maxDailyVolume = BigDecimals.ZERO;
    let hottestMarket: StaticMarketData | undefined;

    Object.values(marketMetrics.metricsByMarket).forEach(
      ({ pastDayVolumeQuote, pastDayNumTrades, productId }) => {
        totalDailyVolumeQuote = totalDailyVolumeQuote.plus(pastDayVolumeQuote);

        // Total daily trades across all markets
        totalDailyTrades = totalDailyTrades.plus(pastDayNumTrades);

        // Find hottest market based on daily quote volume
        if (pastDayVolumeQuote?.gt(maxDailyVolume)) {
          maxDailyVolume = pastDayVolumeQuote;
          hottestMarket = allMarketsStaticData.all[productId];
        }
      },
    );

    // Total daily volume across all markets
    const totalDailyVolumeUsd = removeDecimals(
      totalDailyVolumeQuote,
    ).multipliedBy(quotePriceUsd);

    // Total open interest across all perp markets in quote currency
    const openInterestUsd = removeDecimals(
      sumBigDecimalBy(
        Object.values(allMarketsData?.perpMarkets ?? {}),
        ({ product }) => product.openInterest.multipliedBy(product.oraclePrice),
      ),
    ).multipliedBy(quotePriceUsd);

    // Total cumulative volume across all markets
    const totalCumulativeVolumeUsd = removeDecimals(
      marketMetrics.totalCumulativeVolumeQuote,
    ).multipliedBy(quotePriceUsd);

    return {
      totalCumulativeVolumeUsd,
      totalDailyVolumeUsd,
      totalDailyTrades,
      openInterestUsd,
      hottestMarket,
    };
  };

  return useQuery({
    queryKey: marketsOverviewQueryKey(
      marketsStaticUpdatedAt,
      marketSnapshotsUpdatedAt,
    ),
    queryFn,
    enabled: !disabled,
    placeholderData: keepPreviousData,
    gcTime: REACT_QUERY_CONFIG.computeQueryGcTime,
  });
}
