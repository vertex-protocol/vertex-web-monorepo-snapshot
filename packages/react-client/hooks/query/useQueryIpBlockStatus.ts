import { useQuery } from '@tanstack/react-query';
import { usePrimaryChainVertexClient } from '../../context';
import { QueryDisabledError } from '../../utils';

export function useQueryIpBlockStatus() {
  const vertexClient = usePrimaryChainVertexClient();

  const disabled = !vertexClient;

  return useQuery({
    queryKey: ['ipBlockStatus'],
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }
      return vertexClient.context.engineClient.getIpBlockStatus();
    },
    enabled: !disabled,
  });
}
