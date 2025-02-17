import { useMutation } from '@tanstack/react-query';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import {
  useExecuteInValidContext,
  ValidExecuteContext,
} from 'client/hooks/execute/util/useExecuteInValidContext';
import { useRefetchQueriesOnContractTransaction } from 'client/hooks/execute/util/useRefetchQueries';
import { allDepositableTokenBalancesQueryKey } from 'client/hooks/query/subaccount/useAllDepositableTokenBalances';
import { accountStakingStateQueryKey } from 'client/hooks/query/vrtxToken/useAccountStakingState';
import { useCallback } from 'react';
import { EmptyObject } from 'type-fest';

const REFETCH_QUERY_KEYS: string[][] = [
  accountStakingStateQueryKey(),
  allDepositableTokenBalancesQueryKey(),
];

/**
 * Stakes VRTX for rewards
 */
export function useExecuteWithdrawUnstakedVrtx() {
  const mutationFn = useExecuteInValidContext(
    useCallback(async (_: EmptyObject, context: ValidExecuteContext) => {
      const txResponse =
        await context.vertexClient.rewards.withdrawUnstakedTokens();
      return txResponse.hash;
    }, []),
  );

  const mutation = useMutation({
    mutationFn,
    onError(error, variables) {
      logExecuteError('WithdrawUnstakedVrtx', error, variables);
    },
  });

  useRefetchQueriesOnContractTransaction(REFETCH_QUERY_KEYS, mutation.data);

  return mutation;
}
