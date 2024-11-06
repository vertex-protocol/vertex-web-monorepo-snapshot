import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { AppVersion } from 'client/modules/app/components/AppVersion';
import { LatencyMonitor } from 'client/modules/app/components/LatencyMonitor';
import { NeedHelpButton } from 'client/modules/app/components/NeedHelpButton';
import { StatusButton } from 'client/modules/app/components/StatusButton';
import { UpcomingMaintenanceAlert } from 'client/modules/app/components/UpcomingMaintenanceAlert';
import { TutorialFlowPopover } from 'client/modules/tutorial/components/TutorialFlowPopover';

export function AppFooter({ className }: WithClassnames) {
  return (
    <div
      className={joinClassNames(
        'bg-background px-4',
        'h-footer border-stroke border-t',
        className,
      )}
    >
      <div className="flex flex-1 items-center gap-x-4 text-xs">
        <StatusButton />
        <NeedHelpButton />
        <TutorialFlowPopover />
      </div>
      <div className="flex items-center gap-x-2 text-xs">
        <AppVersion />
        <LatencyMonitor />
        <UpcomingMaintenanceAlert />
      </div>
    </div>
  );
}
