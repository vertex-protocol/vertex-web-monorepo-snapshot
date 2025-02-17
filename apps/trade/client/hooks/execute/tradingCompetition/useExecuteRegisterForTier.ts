import { useMutation } from '@tanstack/react-query';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import {
  useExecuteInValidContext,
  ValidExecuteContext,
} from 'client/hooks/execute/util/useExecuteInValidContext';
import { useRefetchQueries } from 'client/hooks/execute/util/useRefetchQueries';
import { subaccountLeaderboardRegistrationStateKey } from 'client/hooks/query/tradingCompetition/useSubaccountLeaderboardRegistrationState';
import { useCallback } from 'react';

const REFETCH_QUERY_KEYS: string[][] = [
  subaccountLeaderboardRegistrationStateKey(),
];

interface Params {
  contestId: number;
}

export function useExecuteRegisterForTier() {
  const refetchQueries = useRefetchQueries(REFETCH_QUERY_KEYS);

  const mutationFn = useExecuteInValidContext(
    useCallback(async ({ contestId }: Params, context: ValidExecuteContext) => {
      return context.vertexClient.context.indexerClient.updateLeaderboardRegistration(
        {
          contestId,
          subaccountOwner: context.subaccount.address,
          subaccountName: context.subaccount.name,
          updateRegistration: {
            chainId: context.subaccount.chainId,
            verifyingAddr:
              context.vertexClient.context.contractAddresses.endpoint,
          },
        },
      );
    }, []),
  );

  const mutation = useMutation({
    mutationFn,
    onError(error, variables) {
      logExecuteError('RegisterForTier', error, variables);
    },
    onSuccess() {
      refetchQueries();
    },
  });

  return mutation;
}
