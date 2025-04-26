import { useMutation } from '@tanstack/react-query';
import { useXrpContext } from 'client/context/xrp/XrpContext';
import { CreateXrpLinkedSignerParams, CreateXrpLinkedSignerResponse, } from 'server/createXrpLinkedSignerTypes';

/**
 * Mutation hook that requests a signed authorization from the current XRP wallet, then requests a private key from the `create-xrp-linked-signer` API route
 */
export function useExecuteCreateXrpLinkedSigner() {
  const { connectedConnector } = useXrpContext();
  return useMutation({
    mutationFn: async () => {
      if (!connectedConnector) {
        throw Error('No connected XRP wallet');
      }
      const signedAuthorization =
        await connectedConnector.getLinkedSignerAuthorization();

      const createLinkedSignerParams: CreateXrpLinkedSignerParams = {
        signedAuthorization,
      };
      const response = await fetch('/api/create-xrp-linked-signer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createLinkedSignerParams),
      });

      if (!response.ok) {
        console.error(
          '[useExecuteCreateXrpLinkedSigner] Failed to create linked signer',
          response,
        );
        throw new Error('Failed to create linked signer');
      }

      const responseData: CreateXrpLinkedSignerResponse = await response.json();

      return responseData.linkedSignerPrivateKey;
    },
  });
}
