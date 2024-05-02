import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';

export function useNewMarkets() {
  const { data: allMarketsData } = useAllMarketsStaticData();
  const { getIsNewMarket } = useVertexMetadataContext();

  return Object.values(allMarketsData?.all ?? {}).filter((market) => {
    return getIsNewMarket(market.productId);
  });
}
