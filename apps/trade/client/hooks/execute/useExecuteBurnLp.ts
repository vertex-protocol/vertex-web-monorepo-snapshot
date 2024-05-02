import { useMutation } from '@tanstack/react-query';
import { BurnLpParams } from '@vertex-protocol/client';
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

export function useExecuteBurnLp() {
  const refetchQueries = useRefetchQueries(REFETCH_QUERY_KEYS);

  const mutationFn = useExecuteInValidContext(
    useCallback(
      async (
        params: Pick<BurnLpParams, 'amount' | 'productId'>,
        context: ValidExecuteContext,
      ) => {
        console.log('Burning LP', params);
        const currentSubaccountName = context.subaccount.name;
        return context.vertexClient.market.burnLp({
          subaccountName: currentSubaccountName,
          ...params,
        });
      },
      [],
    ),
  );

  return useMutation({
    mutationFn,
    onError(error, variables) {
      logExecuteError('BurnLp', error, variables);
    },
    onSuccess() {
      refetchQueries();
    },
  });
}
