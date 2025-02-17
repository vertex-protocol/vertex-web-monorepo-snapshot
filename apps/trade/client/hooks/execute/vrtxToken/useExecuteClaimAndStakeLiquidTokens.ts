import { useMutation } from '@tanstack/react-query';
import { ClaimLiquidTokensParams } from '@vertex-protocol/client';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import {
  useExecuteInValidContext,
  ValidExecuteContext,
} from 'client/hooks/execute/util/useExecuteInValidContext';
import { useRefetchQueriesOnContractTransaction } from 'client/hooks/execute/util/useRefetchQueries';
import { accountStakingStateQueryKey } from 'client/hooks/query/vrtxToken/useAccountStakingState';
import { accountTokenClaimStateQueryKey } from 'client/hooks/query/vrtxToken/useAccountTokenClaimState';
import { useCallback } from 'react';

const REFETCH_QUERY_KEYS: string[][] = [
  accountTokenClaimStateQueryKey(),
  accountStakingStateQueryKey(),
];

export function useExecuteClaimAndStakeLiquidTokens() {
  const mutationFn = useExecuteInValidContext(
    useCallback(
      async (params: ClaimLiquidTokensParams, context: ValidExecuteContext) => {
        console.log('Claiming and staking Liquid Tokens', params);
        const txResponse =
          await context.vertexClient.rewards.claimAndStakeLiquidTokens(params);
        return txResponse.hash;
      },
      [],
    ),
  );

  const mutation = useMutation({
    mutationFn,
    onError(error, variables) {
      logExecuteError('ClaimAndStakeLiquidTokens', error, variables);
    },
  });

  useRefetchQueriesOnContractTransaction(REFETCH_QUERY_KEYS, mutation.data);

  return mutation;
}
