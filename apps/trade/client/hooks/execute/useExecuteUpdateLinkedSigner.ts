import { useMutation } from '@tanstack/react-query';
import { AccountWithPrivateKey } from '@vertex-protocol/client';
import { subaccountToHex } from '@vertex-protocol/contracts';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import {
  useExecuteInValidContext,
  ValidExecuteContext,
} from 'client/hooks/execute/util/useExecuteInValidContext';
import { useRefetchQueries } from 'client/hooks/execute/util/useRefetchQueries';
import { subaccountLinkedSignerQueryKey } from 'client/hooks/query/subaccount/useSubaccountLinkedSigner';
import { useCallback } from 'react';
import { zeroAddress } from 'viem';

const REFETCH_QUERY_KEYS = [subaccountLinkedSignerQueryKey()];

interface Params {
  // If revoking, the linked signer will be removed and set to zero address
  revoke: boolean;
}

// Returns the linked signer if authorizing, returns undefined if revoking
type Data = AccountWithPrivateKey | undefined;

export function useExecuteUpdateLinkedSigner() {
  const refetchQueries = useRefetchQueries(REFETCH_QUERY_KEYS);

  const mutationFn = useExecuteInValidContext(
    useCallback(
      async (params: Params, context: ValidExecuteContext): Promise<Data> => {
        // Query the current linked signer, if this matches with the account, then skip authorization
        const currentLinkedSigner =
          await context.vertexClient.subaccount.getSubaccountLinkedSignerWithRateLimit(
            {
              subaccount: {
                subaccountOwner: context.subaccount.address,
                subaccountName: context.subaccount.name,
              },
            },
          );
        const currentLinkedSignerAddress =
          currentLinkedSigner.signer.toLowerCase();

        /**
         * Revoke
         */

        if (params.revoke) {
          if (currentLinkedSignerAddress === zeroAddress) {
            console.debug(
              '[useExecuteCreateLinkedSigner] Skipping revoke, linked signer is zero address',
            );
            return;
          }

          await context.vertexClient.subaccount.linkSigner({
            signer: subaccountToHex({
              subaccountOwner: zeroAddress,
              subaccountName: '',
            }),
            subaccountName: context.subaccount.name,
          });

          return;
        }

        /**
         * Authorize new linked signer
         */

        // Create the linked signer, this requires a signature
        const standardLinkedSigner =
          await context.vertexClient.subaccount.createStandardLinkedSigner(
            context.subaccount.name,
          );

        if (
          currentLinkedSignerAddress ===
          standardLinkedSigner.account.address.toLowerCase()
        ) {
          console.debug(
            '[useExecuteCreateLinkedSigner] Skipping authorization, linked signer already matches',
          );
          return standardLinkedSigner;
        }

        // Authorize the linked signer
        await context.vertexClient.subaccount.linkSigner({
          signer: subaccountToHex({
            subaccountOwner: standardLinkedSigner.account.address,
            subaccountName: '',
          }),
          subaccountName: context.subaccount.name,
        });

        return standardLinkedSigner;
      },
      [],
    ),
  );

  const mutation = useMutation({
    mutationFn,
    onSuccess() {
      refetchQueries();
    },
    onError(error, variables) {
      logExecuteError('CreateLinkedSigner', error, variables);
    },
  });

  return mutation;
}
