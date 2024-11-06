import { useQuery } from '@tanstack/react-query';
import { MarketNewsItem } from 'common/types/integrations/MarketNewsItem';
import { MARKET_NEWS_PROVIDER } from 'common/environment/integrations/marketNewsProvider';

export function useAllMarketsNews() {
  return useQuery({
    enabled: MARKET_NEWS_PROVIDER.enabled,
    queryKey: ['allMarketsNews'],
    queryFn: async (): Promise<MarketNewsItem[]> => {
      const res = await fetch(MARKET_NEWS_PROVIDER.url);
      return await res.json();
    },
    refetchInterval: MARKET_NEWS_PROVIDER.refetchInterval,
  });
}
