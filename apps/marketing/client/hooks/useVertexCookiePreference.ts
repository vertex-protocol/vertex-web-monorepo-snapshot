import {
  createLocalStorageAtom,
  useBaseCookiePreference,
} from '@vertex-protocol/web-common';

const cookiePreferenceAtom = createLocalStorageAtom<boolean | null>(
  'marketing',
  'areCookiesAccepted',
  null,
);

export function useVertexCookiePreference() {
  return useBaseCookiePreference(cookiePreferenceAtom);
}
