import { useVertexMetadataContext } from '@vertex-protocol/metadata';
import { useVertexClientForChainEnv } from '@vertex-protocol/react-client';
import { usePublicClient } from 'wagmi';

/**
 * Util hook to get the vertex and public clients for the protocol token chain.
 */
export function useProtocolTokenQueryClients() {
  const {
    protocolTokenMetadata: { chain, chainEnv },
  } = useVertexMetadataContext();
  const vertexClient = useVertexClientForChainEnv(chainEnv);
  const publicClient = usePublicClient({
    chainId: chain.id,
  });

  return {
    vertexClient,
    publicClient,
  };
}
