import { useMutation } from '@tanstack/react-query';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import {
  useExecuteInValidContext,
  ValidExecuteContext,
} from 'client/hooks/execute/util/useExecuteInValidContext';
import { useRefetchQueriesOnContractTransaction } from 'client/hooks/execute/util/useRefetchQueries';
import { allDepositableTokenBalancesQueryKey } from 'client/hooks/query/subaccount/useAllDepositableTokenBalances';
import { accountStakingV2StateQueryKey } from 'client/hooks/query/vrtxToken/useAccountStakingV2State';
import { stakingV2StateQueryKey } from 'client/hooks/query/vrtxToken/useStakingV2State';
import { useCallback } from 'react';
import { EmptyObject } from 'type-fest';

const REFETCH_QUERY_KEYS: string[][] = [
  stakingV2StateQueryKey(),
  accountStakingV2StateQueryKey(),
  allDepositableTokenBalancesQueryKey(),
];

/**
 * Stakes VRTX for rewards
 */
export function useExecuteWithdrawUnstakedV2Vrtx() {
  const mutationFn = useExecuteInValidContext(
    useCallback(async (_params: EmptyObject, context: ValidExecuteContext) => {
      return context.vertexClient.rewards.withdrawUnstakedV2Tokens();
    }, []),
  );

  const mutation = useMutation({
    mutationFn,
    onError(error, variables) {
      logExecuteError('WithdrawUnstakedV2Vrtx', error, variables);
    },
  });

  useRefetchQueriesOnContractTransaction(REFETCH_QUERY_KEYS, mutation.data);

  return mutation;
}
