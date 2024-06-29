import { useEVMContext } from '@vertex-protocol/react-client';
import { useAllMarketsHistoricalMetrics } from 'client/hooks/markets/useAllMarketsHistoricalMetrics';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { useFavoritedMarkets } from 'client/hooks/markets/useFavoritedMarkets';
import { useAllMarketsLatestPrices } from 'client/hooks/query/markets/useAllMarketsLatestPrices';
import { useProductTradingLinks } from 'client/hooks/ui/navigation/useProductTradingLinks';
import { useTextSearch } from 'client/hooks/ui/useTextSearch';
import {
  getSearchString,
  marketWatchlistItemVolumeComparator,
  toMarketWatchlistItemData,
} from 'client/modules/trading/marketWatchlist/hooks/useMarketWatchlist/utils';
import { useSavedMarketWatchlistState } from 'client/modules/trading/marketWatchlist/hooks/useSavedMarketWatchlistState';
import { get, mapValues } from 'lodash';
import { useMemo, useState } from 'react';

export function useMarketWatchlist(productId: number | undefined) {
  const { connectionStatus } = useEVMContext();

  const [query, setQuery] = useState('');
  const { data: allMarketsStaticData } = useAllMarketsStaticData();
  const { data: latestMarketPrices } = useAllMarketsLatestPrices();
  const { data: marketMetricsData } = useAllMarketsHistoricalMetrics();
  const {
    favoritedMarketIds,
    toggleIsFavoritedMarket,
    didLoadPersistedValue: didLoadFavoritedMarkets,
  } = useFavoritedMarkets();
  const productTradingLinks = useProductTradingLinks();

  const {
    toggleMarketWatchlistIsOpen,
    marketWatchlistState,
    setMarketWatchlistTabId,
    didLoadPersistedValue: didLoadWatchlistState,
  } = useSavedMarketWatchlistState();

  const allMarketWatchlistItemsByProductId = useMemo(() => {
    if (!allMarketsStaticData) {
      return;
    }

    return mapValues(allMarketsStaticData.all, (marketStaticData) => {
      return toMarketWatchlistItemData(
        marketStaticData,
        latestMarketPrices,
        marketMetricsData,
        productTradingLinks[marketStaticData.productId]?.link ?? '',
        favoritedMarketIds.has(marketStaticData.productId),
      );
    });
  }, [
    allMarketsStaticData,
    latestMarketPrices,
    marketMetricsData,
    productTradingLinks,
    favoritedMarketIds,
  ]);

  const selectedMarket = useMemo(() => {
    return productId
      ? get(allMarketWatchlistItemsByProductId, productId)
      : undefined;
  }, [allMarketWatchlistItemsByProductId, productId]);

  const filteredWatchlistItems = useMemo(() => {
    if (!allMarketWatchlistItemsByProductId) {
      return;
    }

    return Object.values(allMarketWatchlistItemsByProductId).filter((item) => {
      if (marketWatchlistState.selectedTabId === 'watchlist') {
        return item.isFavorited;
      }
      return true;
    });
  }, [
    allMarketWatchlistItemsByProductId,
    marketWatchlistState.selectedTabId,
  ])?.sort(marketWatchlistItemVolumeComparator);

  const { results: queriedWatchlistItems } = useTextSearch({
    query,
    items: filteredWatchlistItems ?? [],
    getSearchString,
  });

  return {
    didLoadWatchlistState,
    didLoadMarkets: !!allMarketsStaticData,
    disableFavoriteButton: connectionStatus.type !== 'connected',
    marketWatchlistItems: queriedWatchlistItems,
    marketWatchlistState,
    query,
    selectedMarket,
    setMarketWatchlistTabId,
    setQuery,
    toggleIsFavoritedMarket,
    toggleMarketWatchlistIsOpen,
    isEmptyWatchlist:
      marketWatchlistState.selectedTabId === 'watchlist' &&
      didLoadFavoritedMarkets &&
      favoritedMarketIds.size === 0,
  };
}
