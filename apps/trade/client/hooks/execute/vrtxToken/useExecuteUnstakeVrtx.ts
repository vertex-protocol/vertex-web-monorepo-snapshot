import { useMutation } from '@tanstack/react-query';
import { VrtxTokenAmountParams } from '@vertex-protocol/client';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import {
  useExecuteInValidContext,
  ValidExecuteContext,
} from 'client/hooks/execute/util/useExecuteInValidContext';
import { useRefetchQueriesOnContractTransaction } from 'client/hooks/execute/util/useRefetchQueries';
import { accountStakingStateQueryKey } from 'client/hooks/query/vrtxToken/useAccountStakingState';
import { stakingStateQueryKey } from 'client/hooks/query/vrtxToken/useStakingState';
import { useCallback } from 'react';

const REFETCH_QUERY_KEYS: string[][] = [
  accountStakingStateQueryKey(),
  stakingStateQueryKey(),
];

/**
 * Unstakes VRTX (unstaked tokens undergo an "unlock" period and must subsquentely be withdrawn)
 */
export function useExecuteUnstakeVrtx() {
  const mutationFn = useExecuteInValidContext(
    useCallback(
      async (params: VrtxTokenAmountParams, context: ValidExecuteContext) => {
        console.log('Unstaking VRTX', params);
        const txResponse = await context.vertexClient.rewards.unstake(params);
        return txResponse.hash;
      },
      [],
    ),
  );

  const mutation = useMutation({
    mutationFn,
    onError(error, variables) {
      logExecuteError('UnstakeVrtx', error, variables);
    },
  });

  useRefetchQueriesOnContractTransaction(REFETCH_QUERY_KEYS, mutation.data);

  return mutation;
}
