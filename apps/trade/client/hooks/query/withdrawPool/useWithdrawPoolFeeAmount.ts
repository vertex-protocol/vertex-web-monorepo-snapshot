import { useQuery } from '@tanstack/react-query';
import {
  BigDecimal,
  ChainEnv,
  toBigDecimal,
  toBigInt,
} from '@vertex-protocol/client';
import {
  createQueryKey,
  QueryDisabledError,
  useEVMContext,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { getStaticMarketDataForProductId } from 'client/hooks/markets/marketsStaticData/getStaticMarketDataForProductId';
import { SpotStaticMarketData } from 'client/hooks/markets/marketsStaticData/types';
import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';

export function withdrawPoolFeeAmountQueryKey(
  chainEnv?: ChainEnv,
  productId?: number,
  amount?: BigDecimal,
) {
  return createQueryKey('withdrawPoolFeeAmount', chainEnv, productId, amount);
}

interface Params {
  productId: number | undefined;
  amount: BigDecimal | undefined;
}

/**
 * Calculates the fee amount for withdrawing from the pool.
 * @returns fee amount in token decimals.
 */
export function useWithdrawPoolFeeAmount({ productId, amount }: Params) {
  const { primaryChainEnv } = useEVMContext();
  const vertexClient = usePrimaryChainVertexClient();
  const { data: allMarketsStaticData } = useAllMarketsStaticData();

  const disabled = !vertexClient || productId == null || !amount;

  return useQuery({
    queryKey: withdrawPoolFeeAmountQueryKey(primaryChainEnv, productId, amount),
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      const tokenAddress =
        getStaticMarketDataForProductId<SpotStaticMarketData>(
          productId,
          allMarketsStaticData,
        )?.metadata.token.address;

      if (!tokenAddress) {
        throw new Error('Token address not found');
      }

      const baseResponse =
        await vertexClient.context.contracts.withdrawPool.read.fastWithdrawalFeeAmount(
          [tokenAddress, productId, toBigInt(amount)],
        );

      return toBigDecimal(baseResponse);
    },
    enabled: !disabled,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
