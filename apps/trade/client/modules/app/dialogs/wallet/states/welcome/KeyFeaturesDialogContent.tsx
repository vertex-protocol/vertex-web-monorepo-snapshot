import { PrimaryButton } from '@vertex-protocol/web-ui';
import { KeyFeatures } from 'client/components/KeyFeatures';
import { UseConnectWalletStateMachine } from 'client/modules/app/dialogs/wallet/hooks/useConnectWalletStateMachine';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';

interface Props {
  stateMachine: UseConnectWalletStateMachine;
}

export function KeyFeaturesDialogContent({ stateMachine }: Props) {
  return (
    <>
      <BaseAppDialog.Title onClose={stateMachine.hideDialog}>
        Welcome!
      </BaseAppDialog.Title>
      <BaseAppDialog.Body>
        <KeyFeatures />
        <PrimaryButton onClick={stateMachine.keyFeaturesStartTradingClicked}>
          Start Trading
        </PrimaryButton>
      </BaseAppDialog.Body>
    </>
  );
}
