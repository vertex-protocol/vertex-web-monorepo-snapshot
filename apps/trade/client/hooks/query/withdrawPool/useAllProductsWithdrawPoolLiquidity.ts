import { useQuery } from '@tanstack/react-query';
import {
  BigDecimal,
  ChainEnv,
  QUOTE_PRODUCT_ID,
  toBigDecimal,
} from '@vertex-protocol/client';
import {
  createQueryKey,
  QueryDisabledError,
  useEVMContext,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';

export function allProductsWithdrawPoolLiquidityQueryKey(
  chainEnv?: ChainEnv,
  productIds?: number[],
) {
  return createQueryKey(
    'allProductsWithdrawPoolLiquidity',
    chainEnv,
    productIds,
  );
}

/**
 * The liquidity available in the withdraw pool for each product.
 * @returns a map of productId to liquidity amount in token decimals.
 */
export function useAllProductsWithdrawPoolLiquidity() {
  const { primaryChainEnv } = useEVMContext();
  const vertexClient = usePrimaryChainVertexClient();
  const { data: allMarketsStaticData } = useAllMarketsStaticData();

  const productIds = allMarketsStaticData
    ? [QUOTE_PRODUCT_ID, ...allMarketsStaticData.spotMarketsProductIds]
    : undefined;

  const disabled = !vertexClient || !productIds;

  return useQuery({
    queryKey: allProductsWithdrawPoolLiquidityQueryKey(
      primaryChainEnv,
      productIds,
    ),
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }
      const baseResponse =
        await vertexClient.context.contracts.withdrawPool.checkProductBalances(
          productIds,
        );

      const withdrawPoolLiquidityByProductId: Record<number, BigDecimal> = {};

      productIds.forEach((productId, index) => {
        withdrawPoolLiquidityByProductId[productId] = toBigDecimal(
          baseResponse[index],
        );
      });

      return withdrawPoolLiquidityByProductId;
    },
    enabled: !disabled,
    refetchInterval: 10000,
  });
}
