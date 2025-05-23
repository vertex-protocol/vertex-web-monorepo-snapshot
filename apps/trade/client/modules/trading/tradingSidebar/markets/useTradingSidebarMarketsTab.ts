import { useAllMarketsStats } from 'client/hooks/markets/useAllMarketsStats';
import { useAllMarketsLatestPrices } from 'client/hooks/query/markets/useAllMarketsLatestPrices';
import { useTextSearch } from 'client/hooks/ui/useTextSearch';
import { useTradingSidebar } from 'client/modules/trading/tradingSidebar/useTradingSidebar';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import {
  getTradingSidebarMarketsSearchString,
  toTradingSidebarMarketData,
  tradingSidebarMarketsVolumeComparator,
} from 'client/modules/trading/tradingSidebar/markets/utils';
import { MarketCategory } from '@vertex-protocol/react-client';
import { mapValues } from 'lodash';
import { useMemo, useState } from 'react';

export function useTradingSidebarMarketsTab() {
  const { isWatchlistTabSelected, relevantMarkets, isLoading } =
    useTradingSidebar();
  const isConnected = useIsConnected();
  const { data: latestMarketPrices } = useAllMarketsLatestPrices();
  const { data: marketStatsData } = useAllMarketsStats();

  const [query, setQuery] = useState('');
  const [marketCategory, setMarketCategory] = useState<MarketCategory>();

  const allMarketsInfoItemsByProductId = useMemo(() => {
    if (!relevantMarkets) {
      return;
    }

    return mapValues(relevantMarkets, (market) => {
      return toTradingSidebarMarketData(
        market,
        latestMarketPrices,
        marketStatsData,
      );
    });
  }, [relevantMarkets, latestMarketPrices, marketStatsData]);

  const categoryFilteredItems = useMemo(() => {
    if (!allMarketsInfoItemsByProductId) {
      return [];
    }

    return Object.values(allMarketsInfoItemsByProductId)
      .filter((item) => {
        return (
          !marketCategory ||
          item.marketData.metadata.marketCategories.has(marketCategory)
        );
      })
      .sort(tradingSidebarMarketsVolumeComparator);
  }, [allMarketsInfoItemsByProductId, marketCategory]);

  const { results: marketInfoItems } = useTextSearch({
    query,
    items: categoryFilteredItems,
    getSearchString: getTradingSidebarMarketsSearchString,
  });

  return {
    disableFavoriteButton: !isConnected,
    marketInfoItems,
    isLoading,
    marketCategory,
    query,
    isWatchlistTabSelected,
    setQuery,
    setMarketCategory,
  };
}
