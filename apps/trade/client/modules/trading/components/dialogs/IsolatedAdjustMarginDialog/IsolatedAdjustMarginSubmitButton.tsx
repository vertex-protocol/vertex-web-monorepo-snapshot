import { WithClassnames } from '@vertex-protocol/web-common';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { HANDLED_BUTTON_USER_STATE_ERRORS } from 'client/components/ValidUserStatePrimaryButton/useButtonUserStateErrorProps';
import { ValidUserStatePrimaryButton } from 'client/components/ValidUserStatePrimaryButton/ValidUserStatePrimaryButton';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { useMemo } from 'react';

interface Props {
  state: BaseActionButtonState;
  isAddMargin: boolean;
}

export function IsolatedAdjustMarginSubmitButton({
  state,
  isAddMargin,
  className,
}: WithClassnames<Props>) {
  const message = useMemo(() => {
    switch (state) {
      case 'disabled':
        return 'Enter Amount';
      case 'loading':
        return (
          <ButtonStateContent.Loading
            singleSignatureMessage={
              isAddMargin ? 'Adding Margin' : 'Removing Margin'
            }
          />
        );
      case 'success':
        return (
          <ButtonStateContent.Success
            message={isAddMargin ? 'Margin Added' : 'Margin Removed'}
          />
        );
      case 'idle':
        return isAddMargin ? 'Add Margin' : 'Remove Margin';
    }
  }, [state, isAddMargin]);

  return (
    <ValidUserStatePrimaryButton
      className={className}
      type="submit"
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
