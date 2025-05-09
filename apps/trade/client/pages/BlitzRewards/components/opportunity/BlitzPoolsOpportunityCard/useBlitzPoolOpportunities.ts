import { KNOWN_PRODUCT_IDS } from '@vertex-protocol/react-client';
import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';
import { useLpYields } from 'client/hooks/markets/useLpYields';
import { getSharedProductMetadata } from 'client/utils/getSharedProductMetadata';
import { nonNullFilter } from '@vertex-protocol/web-common';
import { useMemo } from 'react';

const POOLS_PRODUCT_IDS: number[] = [
  KNOWN_PRODUCT_IDS.blast,
  KNOWN_PRODUCT_IDS.wethBlastSepolia,
  KNOWN_PRODUCT_IDS.wethBlast,
];

export function useBlitzPoolOpportunities() {
  const { data: lpYieldsData } = useLpYields();
  const { data: allMarketsStaticData } = useAllMarketsStaticData();

  return useMemo(() => {
    if (!allMarketsStaticData) {
      return;
    }

    return POOLS_PRODUCT_IDS.map((productId) => {
      const staticMarketData = allMarketsStaticData?.allMarkets[productId];

      if (!staticMarketData) {
        return;
      }

      return {
        productId: staticMarketData.productId,
        metadata: {
          base: getSharedProductMetadata(staticMarketData.metadata),
          quote: allMarketsStaticData.primaryQuoteProduct.metadata.token,
        },
        yieldFraction: lpYieldsData?.[staticMarketData.productId],
        marketName: staticMarketData.metadata.marketName,
      };
    }).filter(nonNullFilter);
  }, [allMarketsStaticData, lpYieldsData]);
}
