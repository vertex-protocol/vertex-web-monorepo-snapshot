'use client';

import { Divider } from '@vertex-protocol/web-ui';
import { UpcomingMaintenanceLink } from 'client/modules/app/components/UpcomingMaintenanceLink';
import { useAlertUpcomingMaintenanceWindow } from 'client/modules/app/hooks/useAlertUpcomingMaintenanceWindow';

export function UpcomingMaintenanceAlert() {
  const alertUpcomingMaintenanceWindow = useAlertUpcomingMaintenanceWindow();

  if (!alertUpcomingMaintenanceWindow) {
    return null;
  }

  return (
    <>
      <Divider vertical className="h-4" />
      <UpcomingMaintenanceLink />
    </>
  );
}
