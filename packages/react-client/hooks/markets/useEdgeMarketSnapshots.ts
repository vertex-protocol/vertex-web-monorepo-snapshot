import { BigDecimal, IndexerMarketSnapshot } from '@vertex-protocol/client';
import { cloneDeep } from 'lodash';
import { useQueryEdgeMarketSnapshots } from '../query';
import { useEVMContext } from '../../context';
import { createQueryKey, QueryDisabledError } from '../../utils';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { REACT_QUERY_CONFIG } from '../../consts';

interface Params {
  granularity: number;
  limit: number;
  disabled?: boolean;
  maxTimeInclusive?: number;
}

function edgeMarketSnapshotsQueryKey(
  queryEdgeMarketSnapshotsDataUpdatedAt: number,
  granularity?: number,
  limit?: number,
  maxTimeInclusive?: number,
) {
  return createQueryKey(
    'edgeMarketSnapshots',
    queryEdgeMarketSnapshotsDataUpdatedAt,
    granularity,
    limit,
    maxTimeInclusive,
  );
}

export function useEdgeMarketSnapshots({
  granularity,
  limit,
  disabled: isQueryDisabled,
  maxTimeInclusive,
}: Params) {
  const { primaryChainEnv } = useEVMContext();
  const {
    data: queryEdgeMarketSnapshotsData,
    dataUpdatedAt: queryEdgeMarketSnapshotsDataUpdatedAt,
    isLoading: isLoadingQueryEdgeMarketSnapshotsData,
  } = useQueryEdgeMarketSnapshots({
    granularity,
    limit,
    maxTimeInclusive,
    disabled: isQueryDisabled,
  });

  const disabled = !queryEdgeMarketSnapshotsData;

  const { data: edgeMarketSnapshotsData } = useQuery({
    queryKey: edgeMarketSnapshotsQueryKey(
      queryEdgeMarketSnapshotsDataUpdatedAt,
      granularity,
      limit,
      maxTimeInclusive,
    ),
    queryFn: () => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      const edgeAggregatedSnapshots: IndexerMarketSnapshot[] = [];

      // Edge market snapshots are objects keyed by chain id, so we begin by just
      // iterating over the object values (the actual snapshots).
      Object.entries(queryEdgeMarketSnapshotsData).forEach(
        ([chainEnv, snapshots]) => {
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

            const isPrimaryChainEnv = primaryChainEnv === chainEnv;

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
              // Use funding rates from the primary chain.
              // These rates are derived from the index price and may differ across chains.
              // For ex. If a new chain is introduced, all products funding rates could be 0.
              fundingRates: isPrimaryChainEnv
                ? snapshot.fundingRates
                : aggregatedSnapshot.fundingRates,
              // Deposit rates have unique productIds per chain, so we can merge them.
              // However, every chain has (productId = 0), so its value would be overwritten and should not be relied upon.
              depositRates: {
                ...aggregatedSnapshot.depositRates,
                ...snapshot.depositRates,
              },
              // Borrow rates have unique productIds per chain, so we can merge them.
              // However, every chain has (productId = 0), so its value would be overwritten and should not be relied upon.
              borrowRates: {
                ...aggregatedSnapshot.borrowRates,
                ...snapshot.borrowRates,
              },
            };
          });
        },
      );

      return {
        ...queryEdgeMarketSnapshotsData,
        edge: edgeAggregatedSnapshots,
      };
    },
    // Prevents a "flash" in UI when query key changes, which occurs when query edge market snapshots data updates
    placeholderData: keepPreviousData,
    enabled: !disabled,
    gcTime: REACT_QUERY_CONFIG.computeQueryGcTime,
    staleTime: REACT_QUERY_CONFIG.computedQueryStaleTime,
  });

  return {
    data: edgeMarketSnapshotsData,
    dataUpdatedAt: queryEdgeMarketSnapshotsDataUpdatedAt,
    isLoading: isLoadingQueryEdgeMarketSnapshotsData,
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
