import { WithChildren } from '@vertex-protocol/web-common';
import { useIsGeolocationBlocked } from 'hooks/useIsGeolocationBlocked';
import { LocationRestrictedSection } from 'sections/LocationRestrictedSection/LocationRestrictedSection';

export function GatedAccessWrapper({ children }: WithChildren) {
  const { data: isGeolocationBlocked } = useIsGeolocationBlocked();

  return <>{isGeolocationBlocked ? <LocationRestrictedSection /> : children}</>;
}
