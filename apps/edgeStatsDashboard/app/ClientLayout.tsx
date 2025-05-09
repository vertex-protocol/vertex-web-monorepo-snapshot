'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  MAINNET_CHAIN_ENVS,
  TESTNET_CHAIN_ENVS,
} from '@vertex-protocol/client';
import {
  EVMContextProvider,
  getPrimaryChain,
  REACT_QUERY_CONFIG,
  useWagmiConfig,
  VertexClientContextProvider,
  VertexMetadataContextProvider,
} from '@vertex-protocol/react-client';
import { WithChildren } from '@vertex-protocol/web-common';
import { LocationRestrictedDialog } from 'client/components/LocationRestrictedDialog';
import { DataEnv } from 'client/types';
import { Provider as JotaiProvider } from 'jotai';
import { noop } from 'lodash';
import { Chain } from 'viem/chains';
import { WagmiProvider } from 'wagmi';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: REACT_QUERY_CONFIG.defaultQueryStaleTime,
    },
  },
});

const { supportedChains, supportedChainEnvs } = (() => {
  const dataEnv = (process.env.NEXT_PUBLIC_DATA_ENV ?? 'testnet') as DataEnv;

  const supportedChainEnvs =
    dataEnv === 'mainnet' ? MAINNET_CHAIN_ENVS : TESTNET_CHAIN_ENVS;

  const supportedChains: Chain[] = supportedChainEnvs.map(getPrimaryChain);

  return {
    supportedChains,
    supportedChainEnvs,
  };
})();

export function ClientLayout({ children }: WithChildren) {
  const wagmiConfig = useWagmiConfig({ supportedChains, supportedChainEnvs });

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <EVMContextProvider
          supportedChainEnvs={supportedChainEnvs}
          supportedChains={supportedChains}
          primaryChainEnv={supportedChainEnvs[0]}
          setPrimaryChainEnv={noop}
        >
          <VertexClientContextProvider>
            <VertexMetadataContextProvider>
              <JotaiProvider>
                {children}
                <LocationRestrictedDialog />
              </JotaiProvider>
            </VertexMetadataContextProvider>
          </VertexClientContextProvider>
        </EVMContextProvider>
      </WagmiProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
