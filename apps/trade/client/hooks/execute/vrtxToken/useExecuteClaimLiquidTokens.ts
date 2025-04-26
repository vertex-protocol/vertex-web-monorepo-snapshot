import { useMutation } from '@tanstack/react-query';
import { ClaimLiquidTokensParams } from '@vertex-protocol/client';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import {
  useExecuteInValidContext,
  ValidExecuteContext,
} from 'client/hooks/execute/util/useExecuteInValidContext';
import { useRefetchQueriesOnContractTransaction } from 'client/hooks/execute/util/useRefetchQueries';
import { allDepositableTokenBalancesQueryKey } from 'client/hooks/query/subaccount/useAllDepositableTokenBalances';
import { accountTokenClaimStateQueryKey } from 'client/hooks/query/vrtxToken/useAccountTokenClaimState';
import { useCallback } from 'react';

const REFETCH_QUERY_KEYS: string[][] = [
  accountTokenClaimStateQueryKey(),
  allDepositableTokenBalancesQueryKey(),
];

/**
 * Immediately claim liquid tokens from the airdrop contract directly to the user's address
 * Valid only for epoch >= LBA_AIRDROP_EPOCH
 */
export function useExecuteClaimLiquidTokens() {
  const mutationFn = useExecuteInValidContext(
    useCallback(
      async (params: ClaimLiquidTokensParams, context: ValidExecuteContext) => {
        console.log('Claiming Liquid Tokens', params);
        return context.vertexClient.rewards.claimLiquidTokens(params);
      },
      [],
    ),
  );

  const mutation = useMutation({
    mutationFn,
    onError(error, variables) {
      logExecuteError('ClaimLiquidTokens', error, variables);
    },
  });

  useRefetchQueriesOnContractTransaction(REFETCH_QUERY_KEYS, mutation.data);

  return mutation;
}
