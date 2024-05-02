import {
  createLocalStorageAtom,
  useBaseCookiePreference,
} from '@vertex-protocol/web-common';

const cookiePreferenceAtom = createLocalStorageAtom<boolean | null>(
  'blitz',
  'areCookiesAccepted',
  null,
);

export function useBlitzCookiePreference() {
  return useBaseCookiePreference(cookiePreferenceAtom);
}
