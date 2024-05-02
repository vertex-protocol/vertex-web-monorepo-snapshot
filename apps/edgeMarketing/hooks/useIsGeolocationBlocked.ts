import { useQuery } from '@tanstack/react-query';
import { getIsGeolocationBlocked } from '@vertex-protocol/web-common';

// To eliminate the need to bring the SDK into the marketing site, hit the prod API directly
export function useIsGeolocationBlocked() {
  return useQuery({
    queryKey: ['isGeolocationBlocked'],
    queryFn: getIsGeolocationBlocked,
  });
}
