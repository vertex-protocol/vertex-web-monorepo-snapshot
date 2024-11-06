'use client';

import { GoogleAnalytics, WithChildren } from '@vertex-protocol/web-common';
import { GatedAccessWrapper } from 'components/GatedAccessWrapper/GatedAccessWrapper';
import { useEdgeCookiePreference } from 'hooks/useEdgeCookiePreference';

export function ClientLayout({ children }: WithChildren) {
  const { areCookiesAccepted } = useEdgeCookiePreference();

  return (
    <GatedAccessWrapper>
      <GoogleAnalytics areCookiesAccepted={areCookiesAccepted} gtmId="" />
      {children}
    </GatedAccessWrapper>
  );
}
