import { useEdgeMarketSnapshots } from '@vertex-protocol/react-client';
import { StatsChartDataItem } from 'client/components/charts/StatsChart/types';
import { useQueryAllEdgeMarkets } from 'client/hooks/query/useQueryAllEdgeMarkets';
import { useChartTimeframe } from 'client/hooks/useChartTimeframe';
import { usePrimaryQuotePriceUsd } from 'client/hooks/usePrimaryQuotePriceUsd';
import { calcTotalDecimalAdjustedDeltasUsd } from 'client/utils/calcTotalDecimalAdjustedDeltasUsd';
import { calcTotalDecimalAdjustedValueUsd } from 'client/utils/calcTotalDecimalAdjustedValueUsd';
import { getVolumesInPrimaryQuoteByProductId } from 'client/utils/getVolumesInPrimaryQuoteByProductId';
import { processIndexerMarketSnapshots } from 'client/utils/processIndexerMarketSnapshots';
import { pick } from 'lodash';
import { useMemo } from 'react';

interface PerpSpotStatsChartDataItem
  extends StatsChartDataItem<'spotVolumeUsd' | 'perpVolumeUsd'> {}

interface CumulativePerpSpotStatsChartDataItem
  extends StatsChartDataItem<
    'spotVolumeUsd' | 'perpVolumeUsd' | 'totalVolumeUsd'
  > {}

export function useEdgeSpotPerpVolumeChartsSectionData() {
  const { data: allEdgeMarketsData, isLoading: isLoadingAllEdgeMarketsData } =
    useQueryAllEdgeMarkets();
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();
  const { granularity, queryLimit } = useChartTimeframe();

  const {
    data: edgeMarketSnapshotsData,
    isLoading: isLoadingEdgeMarketSnapshotsData,
  } = useEdgeMarketSnapshots({
    granularity,
    limit: queryLimit,
  });

  const mappedData = useMemo(() => {
    if (!edgeMarketSnapshotsData || !allEdgeMarketsData) {
      return;
    }

    const perpSpotVolumesUsd: PerpSpotStatsChartDataItem[] = [];
    const cumulativePerpSpotVolumesUsd: CumulativePerpSpotStatsChartDataItem[] =
      [];

    processIndexerMarketSnapshots(
      edgeMarketSnapshotsData.edge,
      (
        currentSnapshot,
        earlierSnapshot,
        currentTimestampMillis,
        earlierTimestampMillis,
      ) => {
        const earlierSnapshotCumulativeVolumesInPrimaryQuote =
          getVolumesInPrimaryQuoteByProductId(
            earlierSnapshot.cumulativeVolumes,
            allEdgeMarketsData,
          );

        const currentSnapshotCumulativeVolumesInPrimaryQuote =
          getVolumesInPrimaryQuoteByProductId(
            currentSnapshot.cumulativeVolumes,
            allEdgeMarketsData,
          );

        const earlierSpotCumulativeVolumes = pick(
          earlierSnapshotCumulativeVolumesInPrimaryQuote,
          allEdgeMarketsData.spotMarketsProductIds,
        );
        const earlierPerpCumulativeVolumes = pick(
          earlierSnapshotCumulativeVolumesInPrimaryQuote,
          allEdgeMarketsData.perpMarketsProductIds,
        );

        const currentSpotCumulativeVolumes = pick(
          currentSnapshotCumulativeVolumesInPrimaryQuote,
          allEdgeMarketsData.spotMarketsProductIds,
        );

        const currentPerpCumulativeVolumes = pick(
          currentSnapshotCumulativeVolumesInPrimaryQuote,
          allEdgeMarketsData.perpMarketsProductIds,
        );

        const spotDeltaUsd = calcTotalDecimalAdjustedDeltasUsd(
          currentSpotCumulativeVolumes,
          earlierSpotCumulativeVolumes,
          primaryQuotePriceUsd,
        );

        const perpDeltaUsd = calcTotalDecimalAdjustedDeltasUsd(
          currentPerpCumulativeVolumes,
          earlierPerpCumulativeVolumes,
          primaryQuotePriceUsd,
        );

        perpSpotVolumesUsd.push({
          data: {
            spotVolumeUsd: spotDeltaUsd.toNumber(),
            perpVolumeUsd: perpDeltaUsd.toNumber(),
          },
          currentTimestampMillis,
          earlierTimestampMillis,
        });

        const currentCumulativeSpotVolumeUsd = calcTotalDecimalAdjustedValueUsd(
          currentSpotCumulativeVolumes,
          primaryQuotePriceUsd,
        );

        const currentCumulativePerpVolumeUsd = calcTotalDecimalAdjustedValueUsd(
          currentPerpCumulativeVolumes,
          primaryQuotePriceUsd,
        );

        const cumulativeTotalVolumeUsd = currentCumulativePerpVolumeUsd.plus(
          currentCumulativeSpotVolumeUsd,
        );

        cumulativePerpSpotVolumesUsd.push({
          data: {
            spotVolumeUsd: currentCumulativeSpotVolumeUsd.toNumber(),
            perpVolumeUsd: currentCumulativePerpVolumeUsd.toNumber(),
            totalVolumeUsd: cumulativeTotalVolumeUsd.toNumber(),
          },
          currentTimestampMillis,
          earlierTimestampMillis,
        });
      },
    );

    return {
      perpSpotVolumesUsd,
      cumulativePerpSpotVolumesUsd,
    };
  }, [allEdgeMarketsData, edgeMarketSnapshotsData, primaryQuotePriceUsd]);

  return {
    data: mappedData,
    isLoading: isLoadingEdgeMarketSnapshotsData || isLoadingAllEdgeMarketsData,
  };
}
