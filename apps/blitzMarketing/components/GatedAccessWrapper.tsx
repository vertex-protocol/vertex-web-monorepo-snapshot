import { useQuery } from '@tanstack/react-query';
import {
  getIsGeolocationBlockedWithFetch,
  WithChildren,
} from '@vertex-protocol/web-common';
import { LocationRestrictedSection } from 'components/LocationRestrictedSection';

export function GatedAccessWrapper({ children }: WithChildren) {
  const { data: isGeolocationBlocked } = useIsGeolocationBlocked();

  return <>{isGeolocationBlocked ? <LocationRestrictedSection /> : children}</>;
}

function useIsGeolocationBlocked() {
  return useQuery({
    queryKey: ['isGeolocationBlocked'],
    queryFn: getIsGeolocationBlockedWithFetch,
  });
}
