import { useMutation } from '@tanstack/react-query';
import { VrtxTokenAmountParams } from '@vertex-protocol/client';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import {
  useExecuteInValidContext,
  ValidExecuteContext,
} from 'client/hooks/execute/util/useExecuteInValidContext';
import { useRefetchQueriesOnContractTransaction } from 'client/hooks/execute/util/useRefetchQueries';
import { tokenAllowanceQueryKey } from 'client/hooks/query/useTokenAllowance';
import { accountStakingV2StateQueryKey } from 'client/hooks/query/vrtxToken/useAccountStakingV2State';
import { stakingV2StateQueryKey } from 'client/hooks/query/vrtxToken/useStakingV2State';
import { useCallback, useRef } from 'react';

const REFETCH_QUERY_KEYS_WITHOUT_ALLOWANCE: string[][] = [
  tokenAllowanceQueryKey(),
  stakingV2StateQueryKey(),
  accountStakingV2StateQueryKey(),
];

/**
 * Stakes VRTX token in the v2 staking contract
 */
export function useExecuteStakeV2Vrtx() {
  const refetchQueryKeysRef = useRef<string[][]>([
    ...REFETCH_QUERY_KEYS_WITHOUT_ALLOWANCE,
    // Generic token allowance query key, this should be updated during the mutation
    tokenAllowanceQueryKey(),
  ]);

  const mutationFn = useExecuteInValidContext(
    useCallback(
      async (params: VrtxTokenAmountParams, context: ValidExecuteContext) => {
        console.log('Staking V2 VRTX', params);
        refetchQueryKeysRef.current = [
          ...REFETCH_QUERY_KEYS_WITHOUT_ALLOWANCE,
          tokenAllowanceQueryKey(
            context.subaccount.chainEnv,
            context.subaccount.address,
            context.vertexClient.context.contractAddresses.vrtxStakingV2,
            context.vertexClient.context.contractAddresses.vrtxToken,
          ),
        ];
        return context.vertexClient.rewards.stakeV2(params);
      },
      [],
    ),
  );

  const mutation = useMutation({
    mutationFn,
    onError(error, variables) {
      logExecuteError('StakeV2Vrtx', error, variables);
    },
  });

  useRefetchQueriesOnContractTransaction(
    refetchQueryKeysRef.current,
    mutation.data,
  );

  return mutation;
}
