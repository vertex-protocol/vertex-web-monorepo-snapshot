import { PrimaryButton } from '@vertex-protocol/web-ui';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { SignatureModeSettingsButtonState } from 'client/modules/singleSignatureSessions/components/SignatureModeSettingsDialog/useSignatureModeSettingsDialog';

interface Props {
  buttonState: SignatureModeSettingsButtonState;

  onSubmit(): void;
}

export function SignatureModeSaveSettingsButton({
  buttonState,
  onSubmit,
}: Props) {
  const buttonContent = (() => {
    switch (buttonState) {
      case 'loading':
        return <ButtonStateContent.Loading singleSignatureMessage="Saving" />;
      case 'enabled':
        return 'Confirm Change';
      case 'requires_deposit':
        return 'Deposit Funds';
      case 'out_of_switches':
        return 'Out of Switches';
      case 'success':
        return <ButtonStateContent.Success message="Changes applied" />;
      default:
        return 'Select Option';
    }
  })();
  return (
    <PrimaryButton
      size="lg"
      type="submit"
      onClick={onSubmit}
      disabled={buttonState !== 'enabled' && buttonState !== 'success'}
      isLoading={buttonState === 'loading'}
    >
      {buttonContent}
    </PrimaryButton>
  );
}
