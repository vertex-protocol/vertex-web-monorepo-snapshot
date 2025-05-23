import { useMutation } from '@tanstack/react-query';
import { VrtxTokenAmountParams } from '@vertex-protocol/client';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import {
  useExecuteInValidContext,
  ValidExecuteContext,
} from 'client/hooks/execute/util/useExecuteInValidContext';
import { useRefetchQueriesOnContractTransaction } from 'client/hooks/execute/util/useRefetchQueries';
import { subaccountSummaryQueryKey } from 'client/hooks/query/subaccount/subaccountSummary/useSubaccountSummary';
import { accountLbaStateQueryKey } from 'client/hooks/query/vrtxToken/useAccountLbaState';
import { useCallback } from 'react';

const REFETCH_QUERY_KEYS: string[][] = [
  accountLbaStateQueryKey(),
  subaccountSummaryQueryKey(),
];

/**
 * After the LBA ends, withdraw any unlocked liquidity from the AMM
 */
export function useExecuteWithdrawLbaLiquidity() {
  const mutationFn = useExecuteInValidContext(
    useCallback(
      async (params: VrtxTokenAmountParams, context: ValidExecuteContext) => {
        console.log('Withdrawing LBA Liquidity', params);
        return context.vertexClient.rewards.withdrawLbaLiquidity(params);
      },
      [],
    ),
  );

  const mutation = useMutation({
    mutationFn,
    onError(error, variables) {
      logExecuteError('WithdrawLbaLiquidity', error, variables);
    },
  });

  useRefetchQueriesOnContractTransaction(REFETCH_QUERY_KEYS, mutation.data);

  return mutation;
}
