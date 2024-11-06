import { useMutation } from '@tanstack/react-query';
import { EngineMintLpParams } from '@vertex-protocol/client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import {
  MAX_SIZE_QUERY_KEYS,
  SUBACCOUNT_SUMMARY_QUERY_KEYS,
} from 'client/hooks/execute/util/refetchQueryKeys';
import {
  useExecuteInValidContext,
  ValidExecuteContext,
} from 'client/hooks/execute/util/useExecuteInValidContext';
import { useRefetchQueries } from 'client/hooks/execute/util/useRefetchQueries';
import { currentSubaccountPaginatedLpEventsQueryKey } from 'client/hooks/query/subaccount/useSubaccountPaginatedLpEvents';
import { useCallback } from 'react';

const REFETCH_QUERY_KEYS = [
  ...SUBACCOUNT_SUMMARY_QUERY_KEYS,
  ...MAX_SIZE_QUERY_KEYS,
  currentSubaccountPaginatedLpEventsQueryKey(),
];

export function useExecuteMintLp() {
  const refetchQueries = useRefetchQueries(REFETCH_QUERY_KEYS);
  const {
    currentSubaccount: { name: currentSubaccountName },
  } = useSubaccountContext();

  const mutationFn = useExecuteInValidContext(
    useCallback(
      async (
        params: Pick<
          EngineMintLpParams,
          | 'amountBase'
          | 'quoteAmountHigh'
          | 'quoteAmountLow'
          | 'productId'
          | 'spotLeverage'
        >,
        context: ValidExecuteContext,
      ) => {
        console.log('Minting LP', params);
        return context.vertexClient.market.mintLp({
          subaccountName: currentSubaccountName,
          ...params,
        });
      },
      [currentSubaccountName],
    ),
  );

  return useMutation({
    mutationFn,
    onSuccess() {
      refetchQueries();
    },
    onError(error, variables) {
      logExecuteError('MintLp', error, variables);
    },
  });
}
