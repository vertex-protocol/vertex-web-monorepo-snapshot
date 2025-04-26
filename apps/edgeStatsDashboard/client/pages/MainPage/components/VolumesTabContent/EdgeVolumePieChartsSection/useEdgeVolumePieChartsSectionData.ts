import { useQueryAllEdgeMarkets } from 'client/hooks/query/useQueryAllEdgeMarkets';
import { useEdgeMarketSnapshotsAtHistoricalTimes } from 'client/hooks/useEdgeMarketSnapshotsAtHistoricalTimes';
import { usePrimaryQuotePriceUsd } from 'client/hooks/usePrimaryQuotePriceUsd';
import { getDecimalAdjustedDeltasUsdByProductId } from 'client/utils/getDecimalAdjustedDeltasUsdByProductId';
import { calcDecimalAdjustedUsdValue } from 'client/utils/calcDecimalAdjustedUsdValue';
import { calcTotalDecimalAdjustedDeltasUsd } from 'client/utils/calcTotalDecimalAdjustedDeltasUsd';
import { mapValues } from 'lodash';
import { useMemo } from 'react';
import { calcTotalDecimalAdjustedValueUsd } from 'client/utils/calcTotalDecimalAdjustedValueUsd';
import { createPieChartDataForProducts } from 'client/utils/createPieChartDataForProducts';
import { getVolumesInPrimaryQuoteByProductId } from 'client/utils/getVolumesInPrimaryQuoteByProductId';

export function useEdgeVolumePieChartsSectionData() {
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
    const edgeMarketSnapshotAt24h =
      marketSnapshotsAtHistoricalTimesData['24h'].edge;
    const edgeMarketSnapshotAt7d =
      marketSnapshotsAtHistoricalTimesData['7d'].edge;
    const edgeMarketSnapshotAt30d =
      marketSnapshotsAtHistoricalTimesData['30d'].edge;

    const cumulativeVolumesAtNowInPrimaryQuote =
      getVolumesInPrimaryQuoteByProductId(
        edgeMarketSnapshotAtNow?.cumulativeVolumes,
        allEdgeMarketsData,
      );

    const cumulativeVolumesAt24hInPrimaryQuote =
      getVolumesInPrimaryQuoteByProductId(
        edgeMarketSnapshotAt24h?.cumulativeVolumes,
        allEdgeMarketsData,
      );

    const cumulativeVolumesAt7dInPrimaryQuote =
      getVolumesInPrimaryQuoteByProductId(
        edgeMarketSnapshotAt7d?.cumulativeVolumes,
        allEdgeMarketsData,
      );

    const cumulativeVolumesAt30dInPrimaryQuote =
      getVolumesInPrimaryQuoteByProductId(
        edgeMarketSnapshotAt30d?.cumulativeVolumes,
        allEdgeMarketsData,
      );

    // Calculate total volumes for PieCharts
    const edgeTotalVolume24hUsd = calcTotalDecimalAdjustedDeltasUsd(
      cumulativeVolumesAtNowInPrimaryQuote,
      cumulativeVolumesAt24hInPrimaryQuote,
      primaryQuotePriceUsd,
    );

    const edgeTotalVolume7dUsd = calcTotalDecimalAdjustedDeltasUsd(
      cumulativeVolumesAtNowInPrimaryQuote,
      cumulativeVolumesAt7dInPrimaryQuote,
      primaryQuotePriceUsd,
    );
    const edgeTotalVolume30dUsd = calcTotalDecimalAdjustedDeltasUsd(
      cumulativeVolumesAtNowInPrimaryQuote,
      cumulativeVolumesAt30dInPrimaryQuote,
      primaryQuotePriceUsd,
    );
    const edgeTotalVolumeAllTimeUsd = calcTotalDecimalAdjustedValueUsd(
      cumulativeVolumesAtNowInPrimaryQuote,
      primaryQuotePriceUsd,
    );

    // Map edge volumes by market to PieCharts.
    const edgeVolumes24hByMarketUsd = createPieChartDataForProducts(
      allEdgeMarketsData,
      getDecimalAdjustedDeltasUsdByProductId(
        cumulativeVolumesAtNowInPrimaryQuote,
        cumulativeVolumesAt24hInPrimaryQuote,
        primaryQuotePriceUsd,
      ),
    );
    const edgeVolumes7dByMarketUsd = createPieChartDataForProducts(
      allEdgeMarketsData,
      getDecimalAdjustedDeltasUsdByProductId(
        cumulativeVolumesAtNowInPrimaryQuote,
        cumulativeVolumesAt7dInPrimaryQuote,
        primaryQuotePriceUsd,
      ),
    );
    const edgeVolumes30dByMarketUsd = createPieChartDataForProducts(
      allEdgeMarketsData,
      getDecimalAdjustedDeltasUsdByProductId(
        cumulativeVolumesAtNowInPrimaryQuote,
        cumulativeVolumesAt30dInPrimaryQuote,
        primaryQuotePriceUsd,
      ),
    );
    const edgeVolumesAllTimeByMarketUsd = createPieChartDataForProducts(
      allEdgeMarketsData,
      mapValues(cumulativeVolumesAtNowInPrimaryQuote, (value) =>
        calcDecimalAdjustedUsdValue(value, primaryQuotePriceUsd),
      ),
    );

    return {
      edgeTotalVolume24hUsd,
      edgeTotalVolume7dUsd,
      edgeTotalVolume30dUsd,
      edgeTotalVolumeAllTimeUsd,
      edgeVolumes24hByMarketUsd,
      edgeVolumes7dByMarketUsd,
      edgeVolumes30dByMarketUsd,
      edgeVolumesAllTimeByMarketUsd,
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
