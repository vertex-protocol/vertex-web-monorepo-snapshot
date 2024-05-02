import { useQuery } from '@tanstack/react-query';

import { HealthGroup } from '@vertex-protocol/contracts';
import {
  PrimaryChainID,
  createQueryKey,
  usePrimaryChainId,
  useVertexClient,
} from '@vertex-protocol/web-data';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';

export function healthGroupsQueryKey(chainId?: PrimaryChainID) {
  return createQueryKey('healthGroups', chainId);
}

interface Data {
  // Spot Product ID -> Perp Product ID
  spotToPerpProductId: Record<number, number>;
  // Perp Product ID -> Spot Product ID
  perpToSpotProductId: Record<number, number>;
  // All Health Groups
  healthGroups: HealthGroup[];
}

export function useHealthGroups() {
  const primaryChainId = usePrimaryChainId();
  const vertexClient = useVertexClient();
  const disabled = !vertexClient;

  return useQuery({
    queryKey: healthGroupsQueryKey(primaryChainId),
    queryFn: async (): Promise<Data> => {
      if (disabled) {
        throw new QueryDisabledError();
      }
      const healthGroups = (await vertexClient.market.getHealthGroups())
        .healthGroups;

      const spotToPerpProductId: Record<number, number> = {};
      const perpToSpotProductId: Record<number, number> = {};

      healthGroups.forEach((healthGroup) => {
        spotToPerpProductId[healthGroup.spotProductId] =
          healthGroup.perpProductId;
        perpToSpotProductId[healthGroup.perpProductId] =
          healthGroup.spotProductId;
      });

      return {
        spotToPerpProductId,
        perpToSpotProductId,
        healthGroups,
      };
    },
    enabled: !disabled,
    // Health groups rarely change
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
