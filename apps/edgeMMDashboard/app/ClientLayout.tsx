'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  ChainEnv,
  MAINNET_CHAIN_ENVS,
  TESTNET_CHAIN_ENVS,
} from '@vertex-protocol/client';
import {
  EVMContextProvider,
  getPrimaryChain,
  useWagmiConfig,
  VertexClientContextProvider,
  VertexMetadataContextProvider,
} from '@vertex-protocol/react-client';
import { WithChildren } from '@vertex-protocol/web-common';
import { LocationRestrictedDialog } from 'client/components/LocationRestrictedDialog';
import { useState } from 'react';
import { Chain } from 'viem/chains';
import { WagmiProvider } from 'wagmi';

const queryClient = new QueryClient();

const DEFAULT_PRIMARY_CHAIN_ENV = 'arbitrum' as ChainEnv;

const SUPPORTED_CHAIN_ENVS: ChainEnv[] = [
  ...MAINNET_CHAIN_ENVS,
  ...TESTNET_CHAIN_ENVS,
];

const SUPPORTED_CHAINS: Chain[] = SUPPORTED_CHAIN_ENVS.map(getPrimaryChain);

export function ClientLayout({ children }: WithChildren) {
  const [primaryChainEnv, setPrimaryChainEnv] = useState(
    DEFAULT_PRIMARY_CHAIN_ENV,
  );

  const wagmiConfig = useWagmiConfig({ supportedChains: SUPPORTED_CHAINS });

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <EVMContextProvider
          supportedChainEnvs={SUPPORTED_CHAIN_ENVS}
          supportedChains={SUPPORTED_CHAINS}
          primaryChainEnv={primaryChainEnv}
          setPrimaryChainEnv={setPrimaryChainEnv}
        >
          <VertexClientContextProvider>
            <VertexMetadataContextProvider>
              {children}
              <LocationRestrictedDialog />
            </VertexMetadataContextProvider>
          </VertexClientContextProvider>
        </EVMContextProvider>
      </WagmiProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
