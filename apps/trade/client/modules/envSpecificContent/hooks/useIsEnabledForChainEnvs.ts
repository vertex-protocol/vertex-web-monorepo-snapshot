import { ChainEnv } from '@vertex-protocol/client';
import { useEVMContext } from '@vertex-protocol/react-client';
import { useMemo } from 'react';

export function useIsEnabledForChainEnvs(enabledChainEnvs: ChainEnv[]) {
  const { primaryChainEnv } = useEVMContext();

  return useMemo(() => {
    return enabledChainEnvs.includes(primaryChainEnv);
    // Disabling since we don't want to force consumers to use a static constant for enabledChainEnvs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primaryChainEnv]);
}
