import { useVertexClient } from '@vertex-protocol/web-data';
import { AnnotatedSpotMarket } from 'common/productMetadata/types';
import { useMarket } from 'client/hooks/markets/useMarket';
import { useTokenAllowance } from 'client/hooks/query/useTokenAllowance';

interface Params {
  productId?: number;
}

export function useDepositTokenAllowance({ productId }: Params) {
  const vertexClient = useVertexClient();
  const { data: market } = useMarket<AnnotatedSpotMarket>({ productId });

  const spenderAddress = vertexClient?.context.contractAddresses.endpoint;

  return useTokenAllowance({
    tokenAddress: market?.product.tokenAddr,
    spenderAddress,
  });
}
