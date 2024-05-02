import { joinClassNames } from '@vertex-protocol/web-common';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { ControlCenterContent } from 'client/modules/controlCenter/components/ControlCenterContent';
import { ControlCenterSettingsContent } from 'client/modules/controlCenter/components/ControlCenterSettingsContent';
import { useState } from 'react';

export interface ControlCenterDialogParams {
  initialShowSettingsContent: boolean;
}

export function ControlCenterDialog({
  initialShowSettingsContent,
}: ControlCenterDialogParams) {
  const { hide } = useDialog();

  const [showSettingsContent, setShowSettingsContent] = useState(
    initialShowSettingsContent,
  );

  const content = showSettingsContent ? (
    <ControlCenterSettingsContent
      onBackClick={() => setShowSettingsContent(false)}
    />
  ) : (
    <ControlCenterContent
      onShowSettingsClick={() => setShowSettingsContent(true)}
    />
  );

  const desktopDialogContainerClasses =
    'sm:left-auto sm:right-2 sm:top-2 sm:mt-0 sm:h-[47rem] sm:w-[360px] sm:rounded';
  // `w-` and `max-w-` are both required to override the default in `BaseDialog.Container`
  const mobileDialogContainerClasses =
    'left-0 bottom-0 h-[calc(100svh-theme(height.navbar))] w-screen rounded-lg max-w-[100vw]';

  return (
    <BaseAppDialog
      className={joinClassNames(
        'bg-surface-card border-stroke absolute',
        mobileDialogContainerClasses,
        desktopDialogContainerClasses,
      )}
      onClose={hide}
    >
      <div className="flex h-full w-full flex-col gap-y-4 overflow-y-auto p-3">
        {content}
      </div>
    </BaseAppDialog>
  );
}
