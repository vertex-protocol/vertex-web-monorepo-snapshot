import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { HANDLED_BUTTON_USER_STATE_ERRORS } from 'client/components/ValidUserStatePrimaryButton/useButtonUserStateErrorProps';
import { ValidUserStatePrimaryButton } from 'client/components/ValidUserStatePrimaryButton/ValidUserStatePrimaryButton';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { useMemo } from 'react';

export const ClosePositionButton = ({
  state,
  onSubmit,
}: {
  onSubmit: () => void;
  state: BaseActionButtonState;
}) => {
  const message = useMemo(() => {
    switch (state) {
      case 'disabled':
        return 'Choose % to Close';
      case 'loading':
        return (
          <ButtonStateContent.Loading singleSignatureMessage="Placing Order" />
        );
      case 'success':
        return <ButtonStateContent.Success message="Market Close Submitted" />;
      case 'idle':
        return 'Market Close';
    }
  }, [state]);

  return (
    <ValidUserStatePrimaryButton
      type="submit"
      isLoading={state === 'loading'}
      disabled={state === 'disabled'}
      onClick={onSubmit}
      handledErrors={
        HANDLED_BUTTON_USER_STATE_ERRORS.onlyIncorrectConnectedChain
      }
    >
      {message}
    </ValidUserStatePrimaryButton>
  );
};
