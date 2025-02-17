import { useQuery } from '@tanstack/react-query';
import {
  BigDecimal,
  IndexerMarketSnapshot,
  nowInSeconds,
} from '@vertex-protocol/client';
import {
  createQueryKey,
  getPrimaryChain,
  QueryDisabledError,
  useVertexClientContext,
} from '@vertex-protocol/react-client';
import { ChainEnvWithEdge } from 'client/hooks/types';
import { getRecordKeyedByChainEnvWithEdge } from 'client/hooks/utils';
import { get, mapValues } from 'lodash';

interface Params {
  granularity: number;
  limit: number;
  disabled?: boolean;
}

function edgeMarketSnapshotsQueryKey(granularity?: number, limit?: number) {
  return createQueryKey('edgeMarketSnapshots', granularity, limit);
}

type EdgeMarketSnapshotsData = Record<
  ChainEnvWithEdge,
  // Note the | undefined here - an entry is `undefined` if there is no data at the timestamp
  (IndexerMarketSnapshot | undefined)[]
>;

/**
 * Fetches edge market snapshots across multiple chain environments.
 * Query uses batching when provided limit is > 20.
 */
export function useQueryEdgeMarketSnapshots({
  granularity,
  limit,
  disabled: disabledOverride,
}: Params) {
  const { vertexClientsByChainEnv, primaryChainVertexClient } =
    useVertexClientContext();

  const disabled =
    !primaryChainVertexClient || disabledOverride || !vertexClientsByChainEnv;

  return useQuery({
    queryKey: edgeMarketSnapshotsQueryKey(granularity, limit),
    queryFn: async (): Promise<EdgeMarketSnapshotsData> => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      let maxTimeInclusive = nowInSeconds();
      const batchLimit = 40;
      let remainingLimit = limit;
      let marketSnapshotsByChainEnv: EdgeMarketSnapshotsData =
        getRecordKeyedByChainEnvWithEdge([]);

      // Fetch data in batches until the limit is reached or no more data.
      while (remainingLimit > 0) {
        const edgeMarketSnapshotsResponse =
          await primaryChainVertexClient.client.market.getEdgeMarketSnapshots({
            granularity,
            limit: Math.min(batchLimit, remainingLimit),
            maxTimeInclusive,
          });

        // Oldest timestamp for query continuation.
        let oldestTimestamp: BigDecimal | undefined;
        // Longest / oldest market snapshots.
        let longestMarketSnapshots: IndexerMarketSnapshot[] | undefined;

        // Find the oldest snapshots and oldest timestamp.
        Object.values(edgeMarketSnapshotsResponse).forEach((snapshots) => {
          snapshots.forEach((snapshot) => {
            if (!oldestTimestamp || snapshot.timestamp.lt(oldestTimestamp)) {
              oldestTimestamp = snapshot.timestamp;
              longestMarketSnapshots = snapshots;
            }
          });
        });

        let batchMarketSnapshotsByChainEnv: EdgeMarketSnapshotsData =
          getRecordKeyedByChainEnvWithEdge([]);

        // Align snapshots across chains to oldest market snapshots.
        longestMarketSnapshots?.forEach(
          ({ timestamp: standardizedTimestamp }, index) => {
            Object.values(vertexClientsByChainEnv).forEach(({ chainEnv }) => {
              const chainId = getPrimaryChain(chainEnv).id;

              const marketSnapshot = get(
                edgeMarketSnapshotsResponse[chainId],
                index,
                undefined,
              );

              // Add snapshot for the current chain environment.
              // If we have no data at specific index it should be undefined.
              batchMarketSnapshotsByChainEnv[chainEnv][index] = createSnapshot(
                marketSnapshot,
                // Align timestamps between each chain envs to be the same.
                standardizedTimestamp,
              );
            });
          },
        );

        // Combine existing and new market snapshots for all chain environments
        marketSnapshotsByChainEnv = mapValues(
          batchMarketSnapshotsByChainEnv,
          (snapshots, chainEnv) => [
            ...marketSnapshotsByChainEnv[chainEnv as ChainEnvWithEdge],
            ...snapshots,
          ],
        );

        // If no timestamp is available, exit the loop.
        if (!oldestTimestamp) {
          break;
        }

        // Update remaining limit and max time for the next batch.
        remainingLimit -= batchLimit;
        // Remove granularity from timestamp so new batches don't start at exact same timestamp.
        maxTimeInclusive = oldestTimestamp.minus(granularity).toNumber();
      }

      return marketSnapshotsByChainEnv;
    },
    enabled: !disabled,
  });
}

function createSnapshot(
  snapshot: IndexerMarketSnapshot | undefined,
  timestamp: BigDecimal,
) {
  return snapshot ? { ...snapshot, timestamp } : undefined;
}
