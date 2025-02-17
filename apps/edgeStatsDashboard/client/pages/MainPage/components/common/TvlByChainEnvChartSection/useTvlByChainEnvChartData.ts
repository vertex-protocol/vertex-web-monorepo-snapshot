import { ChainEnvBreakdownStatsChartDataItem } from 'client/components/charts/ChainEnvBreakdownStatsChart/types';
import { ChainEnvWithEdge } from 'client/hooks/types';
import { useChartTimeframe } from 'client/hooks/useChartTimeframe';
import { useEdgeMarketSnapshots } from 'client/hooks/useEdgeMarketSnapshots';
import { usePrimaryQuotePriceUsd } from 'client/hooks/usePrimaryQuotePriceUsd';
import { calcDecimalAdjustedUsdValue } from 'client/utils/calcDecimalAdjustedUsdValue';
import { useMemo } from 'react';

export function useTvlByChainEnvChartData() {
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

    const tvlUsdByTimestamp: Record<
      number,
      ChainEnvBreakdownStatsChartDataItem
    > = {};

    Object.entries(edgeMarketSnapshotsData).forEach(([chainEnv, snapshots]) => {
      const chainEnvWithEdge = chainEnv as ChainEnvWithEdge;

      snapshots.forEach((currentSnapshot) => {
        if (!currentSnapshot) {
          return;
        }

        const currentTimestampMillis = currentSnapshot.timestamp
          .times(1000)
          .toNumber();

        const earlierTimestampMillis = currentSnapshot.timestamp
          .minus(granularity)
          .times(1000)
          .toNumber();

        const tvlUsd = calcDecimalAdjustedUsdValue(
          currentSnapshot.tvl,
          primaryQuotePriceUsd,
        );

        tvlUsdByTimestamp[currentTimestampMillis] = {
          data: {
            ...tvlUsdByTimestamp[currentTimestampMillis]?.data,
            [chainEnvWithEdge]: tvlUsd.toNumber(),
          },
          currentTimestampMillis,
          earlierTimestampMillis,
        };
      });
    });

    return {
      tvlUsd: Object.values(tvlUsdByTimestamp),
    };
  }, [edgeMarketSnapshotsData, granularity, primaryQuotePriceUsd]);

  return {
    data: mappedData,
    isLoading: isLoadingEdgeMarketSnapshotsData,
  };
}
