import { VertexClient } from '@vertex-protocol/client';
import { usePrimaryChainVertexClient } from '@vertex-protocol/react-client';

export function useVertexClientHasLinkedSigner() {
  const vertexClient = usePrimaryChainVertexClient();

  return getVertexClientHasLinkedSigner(vertexClient);
}

/**
 * Trigger orders are only fetched when the client has a linked signer (i.e. single signature is active)
 * We shouldn't use `useIsSingleSignatureSession` as client creation is async, meaning that there's
 * going to be a slight mismatch between the state of the UI hook and the actual vertex client
 *
 * This function is extracted for use in query functions because of an issue with reactivity
 * More details: https://www.notion.so/vertexprotocol/Subaccount-Change-Race-Conditions-4201f0cbd97a44fdb587ddaf33639d80?pvs=4
 */
export function getVertexClientHasLinkedSigner(
  vertexClient: VertexClient | undefined,
) {
  return vertexClient?.context.linkedSigner != null;
}
