import { useCookiePreference } from 'client/modules/analytics/useCookiePreference';
import { clientEnv } from 'common/environment/clientEnv';
import { useEVMContext } from '@vertex-protocol/react-client';
import Script from 'next/script';

export function MicrosoftClarityAnalytics() {
  const {
    primaryChainMetadata: { isTestnet },
  } = useEVMContext();
  const { areCookiesAccepted } = useCookiePreference();

  const disabled = isTestnet || !areCookiesAccepted;

  return disabled ? null : (
    <Script
      id="ms-clarity"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: ` (function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${clientEnv.integrations.microsoftClarityAnalytics}");`,
      }}
    />
  );
}
