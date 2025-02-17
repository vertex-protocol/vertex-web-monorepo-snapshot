import Clarity from '@microsoft/clarity';
import { useVertexMetadataContext } from '@vertex-protocol/react-client';
import { useCookiePreference } from 'client/modules/analytics/useCookiePreference';
import { clientEnv } from 'common/environment/clientEnv';
import { useEffect } from 'react';

export function MicrosoftClarityAnalytics() {
  const {
    primaryChainMetadata: { isTestnet },
  } = useVertexMetadataContext();
  const { areCookiesAccepted } = useCookiePreference();

  const disabled = isTestnet;

  const isInitialized = typeof window.clarity !== 'undefined';

  // If not disabled and not initialized, initialize Clarity
  useEffect(() => {
    if (disabled || isInitialized) {
      return;
    }

    Clarity.init(clientEnv.integrations.microsoftClarityAnalytics);
  }, [disabled, isInitialized]);

  // Listen for changes in the cookie preference and update the consent if Clarity is initialized
  useEffect(() => {
    if (!isInitialized) {
      return;
    }

    Clarity.consent(areCookiesAccepted ?? false);
  }, [areCookiesAccepted, isInitialized]);

  return null;
}
