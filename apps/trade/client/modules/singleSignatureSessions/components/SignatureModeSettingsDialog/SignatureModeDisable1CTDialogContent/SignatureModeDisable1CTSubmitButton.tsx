import { SecondaryButton } from '@vertex-protocol/web-ui';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';

interface Props {
  buttonState: BaseActionButtonState;
  onSubmit(): void;
}

export function SignatureModeDisable1CTSubmitButton({
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
        return 'Disable 1-Click Trading';
    }
  })();

  return (
    <SecondaryButton
      onClick={onSubmit}
      isLoading={buttonState === 'loading'}
      disabled={buttonState !== 'success' && buttonState !== 'idle'}
    >
      {buttonContent}
    </SecondaryButton>
  );
}
