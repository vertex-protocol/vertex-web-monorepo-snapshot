import { ChainEnv } from '@vertex-protocol/client';
import { WithChildren } from '@vertex-protocol/web-common';
import { useMemo } from 'react';
import { WagmiProvider } from 'wagmi';
import { CoreEVMContextProvider } from './CoreEVMContextProvider';
import { EVMContextParams } from './types';
import { getWagmiConfig } from './utils';

interface Props extends WithChildren, EVMContextParams {
  // This defaults to the first supported chain env if not provided
  primaryChainEnv: ChainEnv | undefined;
  setPrimaryChainEnv: (chainEnv: ChainEnv) => void;
}

export function EVMContextProvider({
  supportedChainEnvs,
  primaryChainEnv: basePrimaryChainEnv,
  setPrimaryChainEnv,
  supportedChains,
  connectorOptions,
  children,
}: Props) {
  const primaryChainEnv = useMemo((): ChainEnv => {
    // Failsafe check - if localstorage has an invalid value, just default to the first supported env
    if (
      basePrimaryChainEnv &&
      supportedChainEnvs.includes(basePrimaryChainEnv)
    ) {
      return basePrimaryChainEnv;
    }
    return supportedChainEnvs[0];
  }, [basePrimaryChainEnv, supportedChainEnvs]);

  const wagmiConfig = useMemo(() => {
    return getWagmiConfig({
      supportedChains,
      connectorOptions,
    });
  }, [connectorOptions, supportedChains]);

  return (
    <WagmiProvider config={wagmiConfig}>
      <CoreEVMContextProvider
        supportedChains={supportedChains}
        primaryChainEnv={primaryChainEnv}
        setPrimaryChainEnv={setPrimaryChainEnv}
      >
        {children}
      </CoreEVMContextProvider>
    </WagmiProvider>
  );
}
