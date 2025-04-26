'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { REACT_QUERY_CONFIG } from '@vertex-protocol/react-client';
import { WithChildren } from '@vertex-protocol/web-common';
import { ExodusWalletProvider } from 'client/context/ExodusWalletProvider';
import { AnalyticsContextProvider } from 'client/modules/analytics/AnalyticsContextProvider';
import { CookieNoticeBanner } from 'client/modules/analytics/CookieNoticeBanner';
import { GoogleAnalytics } from 'client/modules/analytics/GoogleAnalytics';
import { MicrosoftClarityAnalytics } from 'client/modules/analytics/MicrosoftClarityAnalytics';
import { AppDataProviders } from 'client/modules/app/appData/AppDataProviders';
import { AppDialogs } from 'client/modules/app/AppDialogs';
import { GatedAppAccessListener } from 'client/modules/app/gatedAppAccess/GatedAppAccessListener';
import { OpenCommandCenterOnKeyPressListener } from 'client/modules/commandCenter/components/OpenCommandCenterOnKeyPressListener';
import { NotificationManagerContextProvider } from 'client/modules/notifications/NotificationManagerContextProvider';
import { FuulReferralsProvider } from 'client/modules/referrals/fuul/FuulReferralsContext';
import { ReferralCodeListener } from 'client/modules/referrals/ReferralCodeListener';
import { SentryConfigManager } from 'client/modules/sentry/SentryConfigManager';
import { OrderFillQueryRefetchListener } from 'client/modules/trading/OrderFillQueryRefetchListener';
import { TpSlPositionChangeListener } from 'client/modules/trading/TpSlPositionChangeListener';
import { UtmQueryParamsListener } from 'client/modules/utm/UtmQueryParamsListener';
import { Provider as JotaiProvider } from 'jotai';
import { Suspense } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: REACT_QUERY_CONFIG.defaultQueryStaleTime,
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
              <FuulReferralsProvider>
                <NotificationManagerContextProvider>
                  <AnalyticsContextProvider>
                    <GoogleAnalytics />
                    {children}
                    <AppDialogs />
                    <GatedAppAccessListener />
                    <OrderFillQueryRefetchListener />
                    <SentryConfigManager />
                    <MicrosoftClarityAnalytics />
                    <TpSlPositionChangeListener />
                    <UtmQueryParamsListener />
                    <ReferralCodeListener />
                    <CookieNoticeBanner />
                    <OpenCommandCenterOnKeyPressListener />
                  </AnalyticsContextProvider>
                </NotificationManagerContextProvider>
              </FuulReferralsProvider>
            </AppDataProviders>
          </Suspense>
        </ExodusWalletProvider>
      </JotaiProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
