import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { CommandCenter } from 'client/modules/commandCenter/components/CommandCenter';

export function CommandCenterDialog() {
  const { hide } = useDialog();

  return (
    <BaseAppDialog
      onClose={hide}
      // Max width is handled by `BaseDialog` (used by `BaseAppDialog`).
      className="w-[650px]"
    >
      <CommandCenter className="w-full" />
    </BaseAppDialog>
  );
}
