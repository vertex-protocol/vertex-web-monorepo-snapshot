import {
  getMarketPriceFormatSpecifier,
  useVertexMetadataContext,
} from '@vertex-protocol/react-client';
import { useAllMarketsStats } from 'client/hooks/markets/useAllMarketsStats';
import { useAllMarkets } from 'client/hooks/query/markets/allMarkets/useAllMarkets';
import { useAllMarketsLatestPrices } from 'client/hooks/query/markets/useAllMarketsLatestPrices';
import { sortAndTrim } from 'client/pages/Markets/utils/sortAndTrim';
import { getSharedProductMetadata } from 'client/utils/getSharedProductMetadata';
import { useMemo } from 'react';

export function useMarketsRecentlyAdded() {
  const { getIsHiddenMarket } = useVertexMetadataContext();
  const { data: allMarketsData, isLoading: isLoadingAllMarkets } =
    useAllMarkets();
  const { data: marketStats, isLoading: isLoadingMarketStats } =
    useAllMarketsStats();
  const { data: latestPriceData, isLoading: isLoadingLatestPriceData } =
    useAllMarketsLatestPrices();

  const recentlyAddedMarkets = useMemo(() => {
    if (!marketStats?.statsByMarket || !latestPriceData || !allMarketsData) {
      return;
    }

    // Product IDs are sequential, so we just need to get the highest product IDs, this is done automatically by `sortAndTrim`
    // as it defaults to sorting by `productId` in descending order
    const mappedMarkets = Object.values(allMarketsData.allMarkets)
      .filter((market) => !getIsHiddenMarket(market.productId))
      .map((market) => {
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
      });

    return sortAndTrim(mappedMarkets, 'productId');
  }, [
    marketStats?.statsByMarket,
    latestPriceData,
    allMarketsData,
    getIsHiddenMarket,
  ]);

  return {
    recentlyAddedMarkets,
    isLoading:
      isLoadingAllMarkets || isLoadingMarketStats || isLoadingLatestPriceData,
  };
}
