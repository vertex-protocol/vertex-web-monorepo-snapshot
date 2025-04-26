import {
  ChainEnvWithEdge,
  useEdgeMarketSnapshots,
} from '@vertex-protocol/react-client';
import { ChainEnvBreakdownStatsChartDataItem } from 'client/components/charts/ChainEnvBreakdownStatsChart/types';
import { useQueryAllEdgeMarkets } from 'client/hooks/query/useQueryAllEdgeMarkets';
import { useChartTimeframe } from 'client/hooks/useChartTimeframe';
import { usePrimaryQuotePriceUsd } from 'client/hooks/usePrimaryQuotePriceUsd';
import { calcTotalDecimalAdjustedDeltasUsd } from 'client/utils/calcTotalDecimalAdjustedDeltasUsd';
import { calcTotalDecimalAdjustedValueUsd } from 'client/utils/calcTotalDecimalAdjustedValueUsd';
import { getVolumesInPrimaryQuoteByProductId } from 'client/utils/getVolumesInPrimaryQuoteByProductId';
import { processIndexerMarketSnapshots } from 'client/utils/processIndexerMarketSnapshots';
import { useMemo } from 'react';

export function useVolumeByChainEnvChartData() {
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
    if (!edgeMarketSnapshotsData) {
      return;
    }

    const volumesUsdByTimestamp: Record<
      number,
      ChainEnvBreakdownStatsChartDataItem
    > = {};

    Object.entries(edgeMarketSnapshotsData).forEach(([chainEnv, snapshots]) => {
      const chainEnvWithEdge = chainEnv as ChainEnvWithEdge;

      processIndexerMarketSnapshots(
        snapshots,
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

          // Delta value usd (daily / monthly)
          const deltaUsd = calcTotalDecimalAdjustedDeltasUsd(
            currentSnapshotCumulativeVolumesInPrimaryQuote,
            earlierSnapshotCumulativeVolumesInPrimaryQuote,
            primaryQuotePriceUsd,
          );

          volumesUsdByTimestamp[currentTimestampMillis] = {
            data: {
              ...volumesUsdByTimestamp[currentTimestampMillis]?.data,
              [chainEnvWithEdge]: deltaUsd.toNumber(),
              ...(chainEnvWithEdge === 'edge'
                ? {
                    edgeCumulative: calcTotalDecimalAdjustedValueUsd(
                      currentSnapshotCumulativeVolumesInPrimaryQuote,
                      primaryQuotePriceUsd,
                    ).toNumber(),
                  }
                : {}),
            },
            currentTimestampMillis,
            earlierTimestampMillis,
          };
        },
      );
    });

    return {
      volumesUsd: Object.values(volumesUsdByTimestamp),
    };
  }, [allEdgeMarketsData, edgeMarketSnapshotsData, primaryQuotePriceUsd]);

  return {
    data: mappedData,
    isLoading: isLoadingEdgeMarketSnapshotsData || isLoadingAllEdgeMarketsData,
  };
}
