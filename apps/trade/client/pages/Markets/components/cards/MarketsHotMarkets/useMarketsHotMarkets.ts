import { removeDecimals } from '@vertex-protocol/client';
import { useVertexMetadataContext } from '@vertex-protocol/react-client';
import { useAllMarketsStats } from 'client/hooks/markets/useAllMarketsStats';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useAllMarkets } from 'client/hooks/query/markets/allMarkets/useAllMarkets';
import { sortAndTrim } from 'client/pages/Markets/utils/sortAndTrim';
import { getSharedProductMetadata } from 'client/utils/getSharedProductMetadata';
import { useMemo } from 'react';

/**
 * The top 6 hottest markets based on daily quote volume in descending order
 */
export function useMarketsHotMarkets() {
  const { data: allMarkets, isLoading: isLoadingAllMarkets } = useAllMarkets();
  const { data: marketStats, isLoading: isLoadingMarketStats } =
    useAllMarketsStats();
  const quotePriceUsd = usePrimaryQuotePriceUsd();
  const { getIsHiddenMarket } = useVertexMetadataContext();

  const hotMarkets = useMemo(() => {
    if (!allMarkets?.allMarkets || !marketStats?.statsByMarket) {
      return;
    }

    // Find hottest market based on daily quote volume
    const mappedMarkets = Object.values(allMarkets.allMarkets)
      .filter(
        (market) =>
          !getIsHiddenMarket(market.productId) &&
          marketStats.statsByMarket[market.productId],
      )
      .map((market) => {
        const past24hDailyVolumeUsd = removeDecimals(
          marketStats.statsByMarket[
            market.productId
          ].pastDayVolumeInPrimaryQuote.multipliedBy(quotePriceUsd),
        );

        return {
          past24hDailyVolumeUsd,
          metadata: getSharedProductMetadata(market.metadata),
          productId: market.productId,
        };
      });
    return sortAndTrim(mappedMarkets, 'past24hDailyVolumeUsd');
  }, [
    allMarkets?.allMarkets,
    marketStats?.statsByMarket,
    getIsHiddenMarket,
    quotePriceUsd,
  ]);
  return {
    hotMarkets,
    isLoading: isLoadingAllMarkets || isLoadingMarketStats,
  };
}
