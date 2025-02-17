import { nonNullFilter } from '@vertex-protocol/web-common';
import { useQueryAllEdgeMarkets } from 'client/hooks/query/useQueryAllEdgeMarkets';
import { useEdgeMarketSnapshotsAtHistoricalTimes } from 'client/hooks/useEdgeMarketSnapshotsAtHistoricalTimes';
import { usePrimaryQuotePriceUsd } from 'client/hooks/usePrimaryQuotePriceUsd';
import { calcAllProductsTotalValue } from 'client/utils/calcAllProductsTotalValue';
import { calcDecimalAdjustedUsdValue } from 'client/utils/calcDecimalAdjustedUsdValue';
import { getMarketName } from 'client/utils/getMarketName';
import { mapValues, sortBy } from 'lodash';
import { useMemo } from 'react';

export function useEdgeOpenInterestOverviewData() {
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();
  const { data: allEdgeMarketsData } = useQueryAllEdgeMarkets();

  const {
    data: marketSnapshotsAtHistoricalTimesData,
    isLoading: isLoadingMarketSnapshotsAtHistoricalTimesData,
  } = useEdgeMarketSnapshotsAtHistoricalTimes();

  const mappedData = useMemo(() => {
    if (!marketSnapshotsAtHistoricalTimesData || !allEdgeMarketsData) {
      return;
    }

    const edgeMarketSnapshotAtNow =
      marketSnapshotsAtHistoricalTimesData.now.edge;

    const openInterestsQuoteByMarketUsd = mapValues(
      edgeMarketSnapshotAtNow?.openInterestsQuote,
      (value) => calcDecimalAdjustedUsdValue(value, primaryQuotePriceUsd),
    );

    const edgeOpenInterestQuoteAtNowUsd = calcAllProductsTotalValue(
      openInterestsQuoteByMarketUsd,
    );

    const topOpenInterestsUsd = sortBy(
      Object.entries(openInterestsQuoteByMarketUsd),
      // Sort by value in descending order. (highest to lowest)
      ([, value]) => -value.toNumber(),
    )
      // Take only top 2.
      .slice(0, 2)
      // Map array of name, value. To be displayed on StatsValueWithLabel.
      .map(([productId, value]) => {
        const productIdAsNum = Number(productId);
        const market = allEdgeMarketsData.perpMarkets[productIdAsNum];

        if (!market) {
          return;
        }

        return {
          name: `${getMarketName(market)} OI`,
          value,
        };
      })
      .filter(nonNullFilter);

    return {
      topOpenInterestsUsd,
      edgeOpenInterestQuoteAtNowUsd,
    };
  }, [
    allEdgeMarketsData,
    marketSnapshotsAtHistoricalTimesData,
    primaryQuotePriceUsd,
  ]);

  return {
    data: mappedData,
    isLoading: isLoadingMarketSnapshotsAtHistoricalTimesData,
  };
}
