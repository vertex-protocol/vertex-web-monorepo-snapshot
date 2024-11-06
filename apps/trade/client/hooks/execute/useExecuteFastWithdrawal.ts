import { useMutation } from '@tanstack/react-query';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import {
  useExecuteInValidContext,
  ValidExecuteContext,
} from 'client/hooks/execute/util/useExecuteInValidContext';
import { useRefetchQueriesOnContractTransaction } from 'client/hooks/execute/util/useRefetchQueries';
import { subaccountPaginatedCollateralEventsQueryKey } from 'client/hooks/query/subaccount/useSubaccountPaginatedCollateralEvents';
import { allProductsWithdrawPoolLiquidityQueryKey } from 'client/hooks/query/withdrawPool/useAllProductsWithdrawPoolLiquidity';
import { markedWithdrawPoolIdxsQueryKey } from 'client/hooks/query/withdrawPool/useMarkedWithdrawPoolIdxs';
import { ContractTransactionResponse } from 'ethers';
import { useCallback } from 'react';

const REFETCH_QUERY_KEYS = [
  subaccountPaginatedCollateralEventsQueryKey(),
  markedWithdrawPoolIdxsQueryKey(),
  allProductsWithdrawPoolLiquidityQueryKey(),
];

export function useExecuteFastWithdrawal() {
  const mutationFn = useExecuteInValidContext(
    useCallback(
      async (
        params: { submissionIndex: string },
        context: ValidExecuteContext,
      ): Promise<ContractTransactionResponse> => {
        console.log('Fast Withdrawing', params);

        // There might be delay until the tx is signed (< 5s). This might fail before.
        const { idx, txBytes, signatures } =
          await context.vertexClient.context.indexerClient.getFastWithdrawalSignature(
            { idx: params.submissionIndex },
          );

        return context.vertexClient.context.contracts.withdrawPool.submitFastWithdrawal(
          idx,
          txBytes,
          signatures,
        );
      },
      [],
    ),
  );

  const mutation = useMutation({
    mutationFn,
    onError(error, variables) {
      logExecuteError('FastWithdrawal', error, variables);
    },
  });

  useRefetchQueriesOnContractTransaction(REFETCH_QUERY_KEYS, mutation.data);

  return mutation;
}
