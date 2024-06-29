import { useMutation } from '@tanstack/react-query';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import {
  useExecuteInValidContext,
  ValidExecuteContext,
} from 'client/hooks/execute/util/useExecuteInValidContext';
import { useRefetchQueriesOnContractTransaction } from 'client/hooks/execute/util/useRefetchQueries';
import { useCallback } from 'react';
import { EmptyObject } from 'type-fest';
import { allDepositableTokenBalancesQueryKey } from 'client/hooks/query/subaccount/useAllDepositableTokenBalances';
import { accountFoundationRewardsClaimStateQueryKey } from 'client/hooks/query/foundationRewards/useAccountFoundationRewardsClaimState';

const REFETCH_QUERY_KEYS: string[][] = [
  allDepositableTokenBalancesQueryKey(),
  accountFoundationRewardsClaimStateQueryKey(),
];

/**
 * Claims any foundation rewards
 */
export function useExecuteClaimFoundationRewards() {
  const mutationFn = useExecuteInValidContext(
    useCallback(async (params: EmptyObject, context: ValidExecuteContext) => {
      console.log('Claiming Foundation Rewards', params);
      return context.vertexClient.rewards.claimFoundationRewards();
    }, []),
  );

  const mutation = useMutation({
    mutationFn,
    onError(error, variables) {
      logExecuteError('ClaimFoundationRewards', error, variables);
    },
  });

  useRefetchQueriesOnContractTransaction(REFETCH_QUERY_KEYS, mutation.data);

  return mutation;
}
