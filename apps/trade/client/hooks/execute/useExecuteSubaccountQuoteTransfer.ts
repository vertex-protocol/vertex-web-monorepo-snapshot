import { useMutation } from '@tanstack/react-query';
import { TransferQuoteParams } from '@vertex-protocol/client';
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
import { appSubaccountSummariesQueryKey } from 'client/hooks/query/subaccount/useAppSubaccountSummaries';
import { listSubaccountsQueryKey } from 'client/hooks/query/subaccount/useListSubaccounts';
import { subaccountCreationTimeQueryKey } from 'client/hooks/query/subaccount/useSubaccountCreationTime';
import { subaccountPaginatedCollateralEventsQueryKey } from 'client/hooks/query/subaccount/useSubaccountPaginatedCollateralEvents';
import { subaccountReferralCodeQueryKey } from 'client/hooks/query/subaccount/useSubaccountReferralCode';
import { SubaccountSigningPreference } from 'client/modules/singleSignatureSessions/types';
import { useCallback } from 'react';

const REFETCH_QUERY_KEYS = [
  subaccountCreationTimeQueryKey(),
  subaccountReferralCodeQueryKey(),
  listSubaccountsQueryKey(),
  appSubaccountSummariesQueryKey(),
  subaccountPaginatedCollateralEventsQueryKey(),
  ...SUBACCOUNT_SUMMARY_QUERY_KEYS,
  ...MAX_SIZE_QUERY_KEYS,
];

interface MutationFnParams
  extends Pick<
    TransferQuoteParams,
    'subaccountName' | 'recipientSubaccountName' | 'amount'
  > {
  senderSigningPreference: SubaccountSigningPreference | undefined;
}

export function useExecuteSubaccountQuoteTransfer() {
  const mutationFn = useExecuteInValidContext(
    useCallback(
      async (params: MutationFnParams, context: ValidExecuteContext) => {
        console.log('Initiating subaccount quote transfer', params);

        // This is a hack, but we need a way to pass the saved linked signer
        // (or `null` if there is none) for the sender subaccont when it's not
        // the current subaccount.
        //
        // So here, we grab the saved linked signer for the sender and set it
        // manually, which also allows us to avoid `LinkedSignerSync` from running.
        // Then, after the transfer, we set it back to the current subaccount's.
        //
        // If the sender is the current subaccount, it's basically a no-op.
        const currentLinkedSigner = context.vertexClient.context.linkedSigner;
        context.vertexClient.setLinkedSigner(
          getAuthorizedWallet(params.senderSigningPreference),
        );

        try {
          return await context.vertexClient.subaccount.transferQuote(params);
        } catch (e) {
          throw e;
        } finally {
          context.vertexClient.setLinkedSigner(currentLinkedSigner ?? null);
        }
      },
      [],
    ),
  );

  const refetchQueries = useRefetchQueries(REFETCH_QUERY_KEYS);

  const mutation = useMutation({
    mutationFn,
    onSuccess() {
      refetchQueries();
    },
    onError(error, variables) {
      logExecuteError('QuoteTransfer', error, variables);
    },
  });

  return mutation;
}

function getAuthorizedWallet(
  signingPreference: SubaccountSigningPreference | undefined,
) {
  if (signingPreference?.type === 'sign_once') {
    return signingPreference.authorizedWallet ?? null;
  }

  return null;
}
