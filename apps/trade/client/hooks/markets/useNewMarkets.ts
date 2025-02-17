import { useVertexMetadataContext } from '@vertex-protocol/react-client';
import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';

export function useNewMarkets() {
  const { data: allMarketsData } = useAllMarketsStaticData();
  const { getIsNewMarket } = useVertexMetadataContext();

  return Object.values(allMarketsData?.all ?? {}).filter((market) => {
    return getIsNewMarket(market.productId);
  });
}
