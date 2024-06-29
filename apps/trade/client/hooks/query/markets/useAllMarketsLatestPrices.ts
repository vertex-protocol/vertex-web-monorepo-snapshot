import { useQuery } from '@tanstack/react-query';
import { BigDecimals, removeDecimals } from '@vertex-protocol/utils';
import {
  createQueryKey,
  PrimaryChainID,
  QueryDisabledError,
  usePrimaryChainId,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useFilteredMarkets } from 'client/hooks/markets/useFilteredMarkets';

import { AllLatestMarketPricesData } from './types';

export function allLatestMarketPricesQueryKey(
  chainId?: PrimaryChainID,
  productIds?: number[],
) {
  return createQueryKey('latestMarketPrices', chainId, productIds);
}

export function useAllMarketsLatestPrices() {
  const vertexClient = usePrimaryChainVertexClient();
  const primaryChainId = usePrimaryChainId();
  const { filteredProductIds: allProductIds } = useFilteredMarkets();

  const disabled = !vertexClient || allProductIds.length === 0;

  return useQuery({
    queryKey: allLatestMarketPricesQueryKey(primaryChainId, allProductIds),
    queryFn: async (): Promise<AllLatestMarketPricesData> => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      const { marketPrices } = await vertexClient.market.getLatestMarketPrices({
        productIds: allProductIds,
      });

      const productIdToLatestMarketPrice: AllLatestMarketPricesData = {};
      marketPrices.forEach((marketPrice) => {
        const average = marketPrice.bid.div(2).plus(marketPrice.ask.div(2));
        const isBidEmpty = marketPrice.bid.isZero();
        const isAskEmpty = removeDecimals(BigDecimals.MAX_I128).eq(
          marketPrice.ask,
        );

        // Safe variables will return undefined in case when ask/bid/avg of the orderbook are empty.
        const safeBid = isBidEmpty ? undefined : marketPrice.bid;
        const safeAsk = isAskEmpty ? undefined : marketPrice.ask;

        const safeAverage = safeBid && safeAsk ? average : undefined;

        productIdToLatestMarketPrice[marketPrice.productId] = {
          bid: marketPrice.bid,
          ask: marketPrice.ask,
          average,
          safeAsk,
          safeAverage,
          safeBid,
        };
      });

      return productIdToLatestMarketPrice;
    },
    enabled: !disabled,
    refetchInterval: 10000,
  });
}
