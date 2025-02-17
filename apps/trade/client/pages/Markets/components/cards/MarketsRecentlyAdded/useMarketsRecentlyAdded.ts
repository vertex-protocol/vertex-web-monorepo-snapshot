import { useVertexMetadataContext } from '@vertex-protocol/react-client';
import { getMarketPriceFormatSpecifier } from '@vertex-protocol/react-client';
import { useAllMarketsStats } from 'client/hooks/markets/useAllMarketsStats';
import { useAllMarkets } from 'client/hooks/query/markets/allMarkets/useAllMarkets';
import { useAllMarketsLatestPrices } from 'client/hooks/query/markets/useAllMarketsLatestPrices';
import { sortAndTrim } from 'client/pages/Markets/utils/sortAndTrim';
import { getSharedProductMetadata } from 'client/utils/getSharedProductMetadata';
import { useMemo } from 'react';

export function useMarketsRecentlyAdded() {
  const { data: allMarkets, isLoading: isLoadingAllMarkets } = useAllMarkets();
  const { data: marketStats, isLoading: isLoadingMarketStats } =
    useAllMarketsStats();
  const { data: latestPriceData, isLoading: isLoadingLatestPriceData } =
    useAllMarketsLatestPrices();
  const { getIsNewMarket } = useVertexMetadataContext();

  const recentlyAddedMarkets = useMemo(() => {
    if (
      !marketStats?.statsByMarket ||
      !latestPriceData ||
      !allMarkets?.perpMarkets
    ) {
      return;
    }

    const perpMarkets = Object.values(allMarkets.perpMarkets);

    // Store any designated new market
    const newMarkets = Object.values(allMarkets.allMarkets).filter((market) =>
      getIsNewMarket(market.productId),
    );

    // Populate with recently added perp markets based on their productId
    // We are focussing on perp markets only since they are shared across all chains whereas spot markets are not
    const recentPerpMarkets = perpMarkets
      .slice(-6)
      // Remove any new markets from the recently added perp markets
      .filter((market) => !newMarkets.includes(market));

    const mappedMarkets = [...newMarkets, ...recentPerpMarkets].map(
      (market) => {
        return {
          metadata: getSharedProductMetadata(market.metadata),
          marketPrice: latestPriceData[market.productId]?.safeAverage,
          priceFormatSpecifier: getMarketPriceFormatSpecifier(
            market.priceIncrement,
          ),
          marketPriceChangeFrac:
            marketStats.statsByMarket[market.productId]?.pastDayPriceChangeFrac,
          productId: market.productId,
        };
      },
    );

    return sortAndTrim(mappedMarkets, 'productId');
  }, [
    getIsNewMarket,
    latestPriceData,
    marketStats?.statsByMarket,
    allMarkets?.allMarkets,
    allMarkets?.perpMarkets,
  ]);

  return {
    recentlyAddedMarkets,
    isLoading:
      isLoadingAllMarkets || isLoadingMarketStats || isLoadingLatestPriceData,
  };
}
