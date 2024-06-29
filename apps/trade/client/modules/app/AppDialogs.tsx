import { ActionSuccessDialog } from 'client/modules/app/dialogs/ActionSuccessDialog';
import { AccountDialogs } from 'client/modules/app/dialogs/dialogGroups/AccountDialogs';
import { CollateralDialogs } from 'client/modules/app/dialogs/dialogGroups/CollateralDialogs';
import { DetailDialogs } from 'client/modules/app/dialogs/dialogGroups/DetailDialogs';
import { LpDialogs } from 'client/modules/app/dialogs/dialogGroups/LpDialogs';
import { PerpDialogs } from 'client/modules/app/dialogs/dialogGroups/PerpDialogs';
import { ReferralDialogs } from 'client/modules/app/dialogs/dialogGroups/ReferralDialogs';
import { VrtxTokenDialogs } from 'client/modules/app/dialogs/dialogGroups/VrtxTokenDialogs';
import { EditOrderViaChartDialog } from 'client/modules/app/dialogs/EditOrderViaChartDialog';
import { useAppDialogEffects } from 'client/modules/app/dialogs/hooks/useAppDialogEffects';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { CommandCenterDialog } from './dialogs/CommandCenterDialog';

export function AppDialogs() {
  const { currentDialog } = useDialog();

  useAppDialogEffects();

  return (
    <>
      {currentDialog?.type === 'action_success' && (
        <ActionSuccessDialog {...currentDialog.params} />
      )}
      {currentDialog?.type === 'command_center' && <CommandCenterDialog />}
      {currentDialog?.type === 'edit_order_via_chart' && (
        <EditOrderViaChartDialog {...currentDialog.params} />
      )}
      <AccountDialogs />
      <PerpDialogs />
      <LpDialogs />
      <CollateralDialogs />
      <DetailDialogs />
      <VrtxTokenDialogs />
      <ReferralDialogs />
    </>
  );
}
