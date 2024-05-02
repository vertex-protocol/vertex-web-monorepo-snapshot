import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { useVertexClient } from '@vertex-protocol/web-data';
import { useTokenAllowance } from 'client/hooks/query/useTokenAllowance';

/**
 * Queries USDC allowance for the LBA contract
 */
export function useLbaUsdcAllowance() {
  const { primaryQuoteToken } = useVertexMetadataContext();
  const vertexClient = useVertexClient();

  return useTokenAllowance({
    spenderAddress: vertexClient?.context.contractAddresses.vrtxLba,
    tokenAddress: primaryQuoteToken.address,
  });
}
