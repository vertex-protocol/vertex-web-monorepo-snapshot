import { useQuery } from '@tanstack/react-query';
import { ChainEnv } from '@vertex-protocol/client';
import {
  createQueryKey,
  QueryDisabledError,
  useEVMContext,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { BigDecimals, removeDecimals } from '@vertex-protocol/utils';
import { useFilteredMarkets } from 'client/hooks/markets/useFilteredMarkets';
import { AllLatestMarketPricesData } from 'client/hooks/query/markets/types';

export function allLatestMarketPricesQueryKey(
  chainEnv?: ChainEnv,
  productIds?: number[],
) {
  return createQueryKey('latestMarketPrices', chainEnv, productIds);
}

export function useAllMarketsLatestPrices() {
  const vertexClient = usePrimaryChainVertexClient();
  const { primaryChainEnv } = useEVMContext();
  const { filteredProductIds: allProductIds } = useFilteredMarkets();

  const disabled = !vertexClient || allProductIds.length === 0;

  return useQuery({
    queryKey: allLatestMarketPricesQueryKey(primaryChainEnv, allProductIds),
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
