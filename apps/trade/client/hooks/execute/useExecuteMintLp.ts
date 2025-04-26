import { useMutation } from '@tanstack/react-query';
import { MintLpParams } from '@vertex-protocol/client/src/apis/market/types';
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

  const mutationFn = useExecuteInValidContext(
    useCallback(
      async (
        params: Omit<MintLpParams, 'subaccountName'>,
        context: ValidExecuteContext,
      ) => {
        console.log('Minting LP', params);
        return context.vertexClient.market.mintLp({
          subaccountName: context.subaccount.name,
          ...params,
        });
      },
      [],
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
