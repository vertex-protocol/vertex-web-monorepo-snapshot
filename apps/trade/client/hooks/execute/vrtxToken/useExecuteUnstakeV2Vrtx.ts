import { useMutation } from '@tanstack/react-query';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import {
  useExecuteInValidContext,
  ValidExecuteContext,
} from 'client/hooks/execute/util/useExecuteInValidContext';
import { useRefetchQueriesOnContractTransaction } from 'client/hooks/execute/util/useRefetchQueries';
import { accountStakingV2StateQueryKey } from 'client/hooks/query/vrtxToken/useAccountStakingV2State';
import { stakingV2StateQueryKey } from 'client/hooks/query/vrtxToken/useStakingV2State';
import { useCallback } from 'react';

const REFETCH_QUERY_KEYS: string[][] = [
  accountStakingV2StateQueryKey(),
  stakingV2StateQueryKey(),
];

interface Params {
  instant: boolean;
}

/**
 * Unstakes VRTX from v2 staking contract.
 */
export function useExecuteUnstakeV2Vrtx() {
  const mutationFn = useExecuteInValidContext(
    useCallback(async (params: Params, context: ValidExecuteContext) => {
      console.log('Unstaking v2 VRTX', params);
      const txResponse = await (() => {
        if (params.instant) {
          // Unstaked tokens are available for withdrawal instantly, but face a token penalty that is redirected
          // based on `toTreasuryRatio` and `toDistributeRatio` parameters.
          return context.vertexClient.rewards.unstakeV2();
        }
        // Unstaked tokens undergo an "unlock" period and must subsequently be withdrawn
        return context.vertexClient.rewards.unstakeV2Slow();
      })();

      return txResponse.hash;
    }, []),
  );

  const mutation = useMutation({
    mutationFn,
    onError(error, variables) {
      logExecuteError('UnstakeV2Vrtx', error, variables);
    },
  });

  useRefetchQueriesOnContractTransaction(REFETCH_QUERY_KEYS, mutation.data);

  return mutation;
}
