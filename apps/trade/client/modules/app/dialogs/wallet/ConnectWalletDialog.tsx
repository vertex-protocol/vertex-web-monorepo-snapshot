import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useConnectWalletStateMachine } from 'client/modules/app/dialogs/wallet/hooks/useConnectWalletStateMachine';
import { ConnectWalletDialogContent } from 'client/modules/app/dialogs/wallet/states/connect/ConnectWalletDialogContent';
import { TermsOfUseDialogContent } from 'client/modules/app/dialogs/wallet/states/termsOfUse/TermsOfUseDialogContent';
import { KeyFeaturesDialogContent } from 'client/modules/app/dialogs/wallet/states/welcome/KeyFeaturesDialogContent';

export function ConnectWalletDialog() {
  const stateMachine = useConnectWalletStateMachine();

  const content = (() => {
    switch (stateMachine.currentState) {
      case 'connect':
        return <ConnectWalletDialogContent />;
      case 'terms_of_use':
        return <TermsOfUseDialogContent stateMachine={stateMachine} />;
      case 'key_features':
        return <KeyFeaturesDialogContent stateMachine={stateMachine} />;
    }
  })();

  return (
    <BaseAppDialog onClose={stateMachine.hideDialog}>{content}</BaseAppDialog>
  );
}
