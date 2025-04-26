import { useMutation } from '@tanstack/react-query';
import { ERC20_ABI } from '@vertex-protocol/client';
import { getValidatedAddress, toPrintableObject } from '@vertex-protocol/utils';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import {
  useExecuteInValidContext,
  ValidExecuteContext,
} from 'client/hooks/execute/util/useExecuteInValidContext';
import { useRefetchQueriesOnContractTransaction } from 'client/hooks/execute/util/useRefetchQueries';
import { tokenAllowanceQueryKey } from 'client/hooks/query/useTokenAllowance';
import { useCallback, useRef } from 'react';

interface Params {
  /**
   * Includes decimals
   */
  amount: bigint;
  /**
   * Address that wants to receive/spend the token
   */
  spenderAddress: string;
  /**
   * Address of the ERC20 token to approve
   */
  tokenAddress: string;
}

/**
 * A generic hook for approving an allowance for a token
 */
export function useExecuteApproveAllowance() {
  // Default the query key to the most generic "catch-all", this ref should be updated during the mutation
  const refetchQueryKeysRef = useRef<string[][]>([tokenAllowanceQueryKey()]);

  const mutationFn = useExecuteInValidContext(
    useCallback(async (params: Params, context: ValidExecuteContext) => {
      console.log('Approve Allowance', toPrintableObject(params));

      refetchQueryKeysRef.current = [
        tokenAllowanceQueryKey(
          context.subaccount.chainEnv,
          context.subaccount.address,
          params.spenderAddress,
          params.tokenAddress,
        ),
      ];

      return context.walletClient.writeContract({
        abi: ERC20_ABI,
        functionName: 'approve',
        address: getValidatedAddress(params.tokenAddress),
        args: [getValidatedAddress(params.spenderAddress), params.amount],
      });
    }, []),
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
