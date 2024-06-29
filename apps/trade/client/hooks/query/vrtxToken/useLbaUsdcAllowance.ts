import { usePrimaryChainVertexClient } from '@vertex-protocol/react-client';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { useTokenAllowance } from 'client/hooks/query/useTokenAllowance';

/**
 * Queries USDC allowance for the LBA contract
 */
export function useLbaUsdcAllowance() {
  const { primaryQuoteToken } = useVertexMetadataContext();
  const vertexClient = usePrimaryChainVertexClient();

  return useTokenAllowance({
    spenderAddress: vertexClient?.context.contractAddresses.vrtxLba,
    tokenAddress: primaryQuoteToken.address,
  });
}
