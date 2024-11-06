import { useQuery } from '@tanstack/react-query';
import { MarketSentiment } from 'common/types/integrations/MarketSentiment';
import { MARKET_SENTIMENT_PROVIDER } from 'common/environment/integrations/marketSentimentProvider';

export function useAllMarketsSentiment() {
  return useQuery({
    enabled: MARKET_SENTIMENT_PROVIDER.enabled,
    queryKey: ['allMarketsSentiment'],
    queryFn: async (): Promise<Record<string, MarketSentiment>> => {
      const res = await fetch(MARKET_SENTIMENT_PROVIDER.url);
      return await res.json();
    },
    refetchInterval: MARKET_SENTIMENT_PROVIDER.refetchInterval,
  });
}
