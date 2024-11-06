'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ChainEnv } from '@vertex-protocol/client';
import {
  EVMContextProvider,
  VertexClientContextProvider,
} from '@vertex-protocol/react-client';
import { useStorageAtom, WithChildren } from '@vertex-protocol/web-common';
import {
  DEFAULT_PRIMARY_CHAIN_ENV,
  primaryChainEnvAtom,
} from 'client/consts/store';
import {
  arbitrum,
  arbitrumSepolia,
  base,
  baseSepolia,
  blast,
  blastSepolia,
  Chain,
  mantle,
  mantleSepoliaTestnet,
  sei,
  seiTestnet,
} from 'viem/chains';

const queryClient = new QueryClient();

const SUPPORTED_CHAIN_ENVS: ChainEnv[] = [
  // Mainnets
  'arbitrum',
  'mantle',
  'sei',
  'blast',
  'base',
  // Testnets
  'arbitrumTestnet',
  'mantleTestnet',
  'seiTestnet',
  'blastTestnet',
  'baseTestnet',
];

const SUPPORTED_CHAINS: Chain[] = [
  // Mainnets
  arbitrum,
  mantle,
  sei,
  blast,
  base,
  // Testnets
  arbitrumSepolia,
  mantleSepoliaTestnet,
  seiTestnet,
  blastSepolia,
  baseSepolia,
];

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

  return (
    <QueryClientProvider client={queryClient}>
      <EVMContextProvider
        supportedChainEnvs={SUPPORTED_CHAIN_ENVS}
        supportedChains={SUPPORTED_CHAINS}
        primaryChainEnv={savedPrimaryChainEnv}
        setPrimaryChainEnv={setSavedPrimaryChainEnv}
      >
        <VertexClientContextProvider>{content}</VertexClientContextProvider>
      </EVMContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
