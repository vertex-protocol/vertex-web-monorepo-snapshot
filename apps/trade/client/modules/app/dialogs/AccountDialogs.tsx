import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { ChangeSubaccountDialog } from 'client/modules/controlCenter/components/ChangeSubaccountDialog';
import { ControlCenterDialog } from 'client/modules/controlCenter/components/ControlCenterDialog';
import { HelpCenterDialog } from 'client/modules/faq/HelpCenterDialog';
import { LocationRestrictedDialog } from 'client/modules/gatedAppAccess/components/LocationRestrictedDialog';
import { useGatedAppAccessContext } from 'client/modules/gatedAppAccess/GatedAppAccessContext';
import { NotifiDialog } from 'client/modules/notifi/NotifiDialog';
import { SingleSignatureReapprovalDialog } from 'client/modules/singleSignatureSessions/components/SingleSignatureReapprovalDialog/SingleSignatureReapprovalDialog';
import { EditUserProfileDialog } from 'client/modules/userProfile/components/EditUserProfileDialog/EditUserProfileDialog';
import { SignatureModeSettingsDialog } from 'client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/SignatureModeSettingsDialog';
import { SignatureModeSlowModeSettingsDialog } from 'client/modules/singleSignatureSessions/components/SignatureModeSlowModeSettingsDialog/SignatureModeSlowModeSettingsDialog';
import { ConnectWalletDialog } from 'client/modules/app/dialogs/wallet/ConnectWalletDialog';
import { TransakNoticeDialog } from 'client/modules/transak/TransakNoticeDialog';

export function AccountDialogs() {
  const { isBlockedGeolocation } = useGatedAppAccessContext();
  const { currentDialog } = useDialog();

  return (
    <>
      {currentDialog?.type === 'location_restricted' && (
        <LocationRestrictedDialog />
      )}
      {currentDialog?.type === 'connect' &&
        (isBlockedGeolocation ? (
          <LocationRestrictedDialog />
        ) : (
          <ConnectWalletDialog />
        ))}
      {currentDialog?.type === 'change_subaccount' && (
        <ChangeSubaccountDialog />
      )}
      {currentDialog?.type === 'signature_mode_settings' && (
        <SignatureModeSettingsDialog />
      )}
      {currentDialog?.type === 'signature_mode_slow_mode_settings' && (
        <SignatureModeSlowModeSettingsDialog />
      )}
      {currentDialog?.type === 'single_signature_reapproval' && (
        <SingleSignatureReapprovalDialog />
      )}
      {currentDialog?.type === 'notifi_settings' && <NotifiDialog />}
      {currentDialog?.type === 'edit_user_profile' && <EditUserProfileDialog />}
      {currentDialog?.type === 'control_center' && (
        <ControlCenterDialog {...currentDialog.params} />
      )}
      {currentDialog?.type === 'help_center' && <HelpCenterDialog />}
      {currentDialog?.type === 'transak_onramp_notice' && (
        <TransakNoticeDialog />
      )}
    </>
  );
}
