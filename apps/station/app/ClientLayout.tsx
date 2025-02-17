'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ChainEnv } from '@vertex-protocol/client';
import {
  EVMContextProvider,
  getPrimaryChain,
  useWagmiConfig,
  VertexClientContextProvider,
} from '@vertex-protocol/react-client';
import { useStorageAtom, WithChildren } from '@vertex-protocol/web-common';
import {
  DEFAULT_PRIMARY_CHAIN_ENV,
  primaryChainEnvAtom,
} from 'client/consts/store';
import { WagmiProvider } from 'wagmi';

const queryClient = new QueryClient();

const SUPPORTED_CHAIN_ENVS: ChainEnv[] = [
  // Mainnets
  'arbitrum',
  'mantle',
  'sei',
  'blast',
  'base',
  'abstract',
  // Testnets
  'arbitrumTestnet',
  'mantleTestnet',
  'seiTestnet',
  'blastTestnet',
  'baseTestnet',
  'sonicTestnet',
  'abstractTestnet',
];

const SUPPORTED_CHAINS = SUPPORTED_CHAIN_ENVS.map(getPrimaryChain);

export function ClientLayout({ children }: WithChildren) {
  const [savedPrimaryChainEnv, setSavedPrimaryChainEnv, didLoad] =
    useStorageAtom(primaryChainEnvAtom, DEFAULT_PRIMARY_CHAIN_ENV);

  // Prevent loading children until we've loaded the chain, otherwise a query will be fired on the default value before client load
  const content = (() => {
    if (!didLoad) {
      return null;
    }

    return children;
  })();

  const wagmiConfig = useWagmiConfig({ supportedChains: SUPPORTED_CHAINS });

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <EVMContextProvider
          supportedChainEnvs={SUPPORTED_CHAIN_ENVS}
          supportedChains={SUPPORTED_CHAINS}
          primaryChainEnv={savedPrimaryChainEnv}
          setPrimaryChainEnv={setSavedPrimaryChainEnv}
        >
          <VertexClientContextProvider>{content}</VertexClientContextProvider>
        </EVMContextProvider>
      </WagmiProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
