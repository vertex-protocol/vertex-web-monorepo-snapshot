import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';
import { useEffect } from 'react';
import { useEVMContext } from '@vertex-protocol/web-data';
import { useSavedUserSettings } from 'client/modules/localstorage/userSettings/useSavedUserSettings';

/**
 * Reports wallet connection and saved user settings to analytics:
 */
export function AnalyticsGlobalEventsReporter() {
  const {
    connectionStatus: { address },
  } = useEVMContext();
  const { updateUserAddress, trackEvent } = useAnalyticsContext();
  const { savedUserSettings, didLoadPersistedValue } = useSavedUserSettings();

  // Update user address
  useEffect(() => {
    if (address) {
      updateUserAddress(address);
    }
  }, [address, updateUserAddress]);

  // Track saved user settings on initial load
  useEffect(() => {
    if (didLoadPersistedValue && address) {
      trackEvent({ type: 'saved_user_settings', data: savedUserSettings });
    }
  }, [trackEvent, savedUserSettings, didLoadPersistedValue, address]);

  return null;
}
