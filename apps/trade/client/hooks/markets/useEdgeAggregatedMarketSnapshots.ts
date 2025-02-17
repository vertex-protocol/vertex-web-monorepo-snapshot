import { BigDecimal, IndexerMarketSnapshot } from '@vertex-protocol/client';
import { useEdgeMarketSnapshots } from 'client/hooks/query/markets/useEdgeMarketSnapshots';
import { cloneDeep } from 'lodash';
import { useMemo } from 'react';

interface Params {
  granularity: number;
  limit: number;
  disabled?: boolean;
  /** The max timestamp to be queried. This needs to be a stable value to avoid re-fetching on every re-render. If not provided it defaults to now. */
  maxTimeInclusive?: number;
}

type EdgeAggregatedMarketSnapshot = Omit<
  IndexerMarketSnapshot,
  'borrowRates' | 'depositRates' | 'fundingRates'
>;

/**
 * Returns cross-chain aggregated market snapshots.
 */
export function useEdgeAggregatedMarketSnapshots({
  maxTimeInclusive,
  limit,
  granularity,
  disabled,
}: Params) {
  const { data: edgeMarketSnapshotsData, ...rest } = useEdgeMarketSnapshots({
    maxTimeInclusive,
    limit,
    granularity,
    disabled,
  });

  const aggregatedMarketSnapshots = useMemo(() => {
    if (!edgeMarketSnapshotsData) {
      return;
    }
    const aggregatedSnapshots: EdgeAggregatedMarketSnapshot[] = [];

    // Edge market snapshots are objects keyed by chain id, so we begin by just
    // iterating over the object values (the actual snapshots).
    Object.values(edgeMarketSnapshotsData).forEach((snapshots) => {
      snapshots.forEach((snapshot, index) => {
        const aggregatedSnapshot = aggregatedSnapshots[index];

        // If this snapshot doesn't exist yet in our aggregated collection,
        // simply add it and move on to the next.
        if (!aggregatedSnapshot) {
          aggregatedSnapshots[index] = cloneDeep(snapshot);

          return;
        }

        // Else, we need to aggregate. Each snapshot is an object keyed by snapshot
        // type (e.g. `openInterestsQuote`) with values of either type `BigDecimal`
        // or `Record<number, BigDecimal>`. So we build the snapshot with an object
        // literal, aggregating the values accordingly depending on their type.
        // Only exception is the timestamp, which we just set directly.
        aggregatedSnapshots[index] = {
          timestamp: snapshot.timestamp,
          cumulativeUsers: aggregatedSnapshot.cumulativeUsers.plus(
            snapshot.cumulativeUsers,
          ),
          dailyActiveUsers: aggregatedSnapshot.dailyActiveUsers.plus(
            snapshot.dailyActiveUsers,
          ),
          tvl: aggregatedSnapshot.tvl.plus(snapshot.tvl),
          oraclePrices: {
            ...aggregatedSnapshot.oraclePrices,
            ...snapshot.oraclePrices,
          },
          cumulativeLiquidationAmounts: aggregateRecordData(
            aggregatedSnapshot.cumulativeLiquidationAmounts,
            snapshot.cumulativeLiquidationAmounts,
          ),
          cumulativeMakerFees: aggregateRecordData(
            aggregatedSnapshot.cumulativeMakerFees,
            snapshot.cumulativeMakerFees,
          ),
          cumulativeSequencerFees: aggregateRecordData(
            aggregatedSnapshot.cumulativeSequencerFees,
            snapshot.cumulativeSequencerFees,
          ),
          cumulativeTakerFees: aggregateRecordData(
            aggregatedSnapshot.cumulativeTakerFees,
            snapshot.cumulativeTakerFees,
          ),
          cumulativeTrades: aggregateRecordData(
            aggregatedSnapshot.cumulativeTrades,
            snapshot.cumulativeTrades,
          ),
          cumulativeVolumes: aggregateRecordData(
            aggregatedSnapshot.cumulativeVolumes,
            snapshot.cumulativeVolumes,
          ),
          openInterestsQuote: aggregateRecordData(
            aggregatedSnapshot.openInterestsQuote,
            snapshot.openInterestsQuote,
          ),
          totalBorrows: aggregateRecordData(
            aggregatedSnapshot.totalBorrows,
            snapshot.totalBorrows,
          ),
          totalDeposits: aggregateRecordData(
            aggregatedSnapshot.totalDeposits,
            snapshot.totalDeposits,
          ),
          cumulativeTradeSizes: aggregateRecordData(
            aggregatedSnapshot.cumulativeTradeSizes,
            snapshot.cumulativeTradeSizes,
          ),
          cumulativeInflows: aggregateRecordData(
            aggregatedSnapshot.cumulativeInflows,
            snapshot.cumulativeInflows,
          ),
          cumulativeOutflows: aggregateRecordData(
            aggregatedSnapshot.cumulativeOutflows,
            snapshot.cumulativeOutflows,
          ),
        };
      });
    });

    return aggregatedSnapshots;
  }, [edgeMarketSnapshotsData]);

  return {
    data: aggregatedMarketSnapshots,
    ...rest,
  };
}

function aggregateRecordData(
  existingData: Record<number, BigDecimal>,
  newData: Record<number, BigDecimal>,
) {
  const aggregatedData = { ...existingData };

  Object.entries(newData).forEach(([productId, newValue]) => {
    const productIdAsNum = Number(productId);

    if (productIdAsNum in aggregatedData) {
      aggregatedData[productIdAsNum] =
        aggregatedData[productIdAsNum].plus(newValue);
    } else {
      aggregatedData[productIdAsNum] = newValue;
    }
  });

  return aggregatedData;
}
