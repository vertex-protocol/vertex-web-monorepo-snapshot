import { useCookiePreference } from 'client/modules/analytics/useCookiePreference';
import { clientEnv } from 'common/environment/clientEnv';
import { GoogleAnalytics as BaseGoogleAnalytics } from '@vertex-protocol/web-common';

export function GoogleAnalytics() {
  const { areCookiesAccepted } = useCookiePreference();

  return (
    <BaseGoogleAnalytics
      areCookiesAccepted={areCookiesAccepted}
      gtmId={clientEnv.integrations.googleAnalyticsId}
    />
  );
}
