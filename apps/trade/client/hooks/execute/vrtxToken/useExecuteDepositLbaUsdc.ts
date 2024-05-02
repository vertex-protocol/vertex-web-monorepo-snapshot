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
import { tokenAllowanceQueryKey } from 'client/hooks/query/useTokenAllowance';

const REFETCH_QUERY_KEYS: string[][] = [
  tokenAllowanceQueryKey(),
  lbaStateQueryKey(),
  lbaTokenWalletBalancesQueryKey(),
  accountLbaStateQueryKey(),
  allDepositableTokenBalancesQueryKey(),
];

/**
 * Deposit USDC into the LBA pool
 */
export function useExecuteDepositLbaUsdc() {
  const mutationFn = useExecuteInValidContext(
    useCallback(
      async (params: VrtxTokenAmountParams, context: ValidExecuteContext) => {
        console.log('Depositing LBA USDC', params);
        return context.vertexClient.rewards.depositLbaUsdc(params);
      },
      [],
    ),
  );

  const mutation = useMutation({
    mutationFn,
    onError(error, variables) {
      logExecuteError('DepositLbaUsdc', error, variables);
    },
  });

  useRefetchQueriesOnContractTransaction(REFETCH_QUERY_KEYS, mutation.data);

  return mutation;
}
