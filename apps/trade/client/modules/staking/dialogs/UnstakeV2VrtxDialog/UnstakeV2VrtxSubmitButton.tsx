import { WithClassnames } from '@vertex-protocol/web-common';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { HANDLED_BUTTON_USER_STATE_ERRORS } from 'client/components/ValidUserStatePrimaryButton/useButtonUserStateErrorProps';
import { ValidUserStatePrimaryButton } from 'client/components/ValidUserStatePrimaryButton/ValidUserStatePrimaryButton';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';

interface Props extends WithClassnames {
  state: BaseActionButtonState;
  onClick(): void;
}

export function UnstakeV2VrtxSubmitButton({
  className,
  state,
  onClick,
}: Props) {
  const message = (() => {
    switch (state) {
      case 'disabled':
        return 'Unstake';
      case 'success':
        return <ButtonStateContent.Success message="Unstake Successful" />;
      case 'loading':
        return 'Confirm Unstake';
      case 'idle':
        return 'Unstake';
    }
  })();

  return (
    <ValidUserStatePrimaryButton
      onClick={onClick}
      className={className}
      isLoading={state === 'loading'}
      disabled={state === 'disabled'}
      handledErrors={
        HANDLED_BUTTON_USER_STATE_ERRORS.onlyIncorrectConnectedChain
      }
    >
      {message}
    </ValidUserStatePrimaryButton>
  );
}
