import { TimeInSeconds } from '@vertex-protocol/utils';
import { useMarketSnapshots } from 'client/hooks/query/markets/useMarketSnapshots';
import { first, last } from 'lodash';
import { useMemo } from 'react';

/**
 * Util fn for retrieving market snapshots at 2 instances in time - latest & 24hr in the past
 * This is useful for standardizing cached data for queries
 */
export function useAllMarkets24hrSnapshots() {
  const { data, ...rest } = useMarketSnapshots({
    granularity: TimeInSeconds.DAY,
    limit: 2,
  });

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
