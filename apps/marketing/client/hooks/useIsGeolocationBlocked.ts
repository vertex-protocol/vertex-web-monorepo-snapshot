import { useQuery } from '@tanstack/react-query';
import { getIsGeolocationBlockedWithFetch } from '@vertex-protocol/web-common';

export function useIsGeolocationBlocked() {
  return useQuery({
    queryKey: ['isGeolocationBlocked'],
    queryFn: getIsGeolocationBlockedWithFetch,
  });
}
