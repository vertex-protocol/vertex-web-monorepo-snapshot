'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { WithChildren } from '@vertex-protocol/web-common';
import { AppDataProviders } from 'client/context/appData/AppDataProviders';
import { ExodusWalletProvider } from 'client/context/ExodusWalletProvider';
import { GatedAppAccessContextProvider } from 'client/context/gatedAppAccess/GatedAppAccessContext';
import { AnalyticsContextProvider } from 'client/modules/analytics/AnalyticsContextProvider';
import { CookieNoticeBanner } from 'client/modules/analytics/CookieNoticeBanner';
import { GoogleAnalytics } from 'client/modules/analytics/GoogleAnalytics';
import { MicrosoftClarityAnalytics } from 'client/modules/analytics/MicrosoftClarityAnalytics';
import { AppDialogs } from 'client/modules/app/AppDialogs';
import { OpenCommandCenterOnKeyPressListener } from 'client/modules/commandCenter/components/OpenCommandCenterOnKeyPressListener';
import { NotificationManagerContextProvider } from 'client/modules/notifications/NotificationManagerContextProvider';
import { ReferralCodeListener } from 'client/modules/referrals/components/ReferralCodeListener';
import { FuulReferralsProvider } from 'client/modules/referrals/context/FuulReferralsContext';
import { SentryConfigManager } from 'client/modules/sentry/SentryConfigManager';
import { OrderFillQueryRefetchListener } from 'client/modules/trading/OrderFillQueryRefetchListener';
import { TpSlPositionChangeListener } from 'client/modules/trading/TpSlPositionChangeListener';
import { Provider as JotaiProvider } from 'jotai';
import { Suspense } from 'react';

// Style imports
import 'styles/globals.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time determines when a new component mount should trigger a refresh. By default this is 0,
      // which results in repeated fetches if a query is used in multiple components.
      staleTime: 5000,
    },
  },
});

export function ClientLayout({ children }: WithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        {/* 
        Suspense boundary needed for `AppDataProviders` since it is using `useSearchParams` to avoid forcing
        the whole site into client-side rendering.
        See https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout 
        */}
        <ExodusWalletProvider>
          <Suspense>
            <AppDataProviders>
              <GatedAppAccessContextProvider>
                <NotificationManagerContextProvider>
                  <FuulReferralsProvider>
                    <AnalyticsContextProvider>
                      <GoogleAnalytics />
                      {children}
                      <AppDialogs />
                      <OrderFillQueryRefetchListener />
                      <SentryConfigManager />
                      <MicrosoftClarityAnalytics />
                      <TpSlPositionChangeListener />
                      <ReferralCodeListener />
                      <CookieNoticeBanner />
                      <OpenCommandCenterOnKeyPressListener />
                    </AnalyticsContextProvider>
                  </FuulReferralsProvider>
                </NotificationManagerContextProvider>
              </GatedAppAccessContextProvider>
            </AppDataProviders>
          </Suspense>
        </ExodusWalletProvider>
      </JotaiProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
