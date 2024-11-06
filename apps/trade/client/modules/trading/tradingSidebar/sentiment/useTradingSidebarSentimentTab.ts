import { ProductEngineType } from '@vertex-protocol/client';
import { useAllMarketsSentiment } from 'client/modules/sentiment/hooks/useAllMarketsSentiment';
import { useTradingSidebar } from 'client/modules/trading/tradingSidebar/useTradingSidebar';
import { SentimentTabItemData } from 'client/modules/trading/tradingSidebar/sentiment/types';
import { nonNullFilter } from 'client/utils/nonNullFilter';
import { useMemo } from 'react';

export function useTradingSidebarSentimentTab() {
  const { relevantMarkets: markets, isLoading: isLoadingMarkets } =
    useTradingSidebar();
  const { data: allMarketsSentiment, isLoading: isLoadingSentiment } =
    useAllMarketsSentiment();

  // build mapping from symbol to market (prioritize perp for href)
  const primaryMarketBySymbol = useMemo(() => {
    return markets.reduce((acc, market) => {
      const {
        sharedMetadata,
        href,
        marketData: { type },
      } = market;
      if (type === ProductEngineType.PERP || !acc.get(sharedMetadata.symbol)) {
        acc.set(sharedMetadata.symbol, { metadata: sharedMetadata, href });
      }
      return acc;
    }, new Map<string, Omit<SentimentTabItemData, 'marketSentiment'>>());
  }, [markets]);

  // map sentiment to each market
  const rows = useMemo(() => {
    if (!primaryMarketBySymbol.size || !allMarketsSentiment) {
      return;
    }
    return Object.entries(allMarketsSentiment)
      .map(([symbol, sentiment]) => {
        const market = primaryMarketBySymbol.get(symbol);
        return market
          ? {
              marketSentiment: sentiment,
              ...market,
            }
          : null;
      })
      .filter(nonNullFilter);
  }, [primaryMarketBySymbol, allMarketsSentiment]);

  return {
    isLoading: isLoadingMarkets || isLoadingSentiment,
    rows,
  };
}
