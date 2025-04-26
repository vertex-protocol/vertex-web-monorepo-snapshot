'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChainEnv } from '@vertex-protocol/client';
import {
  EVMContextProvider,
  REACT_QUERY_CONFIG,
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
      staleTime: REACT_QUERY_CONFIG.defaultQueryStaleTime,
    },
  },
});

const SUPPORTED_CHAIN_ENVS = ['arbitrum'] satisfies ChainEnv[];

const SUPPORTED_CHAINS = [arbitrum];

export function ClientLayout({ children }: WithChildren) {
  const { areCookiesAccepted } = useEdgeCookiePreference();

  const wagmiConfig = useWagmiConfig({
    supportedChains: SUPPORTED_CHAINS,
    supportedChainEnvs: SUPPORTED_CHAIN_ENVS,
  });

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
