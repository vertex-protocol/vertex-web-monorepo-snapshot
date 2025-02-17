import { TimeInSeconds } from '@vertex-protocol/utils';
import { useEdgeAggregatedMarketSnapshots } from 'client/hooks/markets/useEdgeAggregatedMarketSnapshots';
import { useMarketSnapshots } from 'client/hooks/query/markets/useMarketSnapshots';
import { first, last } from 'lodash';
import { useMemo } from 'react';

interface Params {
  /**
   * When `true`, will fetch data only for the current chain.
   */
  disableEdge?: boolean;
}

/**
 * Util fn for retrieving market snapshots at 2 instances in time - latest & 24hr in the past
 * This is useful for standardizing cached data for queries
 */
export function useAllMarkets24hrSnapshots({ disableEdge }: Params = {}) {
  const { data: snapshotsData, ...snapshotsRest } = useMarketSnapshots({
    granularity: TimeInSeconds.DAY,
    limit: 2,
    disabled: !disableEdge,
  });
  const { data: edgeSnapshotsData, ...edgeSnapshotsRest } =
    useEdgeAggregatedMarketSnapshots({
      granularity: TimeInSeconds.DAY,
      limit: 2,
      disabled: disableEdge,
    });

  const data = disableEdge ? snapshotsData : edgeSnapshotsData;
  const rest = disableEdge ? snapshotsRest : edgeSnapshotsRest;

  const mappedData = useMemo(() => {
    if (!data) {
      return;
    }

    // Snapshots are in descending time, we always assume that there's a "latest" snapshot, but the earliest
    // might not exist if markets have just not been up for 24hrs. This is relevant for new chain launches
    const latest = first(data);
    const historical24hr = data.length > 1 ? last(data) : undefined;

    return {
      latest,
      historical24hr,
    };
  }, [data]);

  return {
    data: mappedData,
    ...rest,
  };
}
