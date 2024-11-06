import { useQuery } from '@tanstack/react-query';

import { ChainEnv, HealthGroup } from '@vertex-protocol/contracts';
import {
  createQueryKey,
  QueryDisabledError,
  useEVMContext,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';

export function healthGroupsQueryKey(chainEnv?: ChainEnv) {
  return createQueryKey('healthGroups', chainEnv);
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
  const { primaryChainEnv } = useEVMContext();
  const vertexClient = usePrimaryChainVertexClient();
  const disabled = !vertexClient;

  return useQuery({
    queryKey: healthGroupsQueryKey(primaryChainEnv),
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
