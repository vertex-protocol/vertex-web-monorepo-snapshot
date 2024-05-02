import { useCallback } from 'react';
import { useSavedGlobalState } from 'client/modules/localstorage/globalState/useSavedGlobalState';

export function useCookiePreference() {
  const { savedGlobalState, setSavedGlobalState, didLoadPersistedValue } =
    useSavedGlobalState();

  const acceptCookies = useCallback(() => {
    setSavedGlobalState((prev) => {
      prev.areCookiesAccepted = true;
      return prev;
    });
  }, [setSavedGlobalState]);

  const declineCookies = useCallback(() => {
    setSavedGlobalState((prev) => {
      prev.areCookiesAccepted = false;
      return prev;
    });
  }, [setSavedGlobalState]);

  return {
    areCookiesAccepted: savedGlobalState.areCookiesAccepted,
    didLoadPersistedValue,
    acceptCookies,
    declineCookies,
  };
}
