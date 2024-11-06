import { useVertexMetadataContext } from '@vertex-protocol/metadata';
import { useEVMContext } from '@vertex-protocol/react-client';
import { startCase } from 'lodash';
import { useCallback } from 'react';

/**
 * Util hook for setting the chainenv to the protocol token chain, where rewards, staking, etc. occur.
 * In prod, this would be Arbitrum for VRTX
 */
export function useSwitchToProtocolTokenChainEnv() {
  const { protocolTokenMetadata } = useVertexMetadataContext();
  const { primaryChainEnv, setPrimaryChainEnv } = useEVMContext();

  const protocolTokenChainName = startCase(protocolTokenMetadata.chain.name);
  const isOnProtocolTokenChainEnv =
    primaryChainEnv === protocolTokenMetadata.chainEnv;

  const switchToProtocolTokenChainEnv = useCallback(() => {
    setPrimaryChainEnv(protocolTokenMetadata.chainEnv);
  }, [protocolTokenMetadata.chainEnv, setPrimaryChainEnv]);

  return {
    isOnProtocolTokenChainEnv,
    protocolTokenChainName,
    switchToProtocolTokenChainEnv,
    protocolTokenMetadata,
  };
}
