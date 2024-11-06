import { useIsClient } from '@vertex-protocol/web-common';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import {
  USER_DISCLOSURE_KEYS,
  UserDisclosureKey,
} from 'client/modules/localstorage/userState/types/userDisclosureTypes';
import { useSavedUserState } from 'client/modules/localstorage/userState/useSavedUserState';
import { useCallback } from 'react';

/**
 * Hook for retrieving / setting state for user disclosures. A user disclosure is some message that must be presented
 * to the user initially, but is permanently dismissible by user action
 *
 * @param key the user disclosure key
 */
export function useShowUserDisclosure(key: UserDisclosureKey) {
  const isClient = useIsClient();
  // Conscious decision to handle mounted state so that we can default to hiding the user disclosure before mount
  // This prevents a flash in case the user has dismissed the disclosure, but localstorage is not accessible
  const { savedUserState, setSavedUserState } = useSavedUserState();
  const isConnected = useIsConnected();

  const shouldShow = (() => {
    if (!isClient) {
      return false;
    }
    const wasDismissed = savedUserState.dismissedDisclosures.includes(key);

    // Only show for connected users and if it hasn't been dismissed
    return isConnected && !wasDismissed;
  })();

  const dismiss = useCallback(() => {
    setSavedUserState((prev) => {
      const dismissedDisclosures = prev.dismissedDisclosures;
      // Cleanup keys that are no longer relevant
      const cleanedState = dismissedDisclosures.filter((item) =>
        USER_DISCLOSURE_KEYS.includes(item),
      );
      // Update
      cleanedState.push(key);

      // Deduplicate & save
      prev.dismissedDisclosures = Array.from(new Set(cleanedState));

      return prev;
    });
  }, [setSavedUserState, key]);

  return {
    shouldShow,
    dismiss,
  };
}
