import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { joinClassNames } from '@vertex-protocol/web-common';
import { TooltipPortalRoot } from '@vertex-protocol/web-ui';
import { AppDataProviders } from 'client/context/appData/AppDataProviders';
import { AnalyticsContextProvider } from 'client/modules/analytics/AnalyticsContext';
import { AppDialogs } from 'client/modules/app/AppDialogs';
import { GatedAppAccessContextProvider } from 'client/modules/gatedAppAccess/GatedAppAccessContext';
import { NotificationManagerContextProvider } from 'client/modules/notifications/NotificationManagerContext';
import { ReferralCodeListener } from 'client/modules/rewards/components/ReferralCodeListener';
import { SentryConfigManager } from 'client/modules/sentry/SentryConfigManager';
import { OrderFillQueryRefetchListener } from 'client/modules/trading/OrderFillQueryRefetchListener';
import { clientEnv } from 'common/environment/clientEnv';
import { FONTS } from 'common/theme/fonts';
import { Provider as JotaiProvider } from 'jotai';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { CookieNoticeBanner } from 'client/modules/analytics/CookieNoticeBanner';
import { GoogleAnalytics } from 'client/modules/analytics/GoogleAnalytics';

// Style imports
import '../styles/globals.css';
import '../styles/notifi.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time determines when a new component mount should trigger a refresh. By default this is 0,
      // which results in repeated fetches if a query is used in multiple components.
      staleTime: 5000,
    },
  },
});

function App({ Component, pageProps }: AppProps) {
  return (
    <main
      className={joinClassNames(
        FONTS.default.className,
        FONTS.default.variable,
        FONTS.title.variable,
        // Blitz fonts are very wide, so compress letter spacing
        clientEnv.base.brandName === 'blitz' && 'tracking-tighter',
      )}
    >
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <JotaiProvider>
            <ReactQueryDevtools initialIsOpen={false} />
            <AppDataProviders>
              <GatedAppAccessContextProvider>
                <NotificationManagerContextProvider>
                  <AnalyticsContextProvider>
                    <Head>
                      <title>{clientEnv.brandMetadata.displayName}</title>
                      {/*This prevents mobile from auto-zooming on input focus*/}
                      <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                      />
                    </Head>
                    <GoogleAnalytics />
                    <Component {...pageProps} />
                    <AppDialogs />
                    <OrderFillQueryRefetchListener />
                    <SentryConfigManager />
                    <ReferralCodeListener />
                    <TooltipPortalRoot />
                    <CookieNoticeBanner />
                  </AnalyticsContextProvider>
                </NotificationManagerContextProvider>
              </GatedAppAccessContextProvider>
            </AppDataProviders>
          </JotaiProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </main>
  );
}

export default App;
