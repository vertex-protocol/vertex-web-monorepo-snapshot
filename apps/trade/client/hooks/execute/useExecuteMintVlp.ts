import { useMutation } from '@tanstack/react-query';
import { MintVlpParams } from '@vertex-protocol/client';
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
import { currentSubaccountPaginatedVlpEventsQueryKey } from 'client/hooks/query/subaccount/useSubaccountPaginatedVlpEvents';
import { useCallback } from 'react';

const REFETCH_QUERY_KEYS = [
  ...SUBACCOUNT_SUMMARY_QUERY_KEYS,
  ...MAX_SIZE_QUERY_KEYS,
  currentSubaccountPaginatedVlpEventsQueryKey(),
];

export function useExecuteMintVlp() {
  const refetchQueries = useRefetchQueries(REFETCH_QUERY_KEYS);

  const mutationFn = useExecuteInValidContext(
    useCallback(
      async (
        params: Omit<MintVlpParams, 'subaccountName'>,
        context: ValidExecuteContext,
      ) => {
        console.log('Minting VLP', params);
        return context.vertexClient.spot.mintVlp({
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
      logExecuteError('MintVlp', error, variables);
    },
  });
}
