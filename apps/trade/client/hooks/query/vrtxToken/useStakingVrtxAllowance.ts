import { useVertexClient } from '@vertex-protocol/web-data';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { useTokenAllowance } from 'client/hooks/query/useTokenAllowance';

/**
 * Queries VRTX allowance for the staking contract
 */
export function useStakingVrtxAllowance() {
  const vertexClient = useVertexClient();
  const { protocolToken } = useVertexMetadataContext();

  return useTokenAllowance({
    spenderAddress: vertexClient?.context.contractAddresses.vrtxStaking,
    tokenAddress: protocolToken.address,
  });
}
