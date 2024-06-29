import { ProductEngineType } from '@vertex-protocol/client';
import { useEVMContext } from '@vertex-protocol/react-client';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { useAllMarketsHistoricalMetrics } from 'client/hooks/markets/useAllMarketsHistoricalMetrics';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { useFavoritedMarkets } from 'client/hooks/markets/useFavoritedMarkets';
import { useAllMarketsLatestPrices } from 'client/hooks/query/markets/useAllMarketsLatestPrices';
import { useProductTradingLinks } from 'client/hooks/ui/navigation/useProductTradingLinks';
import { useTextSearch } from 'client/hooks/ui/useTextSearch';
import { get } from 'lodash';
import { useMemo, useState } from 'react';
import { MarketSwitcherItem } from './types';
import { getMappedMarket, getSearchString, volumeComparator } from './utils';

export interface UseMarketSwitcher {
  allMarkets: MarketSwitcherItem[] | undefined;
  displayedMarkets: MarketSwitcherItem[];
  toggleIsFavoritedMarket: (marketId: number) => void;
  selectedMarketTypeFilter: ProductEngineType | undefined;
  setSelectedMarketTypeFilter: (
    productType: ProductEngineType | undefined,
  ) => void;
  query: string;
  setQuery: (query: string) => void;
  disableFavoriteButton: boolean;
}

export function useMarketSwitcher(
  defaultMarketType: ProductEngineType | undefined,
): UseMarketSwitcher {
  const [query, setQuery] = useState('');
  const [selectedMarketTypeFilter, setSelectedMarketTypeFilter] =
    useState(defaultMarketType);

  const { connectionStatus } = useEVMContext();
  const { getIsHiddenMarket, getIsNewMarket } = useVertexMetadataContext();

  const { data: allMarketsStaticData } = useAllMarketsStaticData();
  const { data: latestMarketPricesData } = useAllMarketsLatestPrices();
  const { data: marketMetricsData } = useAllMarketsHistoricalMetrics();
  const { favoritedMarketIds, toggleIsFavoritedMarket } = useFavoritedMarkets();

  const productTradingLinks = useProductTradingLinks();

  const allMarkets = useMemo(() => {
    if (!allMarketsStaticData) {
      return [];
    }

    return Object.values(allMarketsStaticData.all)
      .filter((market) => !getIsHiddenMarket(market.productId))
      .map((market) =>
        getMappedMarket(
          market,
          latestMarketPricesData,
          marketMetricsData,
          favoritedMarketIds.has(market.productId),
          getIsNewMarket(market.productId),
          get(productTradingLinks, market.productId, undefined)?.link ?? '',
        ),
      );
  }, [
    allMarketsStaticData,
    favoritedMarketIds,
    latestMarketPricesData,
    marketMetricsData,
    getIsHiddenMarket,
    getIsNewMarket,
    productTradingLinks,
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

  const displayedMarkets: MarketSwitcherItem[] = useMemo(() => {
    return queryFilteredMarkets.sort(volumeComparator);
  }, [queryFilteredMarkets]);

  return {
    allMarkets,
    displayedMarkets,
    toggleIsFavoritedMarket,
    selectedMarketTypeFilter,
    setSelectedMarketTypeFilter,
    query,
    setQuery,
    disableFavoriteButton: connectionStatus.type !== 'connected',
  };
}
