import { useMutation } from '@tanstack/react-query';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import {
  useExecuteInValidContext,
  ValidExecuteContext,
} from 'client/hooks/execute/util/useExecuteInValidContext';
import { useRefetchQueriesOnContractTransaction } from 'client/hooks/execute/util/useRefetchQueries';
import { allDepositableTokenBalancesQueryKey } from 'client/hooks/query/subaccount/useAllDepositableTokenBalances';
import { accountTokenClaimStateQueryKey } from 'client/hooks/query/vrtxToken/useAccountTokenClaimState';
import { lbaTokenWalletBalancesQueryKey } from 'client/hooks/query/vrtxToken/useLbaTokenWalletBalances';
import { useCallback } from 'react';
import { EmptyObject } from 'type-fest';

const REFETCH_QUERY_KEYS: string[][] = [
  accountTokenClaimStateQueryKey(),
  lbaTokenWalletBalancesQueryKey(),
  allDepositableTokenBalancesQueryKey(),
];

/**
 * Claims any VRTX rewards from participating in the LBA liquidity
 */
export function useExecuteClaimLbaRewards() {
  const mutationFn = useExecuteInValidContext(
    useCallback(async (_: EmptyObject, context: ValidExecuteContext) => {
      return context.vertexClient.rewards.claimLbaRewards();
    }, []),
  );

  const mutation = useMutation({
    mutationFn,
    onError(error, variables) {
      logExecuteError('ClaimLbaRewards', error, variables);
    },
  });

  useRefetchQueriesOnContractTransaction(REFETCH_QUERY_KEYS, mutation.data);

  return mutation;
}
