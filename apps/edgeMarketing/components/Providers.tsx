'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChainEnv } from '@vertex-protocol/client';
import {
  EVMContextProvider,
  VertexClientContextProvider,
} from '@vertex-protocol/react-client';
import { WithChildren } from '@vertex-protocol/web-common';
import { noop } from 'lodash';
import { arbitrum, base, blast, mantle, sei } from 'viem/chains';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time determines when a new component mount should trigger a refresh. By default this is 0,
      // which results in repeated fetches if a query is used in multiple components.
      staleTime: 5000,
    },
  },
});

const SUPPORTED_CHAIN_ENVS = [
  'arbitrum',
  'mantle',
  'blast',
  'base',
  'sei',
] satisfies ChainEnv[];

const SUPPORTED_CHAINS = [arbitrum, mantle, blast, base, sei];

/**
 * Wrapper component for all context providers, used in the root layout.
 */
export function Providers({ children }: WithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <EVMContextProvider
        primaryChainEnv="arbitrum"
        setPrimaryChainEnv={noop}
        supportedChainEnvs={SUPPORTED_CHAIN_ENVS}
        supportedChains={SUPPORTED_CHAINS}
      >
        <VertexClientContextProvider>{children}</VertexClientContextProvider>
      </EVMContextProvider>
    </QueryClientProvider>
  );
}
