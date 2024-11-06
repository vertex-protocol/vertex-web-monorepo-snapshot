import { PrimaryButton } from '@vertex-protocol/web-ui';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';

interface Props {
  buttonState: BaseActionButtonState;

  onSubmit(): void;
}

export function SingleSignatureReapprovalSubmitButton({
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
        return <ButtonStateContent.Success message="Changes Applied" />;
      default:
        return 'Approve 1-Click Trading';
    }
  })();
  return (
    <PrimaryButton
      onClick={onSubmit}
      disabled={buttonState !== 'idle' && buttonState !== 'success'}
      isLoading={buttonState === 'loading'}
    >
      {buttonContent}
    </PrimaryButton>
  );
}
