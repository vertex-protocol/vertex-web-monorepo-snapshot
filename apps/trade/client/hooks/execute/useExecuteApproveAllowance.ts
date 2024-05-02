import { useMutation } from '@tanstack/react-query';
import { ApproveAllowanceParams } from '@vertex-protocol/client';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import {
  useExecuteInValidContext,
  ValidExecuteContext,
} from 'client/hooks/execute/util/useExecuteInValidContext';
import { useRefetchQueriesOnContractTransaction } from 'client/hooks/execute/util/useRefetchQueries';
import { ContractTransactionResponse } from 'ethers';
import { useCallback } from 'react';
import { tokenAllowanceQueryKey } from 'client/hooks/query/useTokenAllowance';

const REFETCH_QUERY_KEYS = [tokenAllowanceQueryKey()];

export function useExecuteApproveAllowance() {
  const mutationFn = useExecuteInValidContext(
    useCallback(
      async (
        params: ApproveAllowanceParams,
        context: ValidExecuteContext,
      ): Promise<ContractTransactionResponse> => {
        return context.vertexClient.spot.approveAllowance(params);
      },
      [],
    ),
  );

  const mutation = useMutation({
    mutationFn,
    onError(error, variables) {
      logExecuteError('ApproveAllowance', error, variables);
    },
  });

  useRefetchQueriesOnContractTransaction(REFETCH_QUERY_KEYS, mutation.data);

  return mutation;
}
