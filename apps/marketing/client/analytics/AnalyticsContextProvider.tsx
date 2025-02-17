import spindl from '@spindl-xyz/attribution';
import { WithChildren } from '@vertex-protocol/web-common';
import {
  AnalyticsContext,
  AnalyticsContextData,
  AnalyticsEvent,
} from 'client/analytics/AnalyticsContext';
import { useVertexCookiePreference } from 'client/hooks/useVertexCookiePreference';
import { SENSITIVE_DATA } from 'config/sensitiveData';
import { useCallback, useMemo } from 'react';

const DEBUG_LOGGING = false;

if (typeof window !== 'undefined') {
  spindl.configure({
    sdkKey: SENSITIVE_DATA.spindlApiKey,
    debugMode: DEBUG_LOGGING,
    host: `${window.location.origin}/spindl-ingest`,
  });

  spindl.enableAutoPageViews();
}

export function AnalyticsContextProvider({ children }: WithChildren) {
  const { areCookiesAccepted } = useVertexCookiePreference();

  const disabled = !areCookiesAccepted;

  const trackEvent = useCallback<AnalyticsContextData['trackEvent']>(
    (event: AnalyticsEvent) => {
      if (disabled) {
        return;
      }
      spindl.track(event.type, { ...event.data });
    },
    [disabled],
  );

  const value: AnalyticsContextData = useMemo(() => {
    return {
      trackEvent,
      areCookiesAccepted,
    };
  }, [trackEvent, areCookiesAccepted]);

  return <AnalyticsContext value={value}>{children}</AnalyticsContext>;
}
