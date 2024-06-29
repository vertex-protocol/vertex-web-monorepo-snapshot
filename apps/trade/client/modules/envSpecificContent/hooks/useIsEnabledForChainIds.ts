import {
  PrimaryChainID,
  usePrimaryChainId,
} from '@vertex-protocol/react-client';
import { useMemo } from 'react';

export function useIsEnabledForChainIds(enabledChainIds: PrimaryChainID[]) {
  const primaryChainId = usePrimaryChainId();

  return useMemo(() => {
    return enabledChainIds.some((chainId) => chainId === primaryChainId);
    // Disabling since we don't want to force consumers to use a static constant for enabledChainIds
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primaryChainId]);
}
