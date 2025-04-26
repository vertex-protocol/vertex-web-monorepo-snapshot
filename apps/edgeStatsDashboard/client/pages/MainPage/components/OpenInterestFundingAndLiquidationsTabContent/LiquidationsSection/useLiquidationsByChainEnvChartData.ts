import {
  ChainEnvWithEdge,
  useEdgeMarketSnapshots,
} from '@vertex-protocol/react-client';
import { ChainEnvBreakdownStatsChartDataItem } from 'client/components/charts/ChainEnvBreakdownStatsChart/types';
import { useChartTimeframe } from 'client/hooks/useChartTimeframe';
import { usePrimaryQuotePriceUsd } from 'client/hooks/usePrimaryQuotePriceUsd';
import { calcTotalDecimalAdjustedDeltasUsd } from 'client/utils/calcTotalDecimalAdjustedDeltasUsd';
import { calcTotalDecimalAdjustedValueUsd } from 'client/utils/calcTotalDecimalAdjustedValueUsd';
import { processIndexerMarketSnapshots } from 'client/utils/processIndexerMarketSnapshots';
import { useMemo } from 'react';

export function useLiquidationsByChainEnvChartData() {
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

    const liquidationsByTimestamp: Record<
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
          const deltaLiquidationsUsd = calcTotalDecimalAdjustedDeltasUsd(
            currentSnapshot.cumulativeLiquidationAmounts,
            earlierSnapshot.cumulativeLiquidationAmounts,
            primaryQuotePriceUsd,
          );

          liquidationsByTimestamp[currentTimestampMillis] = {
            data: {
              ...liquidationsByTimestamp[currentTimestampMillis]?.data,
              [chainEnvWithEdge]: deltaLiquidationsUsd.toNumber(),
              ...(chainEnvWithEdge === 'edge'
                ? {
                    edgeCumulative: calcTotalDecimalAdjustedValueUsd(
                      currentSnapshot.cumulativeLiquidationAmounts,
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
      liquidations: Object.values(liquidationsByTimestamp),
    };
  }, [edgeMarketSnapshotsData, primaryQuotePriceUsd]);

  return {
    data: mappedData,
    isLoading: isLoadingEdgeMarketSnapshotsData,
  };
}
