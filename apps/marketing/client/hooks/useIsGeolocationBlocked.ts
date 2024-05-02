import { useQuery } from '@tanstack/react-query';
import { getIsGeolocationBlocked } from '@vertex-protocol/web-common';

export function useIsGeolocationBlocked() {
  return useQuery({
    queryKey: ['isGeolocationBlocked'],
    queryFn: getIsGeolocationBlocked,
  });
}
