import { WithChildren } from '@vertex-protocol/web-common';
import { useIsGeolocationBlocked } from 'client/hooks/useIsGeolocationBlocked';

import { LocationRestrictedDialog } from 'client/components/LocationRestrictedDialog';

export function GatedAccessWrapper({ children }: WithChildren) {
  const { data: isGeolocationBlocked } = useIsGeolocationBlocked();

  return (
    <div>
      {isGeolocationBlocked && <LocationRestrictedDialog />}
      {children}
    </div>
  );
}
