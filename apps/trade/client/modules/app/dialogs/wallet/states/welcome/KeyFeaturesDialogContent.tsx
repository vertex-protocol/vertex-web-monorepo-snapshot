import { imageToIconComponent, PrimaryButton } from '@vertex-protocol/web-ui';
import { BaseDialog } from 'client/components/BaseDialog/BaseDialog';
import { KeyFeatures } from 'client/components/KeyFeatures';
import { UseConnectWalletStateMachine } from 'client/modules/app/dialogs/wallet/hooks/useConnectWalletStateMachine';
import { IMAGES } from 'common/brandMetadata/images';

interface Props {
  stateMachine: UseConnectWalletStateMachine;
}

const BrandMonochromeIcon = imageToIconComponent({
  src: IMAGES.brandMonochromeIcon,
  alt: '',
});

export function KeyFeaturesDialogContent({ stateMachine }: Props) {
  return (
    <>
      <BaseDialog.Title onClose={stateMachine.hideDialog}>
        Welcome!
      </BaseDialog.Title>
      <BaseDialog.Body className="flex flex-col gap-y-6">
        <KeyFeatures />
        <PrimaryButton onClick={stateMachine.keyFeaturesStartTradingClicked}>
          Start Trading
        </PrimaryButton>
      </BaseDialog.Body>
    </>
  );
}
