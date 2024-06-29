import { useMutation } from '@tanstack/react-query';
import { ApproveAllowanceParams } from '@vertex-protocol/client';
import { toPrintableObject } from '@vertex-protocol/utils';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import {
  useExecuteInValidContext,
  ValidExecuteContext,
} from 'client/hooks/execute/util/useExecuteInValidContext';
import { useRefetchQueriesOnContractTransaction } from 'client/hooks/execute/util/useRefetchQueries';
import { tokenAllowanceQueryKey } from 'client/hooks/query/useTokenAllowance';
import { ContractTransactionResponse } from 'ethers';
import { useCallback, useRef } from 'react';

/**
 * Approve allowance for Vertex's Endpoint contract to spend a token corresponding to a spot product ID
 */
export function useExecuteApproveAllowanceForProduct() {
  // Default the query key to the most generic "catch-all", this ref should be updated during the mutation
  const refetchQueryKeysRef = useRef<string[][]>([tokenAllowanceQueryKey()]);

  const mutationFn = useExecuteInValidContext(
    useCallback(
      (
        params: ApproveAllowanceParams,
        context: ValidExecuteContext,
      ): Promise<ContractTransactionResponse> => {
        console.log('Approve Allowance for Product', toPrintableObject(params));

        refetchQueryKeysRef.current = [
          tokenAllowanceQueryKey(
            context.subaccount.chainId,
            context.subaccount.address,
            context.vertexClient.context.contractAddresses.endpoint,
            // Omit the token address as `params` contains a product ID, and it's a separate async call / query to retrieve the token address
            // This can be a point of future improvement
          ),
        ];

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

  useRefetchQueriesOnContractTransaction(
    refetchQueryKeysRef.current,
    mutation.data,
  );

  return mutation;
}
