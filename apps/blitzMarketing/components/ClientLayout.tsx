'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleAnalytics, WithChildren } from '@vertex-protocol/web-common';
import { domAnimation, LazyMotion } from 'framer-motion';
import { useBlitzCookiePreference } from 'hooks/useBlitzCookiePreference';

const queryClient = new QueryClient();

export function ClientLayout({ children }: WithChildren) {
  const { areCookiesAccepted } = useBlitzCookiePreference();

  return (
    <QueryClientProvider client={queryClient}>
      <LazyMotion features={domAnimation}>
        <GoogleAnalytics areCookiesAccepted={areCookiesAccepted} gtmId="" />
        {children}
      </LazyMotion>
    </QueryClientProvider>
  );
}
