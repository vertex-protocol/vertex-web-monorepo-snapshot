import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { ChainEnv } from '@vertex-protocol/client';
import {
  createQueryKey,
  QueryDisabledError,
  useEVMContext,
} from '@vertex-protocol/react-client';
import {
  BigDecimal,
  BigDecimals,
  removeDecimals,
  sumBigDecimalBy,
} from '@vertex-protocol/utils';
import { StaticMarketData } from 'client/hooks/markets/marketsStaticData/types';
import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';
import { useAllMarketsStats } from 'client/hooks/markets/useAllMarketsStats';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { REACT_QUERY_CONFIG } from 'client/utils/reactQueryConfig';

interface MarketsOverviewData {
  totalCumulativeVolumeUsd: BigDecimal;
  totalDailyVolumeUsd: BigDecimal;
  totalDailyTrades: BigDecimal;
  openInterestUsd: BigDecimal;
  hottestMarket: StaticMarketData | undefined;
}

function marketsOverviewQueryKey(
  chainEnv: ChainEnv,
  marketsUpdatedAt: number,
  marketSnapshotsUpdatedAt: number,
) {
  return createQueryKey(
    'marketsOverview',
    chainEnv,
    marketsUpdatedAt,
    marketSnapshotsUpdatedAt,
  );
}

export function useMarketsOverview() {
  const { primaryChainEnv } = useEVMContext();
  const { data: marketStats, dataUpdatedAt: marketSnapshotsUpdatedAt } =
    useAllMarketsStats();
  const { data: allMarketsStaticData, dataUpdatedAt: marketsStaticUpdatedAt } =
    useAllMarketsStaticData();
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();

  const disabled = !marketStats || !allMarketsStaticData;

  const queryFn = (): MarketsOverviewData => {
    if (disabled) {
      throw new QueryDisabledError();
    }

    let totalDailyVolumeInPrimaryQuote = BigDecimals.ZERO;
    let totalDailyTrades = BigDecimals.ZERO;
    let maxDailyVolume = BigDecimals.ZERO;
    let hottestMarket: StaticMarketData | undefined;

    Object.values(marketStats.statsByMarket).forEach(
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
        Object.values(marketStats?.statsByMarket),
        ({ openInterestQuote }) => openInterestQuote,
      ),
    ).multipliedBy(primaryQuotePriceUsd);

    // Total cumulative volume across all markets
    const totalCumulativeVolumeUsd = removeDecimals(
      marketStats.totalCumulativeVolumeInPrimaryQuote,
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
      primaryChainEnv,
      marketsStaticUpdatedAt,
      marketSnapshotsUpdatedAt,
    ),
    queryFn,
    enabled: !disabled,
    placeholderData: keepPreviousData,
    gcTime: REACT_QUERY_CONFIG.computeQueryGcTime,
    staleTime: REACT_QUERY_CONFIG.computedQueryStaleTime,
  });
}
