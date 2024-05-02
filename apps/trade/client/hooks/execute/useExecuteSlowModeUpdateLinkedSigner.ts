import { useMutation } from '@tanstack/react-query';
import {
  useExecuteInValidContext,
  ValidExecuteContext,
} from 'client/hooks/execute/util/useExecuteInValidContext';
import { useRefetchQueriesOnContractTransaction } from 'client/hooks/execute/util/useRefetchQueries';
import { useCallback } from 'react';
import { subaccountLinkedSignerQueryKey } from 'client/hooks/query/subaccount/useSubaccountLinkedSigner';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import {
  AbiCoder,
  ContractTransactionResponse,
  getBytes,
  solidityPacked,
  Wallet,
  ZeroAddress,
} from 'ethers';
import { subaccountToHex } from '@vertex-protocol/contracts';
import { getVertexEIP712Values } from '@vertex-protocol/client';

const REFETCH_QUERY_KEYS = [subaccountLinkedSignerQueryKey()];

interface Params {
  // If null, the linked signer will be removed and set to zero address
  wallet: Wallet | null;
}

// If an on-chain (slow-mode) tx is executed, returns the tx receipt
type Data = ContractTransactionResponse | undefined;

export function useExecuteSlowModeUpdateLinkedSigner() {
  const mutationFn = useExecuteInValidContext(
    useCallback(
      async (
        { wallet }: Params,
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
          wallet?.address.toLowerCase() ?? ZeroAddress;

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

        const encodedTx = AbiCoder.defaultAbiCoder().encode(
          [
            // Sender
            'bytes32',
            // Signer
            'bytes32',
            // Nonce
            'uint64',
          ],
          [tx.sender, tx.signer, tx.nonce],
        );
        const encodedSlowModeTx = solidityPacked(
          ['uint8', 'bytes'],
          [
            // Link signer transaction enum value
            19,
            encodedTx,
          ],
        );
        return context.vertexClient.context.contracts.endpoint.submitSlowModeTransaction(
          getBytes(encodedSlowModeTx),
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
