'use client';

import { GoogleAnalytics, WithChildren } from '@vertex-protocol/web-common';
import { GatedAccessWrapper } from 'client/components/GatedAccessWrapper';
import { useVertexCookiePreference } from 'client/hooks/useVertexCookiePreference';

/**
 * A client component that wraps children in the root layout.
 *
 * Useful for adding any components / functionality that should exist at the root
 * level AND included in the client bundle.
 */
export function ClientLayout({ children }: WithChildren) {
  const { areCookiesAccepted } = useVertexCookiePreference();

  return (
    <GatedAccessWrapper>
      <GoogleAnalytics areCookiesAccepted={areCookiesAccepted} gtmId="" />
      {children}
    </GatedAccessWrapper>
  );
}
