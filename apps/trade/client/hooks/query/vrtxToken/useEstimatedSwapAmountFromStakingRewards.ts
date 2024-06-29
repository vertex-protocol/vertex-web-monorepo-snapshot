import { useQuery } from '@tanstack/react-query';
import { BigDecimal, toBigDecimal } from '@vertex-protocol/client';
import {
  createQueryKey,
  QueryDisabledError,
  useEVMContext,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';

export function estimatedSwapAmountFromStakingRewardsQueryKey(
  address?: string,
) {
  return createQueryKey('estimatedVrtxSwapAmount', address);
}

/**
 * Retrieves the output amount of the USDC -> VRTX swap when executing claim + stake
 */
export function useEstimatedSwapAmountFromStakingRewards() {
  const vertexClient = usePrimaryChainVertexClient();
  const {
    connectionStatus: { address },
  } = useEVMContext();

  const disabled = !vertexClient || !address;

  const queryFn = async (): Promise<BigDecimal> => {
    if (disabled) {
      throw new QueryDisabledError();
    }

    const amount =
      await vertexClient.rewards.getStakingRewardsEstimatedVrtxSwapAmount({
        address,
      });

    return toBigDecimal(amount);
  };

  return useQuery({
    queryKey: estimatedSwapAmountFromStakingRewardsQueryKey(address),
    queryFn,
    enabled: !disabled,
    refetchInterval: 10000,
  });
}
