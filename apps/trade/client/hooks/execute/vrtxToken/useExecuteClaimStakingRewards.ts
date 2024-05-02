import { useMutation } from '@tanstack/react-query';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import {
  useExecuteInValidContext,
  ValidExecuteContext,
} from 'client/hooks/execute/util/useExecuteInValidContext';
import { useRefetchQueriesOnContractTransaction } from 'client/hooks/execute/util/useRefetchQueries';
import { allDepositableTokenBalancesQueryKey } from 'client/hooks/query/subaccount/useAllDepositableTokenBalances';
import { accountStakingStateQueryKey } from 'client/hooks/query/vrtxToken/useAccountStakingState';
import { lbaTokenWalletBalancesQueryKey } from 'client/hooks/query/vrtxToken/useLbaTokenWalletBalances';
import { useCallback } from 'react';
import { EmptyObject } from 'type-fest';

const REFETCH_QUERY_KEYS: string[][] = [
  lbaTokenWalletBalancesQueryKey(),
  accountStakingStateQueryKey(),
  allDepositableTokenBalancesQueryKey(),
];

/**
 * Claims USDC staking rewards
 */
export function useExecuteClaimStakingRewards() {
  const mutationFn = useExecuteInValidContext(
    useCallback(async (params: EmptyObject, context: ValidExecuteContext) => {
      console.log('Claiming Staking Rewards', params);
      return context.vertexClient.rewards.claimStakingRewards();
    }, []),
  );

  const mutation = useMutation({
    mutationFn,
    onError(error, variables) {
      logExecuteError('ClaimStakingRewards', error, variables);
    },
  });

  useRefetchQueriesOnContractTransaction(REFETCH_QUERY_KEYS, mutation.data);

  return mutation;
}
