import { useGatedAppAccessContext } from 'client/context/gatedAppAccess/GatedAppAccessContext';
import { AccountCenterDialog } from 'client/modules/accountCenter/AccountCenterDialog';
import { ChangeSubaccountDialog } from 'client/modules/app/dialogs/ChangeSubaccountDialog';
import { HelpCenterDialog } from 'client/modules/app/dialogs/HelpCenterDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { LocationRestrictedDialog } from 'client/modules/app/dialogs/LocationRestrictedDialog';
import { ConnectWalletDialog } from 'client/modules/app/dialogs/wallet/ConnectWalletDialog';
import { NotifiContextProviderWrapper } from 'client/modules/notifi/NotifiContextProviderWrapper';
import { NotifiDialog } from 'client/modules/notifi/NotifiDialog';
import { SettingsDialog } from 'client/modules/settings/SettingsDialog';
import { SignatureModeSettingsDialog } from 'client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/SignatureModeSettingsDialog';
import { SignatureModeSlowModeSettingsDialog } from 'client/modules/singleSignatureSessions/components/SignatureModeSlowModeSettingsDialog/SignatureModeSlowModeSettingsDialog';
import { SingleSignatureReapprovalDialog } from 'client/modules/singleSignatureSessions/components/SingleSignatureReapprovalDialog/SingleSignatureReapprovalDialog';
import { AddSubaccountDialog } from 'client/modules/subaccounts/components/dialogs/AddSubaccountDialog/AddSubaccountDialog';
import { EditSubaccountProfileDialog } from 'client/modules/subaccounts/components/dialogs/EditSubaccountProfileDialog/EditSubaccountProfileDialog';
import { ManageSubaccountsDialog } from 'client/modules/subaccounts/components/dialogs/ManageSubaccountsDialog/ManageSubaccountsDialog';
import { SubaccountQuoteTransferDialog } from 'client/modules/subaccounts/components/dialogs/SubaccountQuoteTransferDialog/SubaccountQuoteTransferDialog';
import { IsolatedAdjustMarginDialog } from 'client/modules/trading/components/dialogs/IsolatedAdjustMarginDialog/IsolatedAdjustMarginDialog';

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
      {currentDialog?.type === 'manage_subaccounts' && (
        <ManageSubaccountsDialog />
      )}
      {currentDialog?.type === 'create_subaccount' && <AddSubaccountDialog />}
      {currentDialog?.type === 'change_subaccount' && (
        <ChangeSubaccountDialog />
      )}
      {currentDialog?.type === 'subaccount_quote_transfer' && (
        <SubaccountQuoteTransferDialog {...currentDialog.params} />
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
      {/* Lift NotifiContextProvider to minimize notification card render delays, but avoid wrapping it in _app to prevent hiding the entire app while NotifiContextProvider initializes. */}
      <NotifiContextProviderWrapper>
        {currentDialog?.type === 'notifi_settings' && <NotifiDialog />}
      </NotifiContextProviderWrapper>
      {currentDialog?.type === 'edit_user_profile' && (
        <EditSubaccountProfileDialog {...currentDialog.params} />
      )}
      {currentDialog?.type === 'account_center' && <AccountCenterDialog />}
      {currentDialog?.type === 'settings' && <SettingsDialog />}
      {currentDialog?.type === 'help_center' && <HelpCenterDialog />}
      {currentDialog?.type === 'adjust_iso_margin' && (
        <IsolatedAdjustMarginDialog {...currentDialog?.params} />
      )}
    </>
  );
}
