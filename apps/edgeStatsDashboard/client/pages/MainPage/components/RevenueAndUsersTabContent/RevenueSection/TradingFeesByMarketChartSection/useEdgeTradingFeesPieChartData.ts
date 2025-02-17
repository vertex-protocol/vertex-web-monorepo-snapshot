import { useQueryAllEdgeMarkets } from 'client/hooks/query/useQueryAllEdgeMarkets';
import { useEdgeMarketSnapshotsAtHistoricalTimes } from 'client/hooks/useEdgeMarketSnapshotsAtHistoricalTimes';
import { usePrimaryQuotePriceUsd } from 'client/hooks/usePrimaryQuotePriceUsd';
import { calcDecimalAdjustedUsdValue } from 'client/utils/calcDecimalAdjustedUsdValue';
import { mapValues } from 'lodash';
import { useMemo } from 'react';
import { createPieChartDataForProducts } from 'client/utils/createPieChartDataForProducts';
import { getTotalTradingFeesByProductId } from 'client/pages/MainPage/components/RevenueAndUsersTabContent/utils/getTotalTradingFeesByProductId';

export function useEdgeTradingFeesPieChartData() {
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

    const edgeFeesAllTimeByMarketUsd = createPieChartDataForProducts(
      allEdgeMarketsData,
      mapValues(
        getTotalTradingFeesByProductId(edgeMarketSnapshotAtNow),
        (value) => calcDecimalAdjustedUsdValue(value, primaryQuotePriceUsd),
      ),
    );

    return {
      edgeFeesAllTimeByMarketUsd,
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
