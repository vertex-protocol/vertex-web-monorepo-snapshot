import { PrimaryButton } from '@vertex-protocol/web-ui';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { SignatureModeSettingsButtonState } from 'client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/useSignatureModeSettingsDialog';

interface Props {
  buttonState: SignatureModeSettingsButtonState;

  onSubmit(): void;
}

export function SingleSignatureReapproveButton({
  buttonState,
  onSubmit,
}: Props) {
  const buttonContent = (() => {
    switch (buttonState) {
      case 'loading':
        return (
          <ButtonStateContent.Loading singleSignatureMessage="Approving" />
        );
      case 'success':
        return <ButtonStateContent.Success message="Changes applied" />;
      default:
        return 'Approve';
    }
  })();
  return (
    <PrimaryButton
      onClick={onSubmit}
      disabled={buttonState !== 'enabled' && buttonState !== 'success'}
      isLoading={buttonState === 'loading'}
    >
      {buttonContent}
    </PrimaryButton>
  );
}
