import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { Button } from '@vertex-protocol/web-ui';
import { TutorialFlowPopover } from 'client/modules/tutorial/components/TutorialFlowPopover';
import { useShouldShowTutorialFlow } from 'client/modules/tutorial/hooks/useShouldShowTutorialFlow';
import { StatusButton } from './components/StatusButton';
import { UpcomingMaintenance } from './components/UpcomingMaintenance';
import { useDialog } from './dialogs/hooks/useDialog';
import { useAlertUpcomingMaintenanceWindow } from './hooks/useAlertUpcomingMaintenanceWindow';

export function AppFooter({ className }: WithClassnames) {
  const { show } = useDialog();

  const shouldShowTutorialFlow = useShouldShowTutorialFlow();
  const alertUpcomingMaintenanceWindow = useAlertUpcomingMaintenanceWindow();

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
        <Button
          className="text-text-secondary hover:text-text-primary"
          onClick={() => show({ type: 'help_center', params: {} })}
        >
          Need Help?
        </Button>
        {shouldShowTutorialFlow && <TutorialFlowPopover />}
      </div>
      {alertUpcomingMaintenanceWindow && <UpcomingMaintenance />}
    </div>
  );
}
