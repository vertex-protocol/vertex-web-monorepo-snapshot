import { useQueryAllEdgeMarkets } from 'client/hooks/query/useQueryAllEdgeMarkets';
import { useEdgeMarketSnapshotsAtHistoricalTimes } from 'client/hooks/useEdgeMarketSnapshotsAtHistoricalTimes';
import { usePrimaryQuotePriceUsd } from 'client/hooks/usePrimaryQuotePriceUsd';
import { calcDecimalAdjustedUsdValue } from 'client/utils/calcDecimalAdjustedUsdValue';
import { createPieChartDataForProducts } from 'client/utils/createPieChartDataForProducts';
import { mapValues } from 'lodash';
import { useMemo } from 'react';

export function useEdgeOpenInterestPieChartData() {
  const { data: allEdgeMarketsData, isLoading: isLoadingAllEngineMarketsData } =
    useQueryAllEdgeMarkets();
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();

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

    const edgeOpenInterestsAtNowByMarketUsd = createPieChartDataForProducts(
      allEdgeMarketsData,
      mapValues(edgeMarketSnapshotAtNow?.openInterestsQuote, (value) =>
        calcDecimalAdjustedUsdValue(value, primaryQuotePriceUsd),
      ),
    );

    return {
      edgeOpenInterestsAtNowByMarketUsd,
    };
  }, [
    allEdgeMarketsData,
    marketSnapshotsAtHistoricalTimesData,
    primaryQuotePriceUsd,
  ]);

  return {
    data: mappedData,
    isLoading:
      isLoadingMarketSnapshotsAtHistoricalTimesData ||
      isLoadingAllEngineMarketsData,
  };
}
