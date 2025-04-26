'use client';

import { TooltipProvider } from '@radix-ui/react-tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ChainEnv } from '@vertex-protocol/client';
import {
  EVMContextProvider,
  REACT_QUERY_CONFIG,
  useWagmiConfig,
  VertexClientContextProvider,
} from '@vertex-protocol/react-client';
import { GoogleAnalytics, WithChildren } from '@vertex-protocol/web-common';
import { AnalyticsContextProvider } from 'client/analytics/AnalyticsContextProvider';
import { useVertexCookiePreference } from 'client/hooks/useVertexCookiePreference';
import { SENSITIVE_DATA } from 'config/sensitiveData';
import { domAnimation, LazyMotion } from 'framer-motion';
import { Provider as JotaiProvider } from 'jotai';
import { noop } from 'lodash';
import { WagmiProvider } from 'wagmi';
import { arbitrum } from 'wagmi/chains';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: REACT_QUERY_CONFIG.defaultQueryStaleTime,
    },
  },
});

const SUPPORTED_CHAIN_ENVS = ['arbitrum'] satisfies ChainEnv[];

const SUPPORTED_CHAINS = [arbitrum];

/**
 * A client component that wraps children in the root layout.
 *
 * Useful for adding any components / functionality that should exist at the root
 * level AND included in the client bundle.
 */
export function ClientLayout({ children }: WithChildren) {
  const { areCookiesAccepted } = useVertexCookiePreference();

  const wagmiConfig = useWagmiConfig({
    supportedChains: SUPPORTED_CHAINS,
    supportedChainEnvs: SUPPORTED_CHAIN_ENVS,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <EVMContextProvider
          primaryChainEnv="arbitrum"
          supportedChainEnvs={SUPPORTED_CHAIN_ENVS}
          supportedChains={SUPPORTED_CHAINS}
          setPrimaryChainEnv={noop}
        >
          <VertexClientContextProvider>
            <AnalyticsContextProvider>
              <JotaiProvider>
                <GoogleAnalytics
                  areCookiesAccepted={areCookiesAccepted}
                  gtmId={SENSITIVE_DATA.gtmId}
                />
                <TooltipProvider delayDuration={100}>
                  <LazyMotion features={domAnimation}>{children}</LazyMotion>
                </TooltipProvider>
              </JotaiProvider>
            </AnalyticsContextProvider>
          </VertexClientContextProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </EVMContextProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}
