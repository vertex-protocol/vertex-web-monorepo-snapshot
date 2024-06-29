import { BaseDialog } from 'client/components/BaseDialog/BaseDialog';
import { AccountCenterContent } from 'client/modules/accountCenter/components/AccountCenterContent/AccountCenterContent';
import { AccountCenterSettingsContent } from 'client/modules/accountCenter/components/AccountCenterSettingsContent/AccountCenterSettingsContent';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useState } from 'react';

export interface AccountCenterDialogParams {
  initialShowSettingsContent: boolean;
}

export function AccountCenterDialog({
  initialShowSettingsContent,
}: AccountCenterDialogParams) {
  const { hide } = useDialog();

  const [showSettingsContent, setShowSettingsContent] = useState(
    initialShowSettingsContent,
  );

  const content = showSettingsContent ? (
    <AccountCenterSettingsContent
      onBackClick={() => setShowSettingsContent(false)}
    />
  ) : (
    <AccountCenterContent
      onShowSettingsClick={() => setShowSettingsContent(true)}
    />
  );

  return (
    <BaseAppDialog onClose={hide} className="flex flex-col">
      {/*Specific px/py required to override padding specifiers in BaseDialog.Body*/}
      {/*Set an ideal height to prevent large layout shifts when switching between main content & settings*/}
      <BaseDialog.Body className="h-[700px] px-4 py-4">
        {content}
      </BaseDialog.Body>
    </BaseAppDialog>
  );
}
