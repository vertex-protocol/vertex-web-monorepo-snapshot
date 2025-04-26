import {
  getMarketPriceFormatSpecifier,
  useVertexMetadataContext,
} from '@vertex-protocol/react-client';
import { useAllMarkets24hSnapshots } from 'client/hooks/markets/useAllMarkets24hSnapshots';
import { useAllMarketsByChainEnv } from 'client/hooks/query/markets/allMarkets/useAllMarketsByChainEnv';
import { calcChangeFrac } from 'client/utils/calcs/calcChangeFrac';

export function useVrtxMarketMetrics() {
  const { protocolTokenMetadata } = useVertexMetadataContext();
  const { data: allMarkets24hSnapshots } = useAllMarkets24hSnapshots();
  const { data: allMarketsByChainEnv } = useAllMarketsByChainEnv();

  const priceIncrement =
    allMarketsByChainEnv?.[protocolTokenMetadata.chainEnv]?.allMarkets[
      protocolTokenMetadata.productId
    ].priceIncrement;

  const historicalOraclePrice =
    allMarkets24hSnapshots?.historical24h?.oraclePrices[
      protocolTokenMetadata.productId
    ];
  const latestOraclePrice =
    allMarkets24hSnapshots?.latest?.oraclePrices[
      protocolTokenMetadata.productId
    ];

  const pastDayOraclePriceChangeFrac = (() => {
    if (!latestOraclePrice || !historicalOraclePrice) {
      return;
    }

    return calcChangeFrac(latestOraclePrice, historicalOraclePrice);
  })();

  return {
    oraclePrice: latestOraclePrice,
    marketPriceFormatSpecifier: getMarketPriceFormatSpecifier(priceIncrement),
    pastDayOraclePriceChangeFrac,
  };
}
