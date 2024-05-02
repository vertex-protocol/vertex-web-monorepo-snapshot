import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { NotifiSettingsContent } from 'client/modules/notifi/NotifiSettingsContent';

export function NotifiDialog() {
  const { hide } = useDialog();

  return (
    <BaseAppDialog onClose={hide}>
      <NotifiSettingsContent />
    </BaseAppDialog>
  );
}
