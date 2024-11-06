import { PrimaryButton } from '@vertex-protocol/web-ui';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';

interface Props {
  buttonState: BaseActionButtonState;
  onSubmit(): void;
}

export function SignatureModeSaveRememberMeButton({
  buttonState,
  onSubmit,
}: Props) {
  const buttonContent = (() => {
    switch (buttonState) {
      case 'loading':
        return (
          <ButtonStateContent.Loading singleSignatureMessage="Saving..." />
        );
      default:
        return 'Save Remember Me Changes';
    }
  })();

  return (
    <PrimaryButton
      onClick={onSubmit}
      isLoading={buttonState === 'loading'}
      disabled={buttonState !== 'idle'}
    >
      {buttonContent}
    </PrimaryButton>
  );
}
