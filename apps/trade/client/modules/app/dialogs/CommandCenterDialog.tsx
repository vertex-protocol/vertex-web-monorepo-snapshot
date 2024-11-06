import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { CommandCenter } from 'client/modules/commandCenter/components/CommandCenter';

export function CommandCenterDialog() {
  const { hide } = useDialog();

  return (
    <BaseAppDialog.Container
      onClose={hide}
      // Max width is handled by `BaseDialog` (used by `BaseAppDialog`).
      className="w-[650px]"
    >
      {/* Necessary for a11y. */}
      <BaseAppDialog.Title className="sr-only">
        Command Center
      </BaseAppDialog.Title>

      <CommandCenter className="w-full" />
    </BaseAppDialog.Container>
  );
}
