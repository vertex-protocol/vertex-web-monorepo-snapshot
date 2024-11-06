import { useAllMarketsNews } from 'client/modules/news/hooks/useAllMarketsNews';
import { useTradingSidebar } from 'client/modules/trading/tradingSidebar/useTradingSidebar';
import { useMemo } from 'react';

export function useTradingSidebarNewsTab() {
  const { relevantMarkets: markets, isLoading: isLoadingMarkets } =
    useTradingSidebar();
  const { data: allMarketsNews, isLoading: isLoadingNews } =
    useAllMarketsNews();

  // build a set of symbols we are interested in (watchlist or all markets)
  const symbolsSet = useMemo(() => {
    return Object.values(markets).reduce((acc, { sharedMetadata }) => {
      acc.add(sharedMetadata.symbol);
      return acc;
    }, new Set<string>());
  }, [markets]);

  // filter news items that are not related to our set of symbols
  const items = useMemo(() => {
    if (!symbolsSet.size || !allMarketsNews) {
      return;
    }
    return allMarketsNews.filter(({ symbols }) =>
      symbols.some((symbol) => symbolsSet.has(symbol)),
    );
  }, [symbolsSet, allMarketsNews]);

  return {
    isLoading: isLoadingMarkets || isLoadingNews,
    items,
  };
}
