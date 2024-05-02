import {
  createLocalStorageAtom,
  useBaseCookiePreference,
} from '@vertex-protocol/web-common';

const cookiePreferenceAtom = createLocalStorageAtom<boolean | null>(
  'edge',
  'areCookiesAccepted',
  null,
);

export function useEdgeCookiePreference() {
  return useBaseCookiePreference(cookiePreferenceAtom);
}
