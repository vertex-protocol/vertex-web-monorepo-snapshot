import { AccountDialogs } from 'client/modules/app/dialogs/AccountDialogs';
import { ActionSuccessDialog } from 'client/modules/app/dialogs/ActionSuccessDialog';
import { CollateralDialogs } from 'client/modules/app/dialogs/CollateralDialogs';
import { DetailDialogs } from 'client/modules/app/dialogs/DetailDialogs';
import { useAppDialogEffects } from 'client/modules/app/dialogs/hooks/useAppDialogEffects';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { LpDialogs } from 'client/modules/app/dialogs/LpDialogs';
import { PerpDialogs } from 'client/modules/app/dialogs/PerpDialogs';
import { VrtxTokenDialogs } from 'client/modules/app/dialogs/VrtxTokenDialogs';

export function AppDialogs() {
  const { currentDialog } = useDialog();

  useAppDialogEffects();

  return (
    <>
      {currentDialog?.type === 'action_success' && (
        <ActionSuccessDialog {...currentDialog.params} />
      )}
      <AccountDialogs />
      <PerpDialogs />
      <LpDialogs />
      <CollateralDialogs />
      <DetailDialogs />
      <VrtxTokenDialogs />
    </>
  );
}
