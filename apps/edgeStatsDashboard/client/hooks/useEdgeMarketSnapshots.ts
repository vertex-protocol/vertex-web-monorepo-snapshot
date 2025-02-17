import { BigDecimal, IndexerMarketSnapshot } from '@vertex-protocol/client';
import { useQueryEdgeMarketSnapshots } from 'client/hooks/query/useQueryEdgeMarketSnapshots';
import { cloneDeep } from 'lodash';
import { useMemo } from 'react';

interface Params {
  granularity: number;
  limit: number;
  disabled?: boolean;
}

export function useEdgeMarketSnapshots({
  granularity,
  limit,
  disabled,
}: Params) {
  const { data: edgeMarketSnapshotsData, ...rest } =
    useQueryEdgeMarketSnapshots({
      granularity,
      limit,
      disabled,
    });

  const mappedData = useMemo(() => {
    if (!edgeMarketSnapshotsData) {
      return;
    }

    const edgeAggregatedSnapshots: IndexerMarketSnapshot[] = [];

    // Edge market snapshots are objects keyed by chain id, so we begin by just
    // iterating over the object values (the actual snapshots).
    Object.values(edgeMarketSnapshotsData).forEach((snapshots) => {
      snapshots.forEach((snapshot, index) => {
        // If actual snapshot undefined skip it.
        // There should always be at least one snapshot that is defined between chainEnv snapshots at specific index.
        if (!snapshot) {
          return;
        }

        const aggregatedSnapshot = edgeAggregatedSnapshots[index];

        // If this snapshot doesn't exist yet in our aggregated collection,
        // simply add it and move on to the next.
        if (!aggregatedSnapshot) {
          edgeAggregatedSnapshots[index] = cloneDeep(snapshot);

          return;
        }

        // Else, we need to aggregate. Each snapshot is an object keyed by snapshot
        // type (e.g. `openInterestsQuote`) with values of either type `BigDecimal`
        // or `Record<number, BigDecimal>`. So we build the snapshot with an object
        // literal, aggregating the values accordingly depending on their type.
        // Only exception is the timestamp, which we just set directly.
        edgeAggregatedSnapshots[index] = {
          timestamp: snapshot.timestamp,
          cumulativeUsers: aggregatedSnapshot.cumulativeUsers.plus(
            snapshot.cumulativeUsers,
          ),
          dailyActiveUsers: aggregatedSnapshot.dailyActiveUsers.plus(
            snapshot.dailyActiveUsers,
          ),
          tvl: aggregatedSnapshot.tvl.plus(snapshot.tvl),
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
          oraclePrices: {
            ...aggregatedSnapshot.oraclePrices,
            ...snapshot.oraclePrices,
          },
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
          // Funding rates are the same across perp products.
          fundingRates: snapshot.fundingRates,
          // Deposit rates have unique productIds per chain with exception of quote product (productId = 0) we should not rely on.
          depositRates: {
            ...aggregatedSnapshot.depositRates,
            ...snapshot.depositRates,
          },
          // Deposit rates have unique productIds per chain with exception of quote product (productId = 0) we should not rely on.
          borrowRates: {
            ...aggregatedSnapshot.borrowRates,
            ...snapshot.borrowRates,
          },
        };
      });
    });

    return {
      ...edgeMarketSnapshotsData,
      edge: edgeAggregatedSnapshots,
    };
  }, [edgeMarketSnapshotsData]);

  return {
    data: mappedData,
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
