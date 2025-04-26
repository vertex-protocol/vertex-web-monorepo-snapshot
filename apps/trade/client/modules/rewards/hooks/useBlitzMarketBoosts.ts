import { KNOWN_PRODUCT_IDS } from '@vertex-protocol/react-client';
import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';
import { getSharedProductMetadata } from 'client/utils/getSharedProductMetadata';
import { nonNullFilter } from '@vertex-protocol/web-common';
import { useMemo } from 'react';

const MARKET_BOOST_MULTIPLIERS_BY_PRODUCT_ID: Record<number, number> = {
  [KNOWN_PRODUCT_IDS.blastPerp]: 1.5,
  [KNOWN_PRODUCT_IDS.blast]: 3,
  [KNOWN_PRODUCT_IDS.wethBlastSepolia]: 3,
  [KNOWN_PRODUCT_IDS.wethBlast]: 3,
};

export function useBlitzMarketBoosts() {
  const { data: allMarketsStaticData } = useAllMarketsStaticData();

  return useMemo(() => {
    if (!allMarketsStaticData) {
      return;
    }

    return Object.entries(MARKET_BOOST_MULTIPLIERS_BY_PRODUCT_ID)
      .map(([productId, pointsMultiplier]) => {
        const staticMarketData =
          allMarketsStaticData?.allMarkets[Number(productId)];

        if (!staticMarketData) {
          return;
        }

        return {
          productId: staticMarketData.productId,
          pointsMultiplier,
          metadata: getSharedProductMetadata(staticMarketData.metadata),
          marketName: staticMarketData.metadata.marketName,
        };
      })
      .filter(nonNullFilter);
  }, [allMarketsStaticData]);
}
