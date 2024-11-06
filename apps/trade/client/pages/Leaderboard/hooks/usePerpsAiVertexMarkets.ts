import { useQuery } from '@tanstack/react-query';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import {
  QueryDisabledError,
  createQueryKey,
} from '@vertex-protocol/react-client';
import { perpsAiFetch } from 'client/pages/Leaderboard/utils/perpsAiFetch';
import { PerpProductMetadata } from '@vertex-protocol/metadata';

interface PerpsAiServerVertexMarkets {
  /**
   * PerpsAi returns market as market name (i.e. BTC/USD).
   */
  market: string;
  /**
   * PerpsAi returns token as symbol (i.e. BTC).
   */
  token: string;
}

export function usePerpsAiVertexMarkets() {
  const { data: staticMarketData } = useAllMarketsStaticData();

  const allPerpMarkets = staticMarketData?.perp;
  const disabled = !allPerpMarkets;

  return useQuery({
    queryKey: createQueryKey('perpsAiVertexMarkets'),
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      const responseData: PerpsAiServerVertexMarkets[] = await perpsAiFetch({
        path: 'vertex_markets',
      });

      const lowercasedSymbolToMetadata = Object.values(allPerpMarkets).reduce(
        (mapping, { metadata }) => {
          mapping[metadata.symbol.toLowerCase()] = metadata;

          return mapping;
        },
        {} as Record<string, PerpProductMetadata>,
      );

      const perpsAiMarketNameToMetadata = responseData.reduce(
        (mapping, { market, token }) => {
          const lowercasedTokenSymbol = token.toLowerCase();
          const matchedMetadata =
            lowercasedSymbolToMetadata[lowercasedTokenSymbol];

          if (matchedMetadata !== undefined) {
            mapping[market] = matchedMetadata;
          }

          return mapping;
        },
        {} as Record<string, PerpProductMetadata>,
      );

      return perpsAiMarketNameToMetadata;
    },
  });
}
