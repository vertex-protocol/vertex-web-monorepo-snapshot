import { useMemo } from 'react';
import { WagmiConfigParams } from '../types';
import { getWagmiConfig } from '../utils';

export function useWagmiConfig({
  supportedChains,
  connectorOptions,
}: WagmiConfigParams) {
  return useMemo(() => {
    return getWagmiConfig({ supportedChains, connectorOptions });
  }, [connectorOptions, supportedChains]);
}
