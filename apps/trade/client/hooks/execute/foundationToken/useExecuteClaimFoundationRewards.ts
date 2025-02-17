import { useMutation } from '@tanstack/react-query';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import {
  useExecuteInValidContext,
  ValidExecuteContext,
} from 'client/hooks/execute/util/useExecuteInValidContext';
import { useRefetchQueriesOnContractTransaction } from 'client/hooks/execute/util/useRefetchQueries';
import { accountFoundationRewardsClaimStateQueryKey } from 'client/hooks/query/foundationRewards/useAccountFoundationRewardsClaimState';
import { allDepositableTokenBalancesQueryKey } from 'client/hooks/query/subaccount/useAllDepositableTokenBalances';
import { useCallback } from 'react';
import { EmptyObject } from 'type-fest';

const REFETCH_QUERY_KEYS: string[][] = [
  allDepositableTokenBalancesQueryKey(),
  accountFoundationRewardsClaimStateQueryKey(),
];

/**
 * Claims any foundation rewards
 */
export function useExecuteClaimFoundationRewards() {
  const mutationFn = useExecuteInValidContext(
    useCallback(async (_: EmptyObject, context: ValidExecuteContext) => {
      const txResponse =
        await context.vertexClient.rewards.claimFoundationRewards();
      return txResponse.hash;
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
