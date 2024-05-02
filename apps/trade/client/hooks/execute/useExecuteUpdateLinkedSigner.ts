import { useMutation } from '@tanstack/react-query';
import {
  useExecuteInValidContext,
  ValidExecuteContext,
} from 'client/hooks/execute/util/useExecuteInValidContext';
import { useRefetchQueries } from 'client/hooks/execute/util/useRefetchQueries';
import { useCallback } from 'react';
import { subaccountLinkedSignerQueryKey } from 'client/hooks/query/subaccount/useSubaccountLinkedSigner';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import { Wallet, ZeroAddress } from 'ethers';
import { subaccountToHex } from '@vertex-protocol/contracts';

const REFETCH_QUERY_KEYS = [subaccountLinkedSignerQueryKey()];

interface Params {
  // If revoking, the linked signer will be removed and set to zero address
  revoke: boolean;
}

// If a linked signer is authorized, returns the wallet. if revoking, returns undefined
type Data = Wallet | undefined;

export function useExecuteUpdateLinkedSigner() {
  const refetchQueries = useRefetchQueries(REFETCH_QUERY_KEYS);

  const mutationFn = useExecuteInValidContext(
    useCallback(
      async (params: Params, context: ValidExecuteContext): Promise<Data> => {
        // Query the current linked signer, if this matches with the wallet, then skip authorization
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
          if (currentLinkedSignerAddress === ZeroAddress) {
            console.debug(
              '[useExecuteCreateLinkedSigner] Skipping revoke, linked signer is zero address',
            );
            return;
          }

          await context.vertexClient.subaccount.linkSigner({
            signer: subaccountToHex({
              subaccountOwner: ZeroAddress,
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
        const linkedSignerWallet =
          await context.vertexClient.subaccount.createStandardLinkedSigner(
            context.subaccount.name,
          );
        if (
          currentLinkedSignerAddress ===
          linkedSignerWallet.address.toLowerCase()
        ) {
          console.debug(
            '[useExecuteCreateLinkedSigner] Skipping authorization, linked signer already matches',
          );
          return linkedSignerWallet;
        }

        // Authorize the linked signer
        await context.vertexClient.subaccount.linkSigner({
          signer: subaccountToHex({
            subaccountOwner: linkedSignerWallet.address,
            subaccountName: '',
          }),
          subaccountName: context.subaccount.name,
        });

        return linkedSignerWallet;
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
