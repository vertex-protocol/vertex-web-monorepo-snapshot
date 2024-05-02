import { ProductEngineType } from '@vertex-protocol/client';
import { isFavoritedComparator, volumeComparator } from './comparators';
import { getMappedMarket, getSearchString } from './utils';
import { TradeSwitcherItem } from './types';
import { useMemo, useState } from 'react';
import { useAllMarketsLatestPrices } from 'client/hooks/query/markets/useAllMarketsLatestPrices';
import { useAllMarketsHistoricalMetrics } from 'client/hooks/markets/useAllMarketsHistoricalMetrics';
import { useTextSearch } from 'client/hooks/ui/useTextSearch';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { useFavoritedMarkets } from 'client/modules/markets/hooks/useFavoritedMarkets';
import { useEVMContext } from '@vertex-protocol/web-data';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';

export interface UseTradeSwitcher {
  allMarkets: TradeSwitcherItem[] | undefined;
  displayedMarkets: TradeSwitcherItem[];
  toggleIsFavoritedMarket: (marketId: number) => void;
  selectedMarketTypeFilter: ProductEngineType | undefined;
  setSelectedMarketTypeFilter: (
    productType: ProductEngineType | undefined,
  ) => void;
  sortByFavorites: boolean;
  setSortByFavorites: (sortByFavorites: boolean) => void;
  query: string;
  setQuery: (query: string) => void;
  disableFavoriteButton: boolean;
}

export function useTradeSwitcher(
  defaultMarketType: ProductEngineType | undefined,
): UseTradeSwitcher {
  const { connectionStatus } = useEVMContext();
  const { getIsHiddenMarket, getIsNewMarket } = useVertexMetadataContext();

  const { data: allMarketsStaticData } = useAllMarketsStaticData();
  const { data: latestMarketPrices } = useAllMarketsLatestPrices();
  const { data: marketMetricsData } = useAllMarketsHistoricalMetrics();
  const { favoritedMarketIds, toggleIsFavoritedMarket } = useFavoritedMarkets();

  const [query, setQuery] = useState(''); // Initial state empty string, empty user query
  const [sortByFavorites, setSortByFavorites] = useState(true); // Initial state true, default to sorting by favorites
  const [selectedMarketTypeFilter, setSelectedMarketTypeFilter] =
    useState(defaultMarketType); // Undefined refers to 'All'

  const allMarkets = useMemo(() => {
    if (!allMarketsStaticData) {
      return [];
    }
    return Object.values(allMarketsStaticData.all)
      .filter((market) => !getIsHiddenMarket(market.productId))
      .map((market) =>
        getMappedMarket(
          market,
          latestMarketPrices,
          marketMetricsData,
          favoritedMarketIds.has(market.productId),
          getIsNewMarket(market.productId),
        ),
      );
  }, [
    allMarketsStaticData,
    favoritedMarketIds,
    latestMarketPrices,
    marketMetricsData,
    getIsHiddenMarket,
    getIsNewMarket,
  ]);

  const marketsForProductType = useMemo(() => {
    if (!allMarkets) {
      return [];
    }
    if (selectedMarketTypeFilter === ProductEngineType.SPOT) {
      return allMarkets.filter(
        (item) => item.market.productType === ProductEngineType.SPOT,
      );
    }
    if (selectedMarketTypeFilter === ProductEngineType.PERP) {
      return allMarkets.filter(
        (item) => item.market.productType === ProductEngineType.PERP,
      );
    }
    return allMarkets;
  }, [allMarkets, selectedMarketTypeFilter]);

  const { results: queryFilteredMarkets } = useTextSearch({
    query,
    items: marketsForProductType,
    getSearchString,
  });

  const displayedMarkets: TradeSwitcherItem[] = useMemo(() => {
    return queryFilteredMarkets.sort((a, b) => {
      if (sortByFavorites) {
        return isFavoritedComparator(a, b);
      }
      return volumeComparator(a, b);
    });
  }, [queryFilteredMarkets, sortByFavorites]);

  return {
    allMarkets,
    displayedMarkets,
    toggleIsFavoritedMarket,
    selectedMarketTypeFilter,
    setSelectedMarketTypeFilter,
    sortByFavorites,
    setSortByFavorites,
    query,
    setQuery,
    disableFavoriteButton: connectionStatus.type !== 'connected',
  };
}
