import { useMutation } from '@tanstack/react-query';
import { VrtxTokenAmountParams } from '@vertex-protocol/client';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import {
  useExecuteInValidContext,
  ValidExecuteContext,
} from 'client/hooks/execute/util/useExecuteInValidContext';
import { useRefetchQueriesOnContractTransaction } from 'client/hooks/execute/util/useRefetchQueries';
import { tokenAllowanceQueryKey } from 'client/hooks/query/useTokenAllowance';
import { accountStakingStateQueryKey } from 'client/hooks/query/vrtxToken/useAccountStakingState';
import { lbaTokenWalletBalancesQueryKey } from 'client/hooks/query/vrtxToken/useLbaTokenWalletBalances';
import { stakingStateQueryKey } from 'client/hooks/query/vrtxToken/useStakingState';
import { useCallback } from 'react';

const REFETCH_QUERY_KEYS: string[][] = [
  tokenAllowanceQueryKey(),
  lbaTokenWalletBalancesQueryKey(),
  accountStakingStateQueryKey(),
  stakingStateQueryKey(),
];

/**
 * Stakes VRTX for rewards
 */
export function useExecuteStakeVrtx() {
  const mutationFn = useExecuteInValidContext(
    useCallback(
      async (params: VrtxTokenAmountParams, context: ValidExecuteContext) => {
        console.log('Staking VRTX', params);
        return context.vertexClient.rewards.stake(params);
      },
      [],
    ),
  );

  const mutation = useMutation({
    mutationFn,
    onError(error, variables) {
      logExecuteError('StakeVrtx', error, variables);
    },
  });

  useRefetchQueriesOnContractTransaction(REFETCH_QUERY_KEYS, mutation.data);

  return mutation;
}