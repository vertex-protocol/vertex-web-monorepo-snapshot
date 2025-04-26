import {
  MarketCategory,
  useVertexMetadataContext,
} from '@vertex-protocol/react-client';
import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';
import { useAllMarketsStats } from 'client/hooks/markets/useAllMarketsStats';
import { useFavoritedMarkets } from 'client/hooks/markets/useFavoritedMarkets';
import { useAllMarketsLatestPrices } from 'client/hooks/query/markets/useAllMarketsLatestPrices';
import { useProductTradingLinks } from 'client/hooks/ui/navigation/useProductTradingLinks';
import { useTextSearch } from 'client/hooks/ui/useTextSearch';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { MarketSwitcherItem } from 'client/modules/trading/hooks/useMarketSwitcher/types';
import {
  getMappedMarket,
  getSearchString,
  volumeComparator,
} from 'client/modules/trading/hooks/useMarketSwitcher/utils';
import { get } from 'lodash';
import { useMemo, useState } from 'react';

export interface UseMarketSwitcher {
  allMarkets: MarketSwitcherItem[] | undefined;
  isLoading: boolean;
  displayedMarkets: MarketSwitcherItem[];
  toggleIsFavoritedMarket: (marketId: number) => void;
  selectedMarketCategory: MarketCategory | undefined;
  setSelectedMarketCategory: (
    marketCategory: MarketCategory | undefined,
  ) => void;
  query: string;
  setQuery: (query: string) => void;
  disableFavoriteButton: boolean;
}

export function useMarketSwitcher(
  defaultMarketCategory: MarketCategory | undefined,
): UseMarketSwitcher {
  const [query, setQuery] = useState('');
  const [selectedMarketCategory, setSelectedMarketCategory] = useState(
    defaultMarketCategory,
  );

  const isConnected = useIsConnected();
  const { getIsHiddenMarket, getIsNewMarket } = useVertexMetadataContext();

  const { data: allMarketsStaticData, isLoading: isLoadingMarketsStaticData } =
    useAllMarketsStaticData();
  const { data: latestMarketPricesData } = useAllMarketsLatestPrices();
  const { data: marketStatsData } = useAllMarketsStats();
  const { favoritedMarketIds, toggleIsFavoritedMarket } = useFavoritedMarkets();

  const productTradingLinks = useProductTradingLinks();

  const allMarkets = useMemo(() => {
    if (!allMarketsStaticData) {
      return [];
    }

    return Object.values(allMarketsStaticData.allMarkets)
      .filter((market) => !getIsHiddenMarket(market.productId))
      .map((market) =>
        getMappedMarket(
          market,
          latestMarketPricesData,
          marketStatsData,
          favoritedMarketIds.has(market.productId),
          getIsNewMarket(market.productId),
          get(productTradingLinks, market.productId, undefined)?.link ?? '',
        ),
      );
  }, [
    allMarketsStaticData,
    favoritedMarketIds,
    latestMarketPricesData,
    marketStatsData,
    getIsHiddenMarket,
    getIsNewMarket,
    productTradingLinks,
  ]);

  const marketsForProductType = useMemo(() => {
    if (!allMarkets) {
      return [];
    }

    if (selectedMarketCategory == null) {
      return allMarkets;
    }

    return allMarkets.filter((item) =>
      item.market.categories.has(selectedMarketCategory),
    );
  }, [allMarkets, selectedMarketCategory]);

  const { results: queryFilteredMarkets } = useTextSearch({
    query,
    items: marketsForProductType,
    getSearchString,
  });

  const displayedMarkets: MarketSwitcherItem[] = useMemo(() => {
    return queryFilteredMarkets.sort(volumeComparator);
  }, [queryFilteredMarkets]);

  return {
    allMarkets,
    displayedMarkets,
    isLoading: isLoadingMarketsStaticData,
    toggleIsFavoritedMarket,
    selectedMarketCategory,
    setSelectedMarketCategory,
    query,
    setQuery,
    disableFavoriteButton: !isConnected,
  };
}
