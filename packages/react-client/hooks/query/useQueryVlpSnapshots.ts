import { useQuery } from '@tanstack/react-query';
import { QueryDisabledError } from '../../utils';
import { usePrimaryChainVertexClient } from '../../context';

interface Params {
  granularity: number;
  limit: number;
  maxTimeInclusive?: number;
}

export function useQueryVlpSnapshots({
  granularity,
  limit,
  maxTimeInclusive,
}: Params) {
  const vertexClient = usePrimaryChainVertexClient();

  const disabled = !vertexClient;

  return useQuery({
    queryKey: ['vlpSnapshots', granularity, limit, maxTimeInclusive],
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      return vertexClient.context.indexerClient.getVlpSnapshots({
        granularity,
        limit,
        maxTimeInclusive,
      });
    },
    enabled: !disabled,
  });
}
