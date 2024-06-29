import { WritableAtom } from 'jotai';
import { useCallback } from 'react';
import { useStorageAtom } from '../hooks/useStorageAtom';

export function useBaseCookiePreference(
  atom: WritableAtom<boolean | null, [boolean], void>,
) {
  const [areCookiesAccepted, setAreCookiesAccepted, didLoadPersistedValue] =
    useStorageAtom(atom, null);

  const acceptCookies = useCallback(() => {
    setAreCookiesAccepted(true);
  }, [setAreCookiesAccepted]);

  const declineCookies = useCallback(() => {
    setAreCookiesAccepted(false);
  }, [setAreCookiesAccepted]);

  return {
    areCookiesAccepted,
    didLoadPersistedValue,
    acceptCookies,
    declineCookies,
  };
}
