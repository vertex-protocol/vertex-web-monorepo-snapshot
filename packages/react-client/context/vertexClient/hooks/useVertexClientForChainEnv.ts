import { ChainEnv } from '@vertex-protocol/client';
import { get } from 'lodash';
import { useVertexClientContext } from '../VertexClientContext';

/**
 * Returns the `client` for the passed in `chainEnv`.
 * Useful when you need to query with a chain env other than the primary.
 */
export function useVertexClientForChainEnv(chainEnv: ChainEnv) {
  const { vertexClientsByChainEnv } = useVertexClientContext();

  return get(vertexClientsByChainEnv, chainEnv, undefined)?.client;
}
