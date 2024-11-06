import { usePrimaryChainVertexClient } from '@vertex-protocol/react-client';
import { useMarket } from 'client/hooks/markets/useMarket';
import { useTokenAllowance } from 'client/hooks/query/useTokenAllowance';
import { AnnotatedSpotMarket } from '@vertex-protocol/metadata';

interface Params {
  productId: number | undefined;
}

/**
 * Retrieves the token allowance for a Vertex product
 *
 * @param productId
 */
export function useTokenAllowanceForProduct({ productId }: Params) {
  const vertexClient = usePrimaryChainVertexClient();
  const { data: market } = useMarket<AnnotatedSpotMarket>({ productId });

  const spenderAddress = vertexClient?.context.contractAddresses.endpoint;

  return useTokenAllowance({
    tokenAddress: market?.product.tokenAddr,
    spenderAddress,
  });
}
