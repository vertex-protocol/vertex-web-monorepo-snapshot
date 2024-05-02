import { useMutation } from '@tanstack/react-query';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import {
  useExecuteInValidContext,
  ValidExecuteContext,
} from 'client/hooks/execute/util/useExecuteInValidContext';
import { useRefetchQueriesOnContractTransaction } from 'client/hooks/execute/util/useRefetchQueries';
import { useCallback } from 'react';
import { VrtxTokenAmountParams } from '@vertex-protocol/client';
import { lbaStateQueryKey } from 'client/hooks/query/vrtxToken/useLbaState';
import { lbaTokenWalletBalancesQueryKey } from 'client/hooks/query/vrtxToken/useLbaTokenWalletBalances';
import { accountLbaStateQueryKey } from 'client/hooks/query/vrtxToken/useAccountLbaState';
import { allDepositableTokenBalancesQueryKey } from 'client/hooks/query/subaccount/useAllDepositableTokenBalances';

const REFETCH_QUERY_KEYS: string[][] = [
  lbaStateQueryKey(),
  lbaTokenWalletBalancesQueryKey(),
  accountLbaStateQueryKey(),
  allDepositableTokenBalancesQueryKey(),
];

/**
 * Withdraw USDC from the LBA pool
 */
export function useExecuteWithdrawLbaUsdc() {
  const mutationFn = useExecuteInValidContext(
    useCallback(
      async (params: VrtxTokenAmountParams, context: ValidExecuteContext) => {
        console.log('Withdrawing LBA USDC', params);
        return context.vertexClient.rewards.withdrawLbaUsdc(params);
      },
      [],
    ),
  );

  const mutation = useMutation({
    mutationFn,
    onError(error, variables) {
      logExecuteError('WithdrawLbaUsdc', error, variables);
    },
  });

  useRefetchQueriesOnContractTransaction(REFETCH_QUERY_KEYS, mutation.data);

  return mutation;
}
