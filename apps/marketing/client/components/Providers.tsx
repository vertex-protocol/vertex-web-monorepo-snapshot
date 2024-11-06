'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ChainEnv } from '@vertex-protocol/client';
import {
  EVMContextProvider,
  VertexClientContextProvider,
} from '@vertex-protocol/react-client';
import { WithChildren } from '@vertex-protocol/web-common';
import { Provider as JotaiProvider } from 'jotai';
import { noop } from 'lodash';
import { arbitrum, base, mantle, sei } from 'wagmi/chains';

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
  'base',
  'sei',
] satisfies ChainEnv[];

const SUPPORTED_CHAINS = [arbitrum, mantle, base, sei];

/**
 * Wrapper component for all context providers, used in the root layout.
 */
export function Providers({ children }: WithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <EVMContextProvider
        primaryChainEnv="arbitrum"
        supportedChainEnvs={SUPPORTED_CHAIN_ENVS}
        supportedChains={SUPPORTED_CHAINS}
        setPrimaryChainEnv={noop}
      >
        <VertexClientContextProvider>
          <JotaiProvider>{children}</JotaiProvider>
        </VertexClientContextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </EVMContextProvider>
    </QueryClientProvider>
  );
}
