import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  BigDecimal,
  BigDecimals,
  removeDecimals,
  sumBigDecimalBy,
} from '@vertex-protocol/utils';
import {
  createQueryKey,
  QueryDisabledError,
} from '@vertex-protocol/react-client';
import { useAllMarketsHistoricalMetrics } from 'client/hooks/markets/useAllMarketsHistoricalMetrics';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useAllMarkets } from 'client/hooks/query/markets/useAllMarkets';
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
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();

  const disabled = !marketMetrics || !allMarketsStaticData;

  const queryFn = (): MarketsOverviewData => {
    if (disabled) {
      throw new QueryDisabledError();
    }

    let totalDailyVolumeInPrimaryQuote = BigDecimals.ZERO;
    let totalDailyTrades = BigDecimals.ZERO;
    let maxDailyVolume = BigDecimals.ZERO;
    let hottestMarket: StaticMarketData | undefined;

    Object.values(marketMetrics.metricsByMarket).forEach(
      ({ pastDayVolumeInPrimaryQuote, pastDayNumTrades, productId }) => {
        totalDailyVolumeInPrimaryQuote = totalDailyVolumeInPrimaryQuote.plus(
          pastDayVolumeInPrimaryQuote,
        );

        // Total daily trades across all markets
        totalDailyTrades = totalDailyTrades.plus(pastDayNumTrades);

        // Find hottest market based on daily primary quote volume
        if (pastDayVolumeInPrimaryQuote?.gt(maxDailyVolume)) {
          maxDailyVolume = pastDayVolumeInPrimaryQuote;
          hottestMarket = allMarketsStaticData.all[productId];
        }
      },
    );

    // Total daily volume across all markets
    const totalDailyVolumeUsd = removeDecimals(
      totalDailyVolumeInPrimaryQuote,
    ).multipliedBy(primaryQuotePriceUsd);

    // Total open interest across all perp markets in quote currency
    const openInterestUsd = removeDecimals(
      sumBigDecimalBy(
        Object.values(allMarketsData?.perpMarkets ?? {}),
        ({ product }) => product.openInterest.multipliedBy(product.oraclePrice),
      ),
    ).multipliedBy(primaryQuotePriceUsd);

    // Total cumulative volume across all markets
    const totalCumulativeVolumeUsd = removeDecimals(
      marketMetrics.totalCumulativeVolumeInPrimaryQuote,
    ).multipliedBy(primaryQuotePriceUsd);

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
