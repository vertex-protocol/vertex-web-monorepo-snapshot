import { useQuery } from '@tanstack/react-query';
import { ChainEnv } from '@vertex-protocol/client';
import {
  createQueryKey,
  QueryDisabledError,
  useEVMContext,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';

function makerStatisticsQueryKey(
  chainEnv?: ChainEnv,
  productId?: number,
  epoch?: number,
  interval?: number,
) {
  return createQueryKey(
    'makerStatistics',
    chainEnv,
    productId,
    epoch,
    interval,
  );
}

interface Params {
  productId: number | undefined;
  epoch: number | undefined;
  interval: number;
}

export function useMakerStatistics({ productId, epoch, interval }: Params) {
  const { primaryChainEnv } = useEVMContext();
  const vertexClient = usePrimaryChainVertexClient();
  const disabled = !vertexClient || productId == null || !epoch;

  return useQuery({
    queryKey: makerStatisticsQueryKey(
      primaryChainEnv,
      productId,
      epoch,
      interval,
    ),
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }
      return vertexClient.context.indexerClient.getMakerStatistics({
        productId,
        epoch,
        interval,
      });
    },
    enabled: !disabled,
  });
}
