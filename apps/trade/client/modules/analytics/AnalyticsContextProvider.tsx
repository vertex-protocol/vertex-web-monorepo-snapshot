import spindl from '@spindl-xyz/attribution';
import { WithChildren } from '@vertex-protocol/web-common';
import { useSizeClass } from 'client/hooks/ui/breakpoints';
import {
  AnalyticsContext,
  AnalyticsContextData,
} from 'client/modules/analytics/AnalyticsContext';
import { AnalyticsGlobalEventsReporter } from 'client/modules/analytics/AnalyticsGlobalEventsReporter';
import {
  AnalyticsBaseEventProperties,
  AnalyticsEvent,
} from 'client/modules/analytics/types';
import { useCookiePreference } from 'client/modules/analytics/useCookiePreference';
import { clientEnv } from 'common/environment/clientEnv';
import { SENSITIVE_DATA } from 'common/environment/sensitiveData';
import { useCallback, useMemo } from 'react';

const API_KEY = SENSITIVE_DATA.spindlApiKey;
const DEBUG_LOGGING = false;

if (typeof window !== 'undefined') {
  spindl.configure({
    sdkKey: API_KEY,
    debugMode: DEBUG_LOGGING,
    host: `${window.location.origin}/spindl-ingest`,
  });

  spindl.enableAutoPageViews();
}

export function AnalyticsContextProvider({ children }: WithChildren) {
  const { value: sizeClass } = useSizeClass();
  const { areCookiesAccepted } = useCookiePreference();
  const {
    base: { buildId },
    isTestnetDataEnv,
  } = clientEnv;

  // Supported on all mainnet and when cookies are enabled
  const disabled = isTestnetDataEnv || !areCookiesAccepted;

  const baseEventProperties = useMemo((): AnalyticsBaseEventProperties => {
    return {
      sizeClass,
      buildId,
    };
  }, [sizeClass, buildId]);

  const updateUserAddress = useCallback<
    AnalyticsContextData['updateUserAddress']
  >(
    async (address: string) => {
      if (disabled) {
        return;
      }
      spindl.attribute(address);
    },
    [disabled],
  );

  const trackEvent = useCallback<AnalyticsContextData['trackEvent']>(
    (event: AnalyticsEvent) => {
      if (disabled) {
        return;
      }
      spindl.track(event.type, { ...baseEventProperties, ...event.data });
    },
    [baseEventProperties, disabled],
  );

  const value: AnalyticsContextData = useMemo(() => {
    return {
      updateUserAddress,
      trackEvent,
      areCookiesAccepted,
    };
  }, [updateUserAddress, trackEvent, areCookiesAccepted]);

  return (
    <AnalyticsContext value={value}>
      <AnalyticsGlobalEventsReporter />
      {children}
    </AnalyticsContext>
  );
}
