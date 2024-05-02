import { useMutation } from '@tanstack/react-query';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import {
  useExecuteInValidContext,
  ValidExecuteContext,
} from 'client/hooks/execute/util/useExecuteInValidContext';
import { useRefetchQueriesOnContractTransaction } from 'client/hooks/execute/util/useRefetchQueries';
import { accountStakingStateQueryKey } from 'client/hooks/query/vrtxToken/useAccountStakingState';
import { estimatedSwapAmountFromStakingRewardsQueryKey } from 'client/hooks/query/vrtxToken/useEstimatedSwapAmountFromStakingRewards';
import { useCallback } from 'react';
import { EmptyObject } from 'type-fest';

const REFETCH_QUERY_KEYS: string[][] = [
  estimatedSwapAmountFromStakingRewardsQueryKey(),
  accountStakingStateQueryKey(),
];

/**
 * Compounds USDC staking rewards
 */
export function useExecuteClaimAndStakeStakingRewards() {
  const mutationFn = useExecuteInValidContext(
    useCallback(async (params: EmptyObject, context: ValidExecuteContext) => {
      console.log('Compounding Staking Rewards', params);
      return context.vertexClient.rewards.claimAndStakeStakingRewards();
    }, []),
  );

  const mutation = useMutation({
    mutationFn,
    onError(error, variables) {
      logExecuteError('ClaimAndStakeStakingRewards', error, variables);
    },
  });

  useRefetchQueriesOnContractTransaction(REFETCH_QUERY_KEYS, mutation.data);

  return mutation;
}
