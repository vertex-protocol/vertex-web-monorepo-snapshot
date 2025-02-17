import { useMutation } from '@tanstack/react-query';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import { useExecuteInValidContext } from 'client/hooks/execute/util/useExecuteInValidContext';
import { useRefetchQueriesOnContractTransaction } from 'client/hooks/execute/util/useRefetchQueries';
import { accountStakingStateQueryKey } from 'client/hooks/query/vrtxToken/useAccountStakingState';
import { accountStakingV2StateQueryKey } from 'client/hooks/query/vrtxToken/useAccountStakingV2State';
import { stakingStateQueryKey } from 'client/hooks/query/vrtxToken/useStakingState';
import { stakingV2StateQueryKey } from 'client/hooks/query/vrtxToken/useStakingV2State';
import { useCallback } from 'react';
import { EmptyObject } from 'type-fest';

const REFETCH_QUERY_KEYS: string[][] = [
  stakingStateQueryKey(),
  accountStakingStateQueryKey(),
  stakingV2StateQueryKey(),
  accountStakingV2StateQueryKey(),
];

/**
 * Migrates tokens from the V1 staking contract to the v2 staking contract.
 */
export function useExecuteMigrateStakingV1ToV2() {
  const mutationFn = useExecuteInValidContext(
    useCallback(async (_: EmptyObject, context) => {
      const txResponse = await context.vertexClient.rewards.migrateStakingV2();
      return txResponse.hash;
    }, []),
  );

  const mutation = useMutation({
    mutationFn,
    onError(error, variables) {
      logExecuteError('MigrateStakingV1ToV2', error, variables);
    },
  });

  useRefetchQueriesOnContractTransaction(REFETCH_QUERY_KEYS, mutation.data);

  return mutation;
}
