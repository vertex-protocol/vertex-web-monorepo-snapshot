'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChainEnv } from '@vertex-protocol/client';
import {
  EVMContextProvider,
  useWagmiConfig,
  VertexClientContextProvider,
} from '@vertex-protocol/react-client';
import { GoogleAnalytics, WithChildren } from '@vertex-protocol/web-common';
import { useEdgeCookiePreference } from 'hooks/useEdgeCookiePreference';
import { noop } from 'lodash';
import { arbitrum } from 'viem/chains';
import { WagmiProvider } from 'wagmi';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time determines when a new component mount should trigger a refresh. By default this is 0,
      // which results in repeated fetches if a query is used in multiple components.
      // We usually specify query refreshes manually, so we set this to a higher value to avoid unnecessary fetches.
      staleTime: 30000,
    },
  },
});

const SUPPORTED_CHAIN_ENVS = ['arbitrum'] satisfies ChainEnv[];

const SUPPORTED_CHAINS = [arbitrum];

export function ClientLayout({ children }: WithChildren) {
  const { areCookiesAccepted } = useEdgeCookiePreference();

  const wagmiConfig = useWagmiConfig({ supportedChains: SUPPORTED_CHAINS });

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <EVMContextProvider
          primaryChainEnv="arbitrum"
          setPrimaryChainEnv={noop}
          supportedChainEnvs={SUPPORTED_CHAIN_ENVS}
          supportedChains={SUPPORTED_CHAINS}
        >
          <VertexClientContextProvider>
            <GoogleAnalytics areCookiesAccepted={areCookiesAccepted} gtmId="" />
            {children}
          </VertexClientContextProvider>
        </EVMContextProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}
