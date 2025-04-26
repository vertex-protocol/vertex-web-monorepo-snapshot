import { useQueryAllEdgeMarkets } from 'client/hooks/query/useQueryAllEdgeMarkets';
import { useMemo } from 'react';

/**
 * Returning a list of all spot assets. Also includes the primary quote & VLP products, which do not have markets
 *
 * @returns {{ data: Array|undefined, isLoading: boolean }} An object containing:
 *   - `data`: An array of products or `undefined` if the data is unavailable.
 *   - `isLoading`: A boolean indicating whether the data is still being loaded.
 */
export function useAllEdgeSpotProducts() {
  const { data: allEdgeMarketsData, isLoading } = useQueryAllEdgeMarkets();

  const data = useMemo(() => {
    if (!allEdgeMarketsData) {
      return;
    }

    return [
      ...Object.values(allEdgeMarketsData.vlpProductByChainEnv),
      ...Object.values(allEdgeMarketsData.primaryQuoteProductByChainEnv),
      ...Object.values(allEdgeMarketsData.spotMarkets),
    ];
  }, [allEdgeMarketsData]);

  return {
    data,
    isLoading,
  };
}
