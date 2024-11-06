'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WithChildren } from '@vertex-protocol/web-common';
import {
  mainnet,
  arbitrum,
  arbitrumSepolia,
  base,
  baseSepolia,
  blast,
  blastSepolia,
  mantle,
  mantleSepoliaTestnet,
  sei,
  seiTestnet,
  Chain,
} from 'viem/chains';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  EVMContextProvider,
  VertexClientContextProvider,
} from '@vertex-protocol/react-client';
import { VertexMetadataContextProvider } from '@vertex-protocol/metadata';
import { ChainEnv } from '@vertex-protocol/client';
import { LocationRestrictedDialog } from 'client/components/LocationRestrictedDialog';
import { useState } from 'react';

const queryClient = new QueryClient();

const DEFAULT_PRIMARY_CHAIN_ENV = 'arbitrum' as ChainEnv;

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
  mainnet,
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
  const [primaryChainEnv, setPrimaryChainEnv] = useState(
    DEFAULT_PRIMARY_CHAIN_ENV,
  );

  return (
    <QueryClientProvider client={queryClient}>
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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
