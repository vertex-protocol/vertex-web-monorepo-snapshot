import { useQueryAllEdgeMarkets } from 'client/hooks/query/useQueryAllEdgeMarkets';
import { useMemo } from 'react';

/**
 * Returning a list of all spot markets.
 * These markets contain products that are available for borrowing and depositing operations.
 *
 * @returns {{ data: Array|undefined, isLoading: boolean }} An object containing:
 *   - `data`: An array of markets or `undefined` if the data is unavailable.
 *   - `isLoading`: A boolean indicating whether the data is still being loaded.
 */
export function useAllEdgeSpotMarkets() {
  const { data: allEdgeMarketsData, isLoading } = useQueryAllEdgeMarkets();

  const data = useMemo(() => {
    if (!allEdgeMarketsData) {
      return;
    }

    return [
      ...Object.values(allEdgeMarketsData.primaryQuoteProductByChainEnv),
      ...Object.values(allEdgeMarketsData.spotMarkets),
    ];
  }, [allEdgeMarketsData]);

  return {
    data,
    isLoading,
  };
}
