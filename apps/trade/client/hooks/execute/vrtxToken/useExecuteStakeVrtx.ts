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
import { useCallback, useRef } from 'react';

const REFETCH_QUERY_KEYS_WITHOUT_ALLOWANCE: string[][] = [
  tokenAllowanceQueryKey(),
  lbaTokenWalletBalancesQueryKey(),
  accountStakingStateQueryKey(),
  stakingStateQueryKey(),
];

/**
 * Stakes VRTX for rewards
 */
export function useExecuteStakeVrtx() {
  const refetchQueryKeysRef = useRef<string[][]>([
    ...REFETCH_QUERY_KEYS_WITHOUT_ALLOWANCE,
    // Generic token allowance query key, this should be updated during the mutation
    tokenAllowanceQueryKey(),
  ]);

  const mutationFn = useExecuteInValidContext(
    useCallback(
      async (params: VrtxTokenAmountParams, context: ValidExecuteContext) => {
        console.log('Staking VRTX', params);
        refetchQueryKeysRef.current = [
          ...REFETCH_QUERY_KEYS_WITHOUT_ALLOWANCE,
          tokenAllowanceQueryKey(
            context.subaccount.chainId,
            context.subaccount.address,
            context.vertexClient.context.contractAddresses.vrtxStaking,
            context.vertexClient.context.contractAddresses.vrtxToken,
          ),
        ];
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

  useRefetchQueriesOnContractTransaction(
    refetchQueryKeysRef.current,
    mutation.data,
  );

  return mutation;
}
