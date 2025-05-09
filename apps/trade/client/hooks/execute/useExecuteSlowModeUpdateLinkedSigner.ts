import { useMutation } from '@tanstack/react-query';
import { getVertexEIP712Values } from '@vertex-protocol/client';
import { subaccountToHex } from '@vertex-protocol/contracts';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import {
  useExecuteInValidContext,
  ValidExecuteContext,
} from 'client/hooks/execute/util/useExecuteInValidContext';
import { useRefetchQueriesOnContractTransaction } from 'client/hooks/execute/util/useRefetchQueries';
import { subaccountLinkedSignerQueryKey } from 'client/hooks/query/subaccount/useSubaccountLinkedSigner';
import { useCallback } from 'react';
import {
  Account,
  encodeAbiParameters,
  encodePacked,
  parseAbiParameters,
  zeroAddress,
} from 'viem';

const REFETCH_QUERY_KEYS = [subaccountLinkedSignerQueryKey()];

interface Params {
  // If null, the linked signer will be removed and set to zero address
  account: Account | null;
}

// If an on-chain (slow-mode) tx is executed, returns the tx hash
type Data = string | undefined;

export function useExecuteSlowModeUpdateLinkedSigner() {
  const mutationFn = useExecuteInValidContext(
    useCallback(
      async (
        { account }: Params,
        context: ValidExecuteContext,
      ): Promise<Data> => {
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
        const newLinkedSignerAddress =
          account?.address.toLowerCase() ?? zeroAddress;

        if (currentLinkedSignerAddress === newLinkedSignerAddress) {
          // No on-chain transaction is needed
          return;
        }

        const tx = getVertexEIP712Values('link_signer', {
          nonce: await context.vertexClient.context.engineClient.getTxNonce(),
          subaccountName: context.subaccount.name,
          subaccountOwner: context.subaccount.address,
          signer: subaccountToHex({
            subaccountOwner: newLinkedSignerAddress,
            subaccountName: '',
          }),
        });

        const encodedTx = encodeAbiParameters(
          // Sender, signer, nonce
          parseAbiParameters('bytes32, bytes32, uint64'),
          [tx.sender, tx.signer, BigInt(tx.nonce)],
        );
        const encodedSlowModeTx = encodePacked(
          ['uint8', 'bytes'],
          [
            // Link signer transaction enum value
            19,
            encodedTx,
          ],
        );

        return context.vertexClient.context.contracts.endpoint.write.submitSlowModeTransaction(
          [encodedSlowModeTx],
        );
      },
      [],
    ),
  );

  const mutation = useMutation({
    mutationFn,
    onError(error, variables) {
      logExecuteError('SlowModeUpdateLinkedSigner', error, variables);
    },
  });

  useRefetchQueriesOnContractTransaction(
    REFETCH_QUERY_KEYS,
    mutation.data,
    // Use a long timeout here because the backend needs to pick up the on-chain transaction
    10000,
  );

  return mutation;
}
