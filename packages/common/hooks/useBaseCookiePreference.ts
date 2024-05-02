import { useStorageAtom } from './useStorageAtom';
import { WritableAtom } from 'jotai';
import { useCallback } from 'react';

export function useBaseCookiePreference<Result extends void | Promise<void>>(
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
