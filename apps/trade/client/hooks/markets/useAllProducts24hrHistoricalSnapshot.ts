import { TimeInSeconds } from '@vertex-protocol/utils';
import { useAllProductsHistoricalSnapshots } from 'client/hooks/query/markets/useAllProductsHistoricalSnapshots';

/**
 * Util fn for retrieving product snapshots 24hr into the past
 * This is useful for standardizing cached data for queries
 */
export function useAllProducts24hrHistoricalSnapshot() {
  const res = useAllProductsHistoricalSnapshots([TimeInSeconds.DAY]);

  return { ...res, data: res.data?.[0] };
}
