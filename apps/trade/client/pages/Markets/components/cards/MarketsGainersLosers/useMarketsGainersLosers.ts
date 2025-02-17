import { useVertexMetadataContext } from '@vertex-protocol/react-client';
import { useAllMarketsStats } from 'client/hooks/markets/useAllMarketsStats';
import { useAllMarkets } from 'client/hooks/query/markets/allMarkets/useAllMarkets';
import { sortAndTrim } from 'client/pages/Markets/utils/sortAndTrim';
import { getSharedProductMetadata } from 'client/utils/getSharedProductMetadata';
import { useMemo } from 'react';

/**
 * The top 3 gainers / 3 losers based on past day's change in descending order
 */
export function useMarketsGainersLosers() {
  const { data: allMarkets, isLoading: isLoadingAllMarkets } = useAllMarkets();
  const { data: marketStats, isLoading: isLoadingMarketStats } =
    useAllMarketsStats();
  const { getIsHiddenMarket } = useVertexMetadataContext();

  const gainersAndLosers = useMemo(() => {
    if (!allMarkets?.allMarkets || !marketStats?.statsByMarket) {
      return {};
    }

    const mappedMarkets = Object.values(allMarkets.allMarkets)
      .filter(
        (market) =>
          !getIsHiddenMarket(market.productId) &&
          marketStats.statsByMarket[market.productId],
      )
      .map((market) => {
        const productId = market.productId;

        return {
          metadata: getSharedProductMetadata(market.metadata),
          productId,
          pastDayPriceChangeFrac:
            marketStats.statsByMarket[productId].pastDayPriceChangeFrac,
        };
      });

    return {
      gainers: sortAndTrim(mappedMarkets, 'pastDayPriceChangeFrac', {
        limit: 3,
      }),
      losers: sortAndTrim(mappedMarkets, 'pastDayPriceChangeFrac', {
        isAscending: true,
        limit: 3,
      }),
    };
  }, [getIsHiddenMarket, marketStats?.statsByMarket, allMarkets?.allMarkets]);

  return {
    ...gainersAndLosers,
    isLoading: isLoadingAllMarkets || isLoadingMarketStats,
  };
}
