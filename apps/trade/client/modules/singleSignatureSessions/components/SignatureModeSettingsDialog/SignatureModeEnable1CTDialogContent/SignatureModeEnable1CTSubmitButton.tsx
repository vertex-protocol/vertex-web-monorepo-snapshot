import { PrimaryButton } from '@vertex-protocol/web-ui';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';

interface Props {
  buttonState: BaseActionButtonState;
  onSubmit(): void;
}

export function SignatureModeEnable1CTSubmitButton({
  buttonState,
  onSubmit,
}: Props) {
  const buttonContent = (() => {
    switch (buttonState) {
      case 'loading':
        return (
          <ButtonStateContent.Loading singleSignatureMessage="Saving..." />
        );
      case 'success':
        return <ButtonStateContent.Success message="Changes Applied" />;
      default:
        return 'Enable 1-Click Trading';
    }
  })();

  return (
    <PrimaryButton
      onClick={onSubmit}
      isLoading={buttonState === 'loading'}
      disabled={buttonState !== 'success' && buttonState !== 'idle'}
    >
      {buttonContent}
    </PrimaryButton>
  );
}
