import { useGatedAppAccessContext } from 'client/context/gatedAppAccess/GatedAppAccessContext';
import { AccountCenterDialog } from 'client/modules/accountCenter/components/AccountCenterDialog';
import { ChangeSubaccountDialog } from 'client/modules/app/dialogs/ChangeSubaccountDialog';
import { HelpCenterDialog } from 'client/modules/app/dialogs/HelpCenterDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { LocationRestrictedDialog } from 'client/modules/app/dialogs/LocationRestrictedDialog';
import { ConnectWalletDialog } from 'client/modules/app/dialogs/wallet/ConnectWalletDialog';
import { NotifiDialog } from 'client/modules/notifi/NotifiDialog';
import { SignatureModeSettingsDialog } from 'client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/SignatureModeSettingsDialog';
import { SignatureModeSlowModeSettingsDialog } from 'client/modules/singleSignatureSessions/components/SignatureModeSlowModeSettingsDialog/SignatureModeSlowModeSettingsDialog';
import { SingleSignatureReapprovalDialog } from 'client/modules/singleSignatureSessions/components/SingleSignatureReapprovalDialog/SingleSignatureReapprovalDialog';
import { TransakNoticeDialog } from 'client/modules/transak/TransakNoticeDialog';
import { EditUserProfileDialog } from 'client/modules/userProfile/components/EditUserProfileDialog/EditUserProfileDialog';

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
      {currentDialog?.type === 'account_center' && (
        <AccountCenterDialog {...currentDialog.params} />
      )}
      {currentDialog?.type === 'help_center' && <HelpCenterDialog />}
      {currentDialog?.type === 'transak_onramp_notice' && (
        <TransakNoticeDialog />
      )}
    </>
  );
}
