import { TimeInSeconds } from '@vertex-protocol/utils';
import { useAllProductsHistoricalSnapshot } from 'client/hooks/query/markets/useAllProductsHistoricalSnapshot';

/**
 * Util fn for retrieving product snapshots 24hr into the past
 * This is useful for standardizing cached data for queries
 */
export function useAllProducts24hrHistoricalSnapshot() {
  return useAllProductsHistoricalSnapshot(TimeInSeconds.DAY);
}
