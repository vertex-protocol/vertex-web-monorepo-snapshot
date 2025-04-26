import { TimeInSeconds } from '@vertex-protocol/utils';
import { useEdgeMarketSnapshots } from '@vertex-protocol/react-client';
import { first, last } from 'lodash';
import { useMemo } from 'react';

/**
 * Util fn for retrieving edge market snapshots in time - latest & 24h in the past
 * This is useful for standardizing cached data for queries
 */
export function useAllMarkets24hSnapshots() {
  const { data, ...rest } = useEdgeMarketSnapshots({
    granularity: TimeInSeconds.DAY,
    limit: 2,
  });

  const mappedData = useMemo(() => {
    if (!data) {
      return;
    }

    // Snapshots are in descending time, we always assume that there's a "latest" snapshot, but the earliest
    // might not exist if markets have just not been up for 24hrs. This is relevant for new chain launches
    const latest = first(data.edge);
    const historical24h = data.edge.length > 1 ? last(data.edge) : undefined;

    return {
      latest,
      historical24h,
    };
  }, [data]);

  return {
    data: mappedData,
    ...rest,
  };
}
