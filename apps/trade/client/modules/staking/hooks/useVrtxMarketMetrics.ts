import {
  getMarketPriceFormatSpecifier,
  useVertexMetadataContext,
} from '@vertex-protocol/react-client';
import { useAllMarkets24hrSnapshots } from 'client/hooks/markets/useAllMarkets24hrSnapshots';
import { useAllMarketsByChainEnv } from 'client/hooks/query/markets/allMarkets/useAllMarketsByChainEnv';
import { calcChangeFrac } from 'client/utils/calcs/calcChangeFrac';

export function useVrtxMarketMetrics() {
  const { protocolTokenMetadata } = useVertexMetadataContext();
  const { data: allMarkets24hrSnapshots } = useAllMarkets24hrSnapshots();
  const { data: allMarketsByChainEnv } = useAllMarketsByChainEnv();

  const priceIncrement =
    allMarketsByChainEnv?.[protocolTokenMetadata.chainEnv]?.allMarkets[
      protocolTokenMetadata.productId
    ].priceIncrement;

  const historicalOraclePrice =
    allMarkets24hrSnapshots?.historical24hr?.oraclePrices[
      protocolTokenMetadata.productId
    ];
  const latestOraclePrice =
    allMarkets24hrSnapshots?.latest?.oraclePrices[
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
