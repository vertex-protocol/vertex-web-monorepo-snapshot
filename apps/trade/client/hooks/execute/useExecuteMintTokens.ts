import { useMutation } from '@tanstack/react-query';
import { QUOTE_PRODUCT_ID } from '@vertex-protocol/contracts';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import { useRefetchQueriesOnContractTransaction } from 'client/hooks/execute/util/useRefetchQueries';
import { allDepositableTokenBalancesQueryKey } from 'client/hooks/query/subaccount/useAllDepositableTokenBalances';
import { addDecimals } from 'client/utils/decimalAdjustment';
import { roundToString } from 'client/utils/rounding';
import { useCallback } from 'react';

import {
  useExecuteInValidContext,
  ValidExecuteContext,
} from './util/useExecuteInValidContext';

const REFETCH_QUERY_KEYS = [allDepositableTokenBalancesQueryKey()];

export function useExecuteMintTokens({ decimals }: { decimals: number }) {
  const mutationFn = useExecuteInValidContext(
    useCallback(
      async (params: { productId: number }, context: ValidExecuteContext) => {
        const amount = params.productId === QUOTE_PRODUCT_ID ? 95 : 10;
        return context.vertexClient.spot._mintMockERC20({
          productId: params.productId,
          amount: roundToString(addDecimals(amount, decimals), 0),
        });
      },
      [decimals],
    ),
  );

  const mutation = useMutation({
    mutationFn,
    onError(error, variables) {
      logExecuteError('MintTokens', error, variables);
    },
  });

  useRefetchQueriesOnContractTransaction(REFETCH_QUERY_KEYS, mutation.data);

  return mutation;
}
