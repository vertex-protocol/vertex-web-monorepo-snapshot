import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { HANDLED_BUTTON_USER_STATE_ERRORS } from 'client/components/ValidUserStatePrimaryButton/useButtonUserStateErrorProps';
import { ValidUserStatePrimaryButton } from 'client/components/ValidUserStatePrimaryButton/ValidUserStatePrimaryButton';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';

interface Props {
  buttonState: BaseActionButtonState;
  onClick(): void;
}

export function MigrateStakingSubmitButton({ onClick, buttonState }: Props) {
  const buttonStateContent = (() => {
    switch (buttonState) {
      case 'disabled':
        return 'Migrate to V2';
      case 'success':
        return <ButtonStateContent.Success message="Migration Successful" />;
      case 'loading':
        return 'Confirm Migration';
      case 'idle':
        return 'Migrate to V2';
    }
  })();

  return (
    <ValidUserStatePrimaryButton
      onClick={onClick}
      isLoading={buttonState === 'loading'}
      disabled={buttonState === 'disabled'}
      handledErrors={
        HANDLED_BUTTON_USER_STATE_ERRORS.onlyIncorrectConnectedChain
      }
    >
      {buttonStateContent}
    </ValidUserStatePrimaryButton>
  );
}
