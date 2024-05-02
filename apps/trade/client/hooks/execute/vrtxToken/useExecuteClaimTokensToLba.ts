import { useMutation } from '@tanstack/react-query';
import { ClaimTokensToLbaParams } from '@vertex-protocol/client';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import {
  useExecuteInValidContext,
  ValidExecuteContext,
} from 'client/hooks/execute/util/useExecuteInValidContext';
import { useRefetchQueriesOnContractTransaction } from 'client/hooks/execute/util/useRefetchQueries';
import { accountLbaStateQueryKey } from 'client/hooks/query/vrtxToken/useAccountLbaState';
import { accountTokenClaimStateQueryKey } from 'client/hooks/query/vrtxToken/useAccountTokenClaimState';
import { lbaStateQueryKey } from 'client/hooks/query/vrtxToken/useLbaState';
import { lbaTokenWalletBalancesQueryKey } from 'client/hooks/query/vrtxToken/useLbaTokenWalletBalances';
import { useCallback } from 'react';

const REFETCH_QUERY_KEYS: string[][] = [
  accountTokenClaimStateQueryKey(),
  lbaStateQueryKey(),
  lbaTokenWalletBalancesQueryKey(),
  accountLbaStateQueryKey(),
];

/**
 * Only callable during the LBA claim phase (5 days) to claim rewards to the LBA pool
 */
export function useExecuteClaimTokensToLba() {
  const mutationFn = useExecuteInValidContext(
    useCallback(
      async (params: ClaimTokensToLbaParams, context: ValidExecuteContext) => {
        console.log('Claiming to LBA', params);
        return context.vertexClient.rewards.claimTokensToLba(params);
      },
      [],
    ),
  );

  const mutation = useMutation({
    mutationFn,
    onError(error, variables) {
      logExecuteError('ClaimTokensToLba', error, variables);
    },
  });

  useRefetchQueriesOnContractTransaction(REFETCH_QUERY_KEYS, mutation.data);

  return mutation;
}
