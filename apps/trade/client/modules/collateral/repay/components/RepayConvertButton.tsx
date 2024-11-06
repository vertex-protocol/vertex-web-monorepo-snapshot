import { WithClassnames } from '@vertex-protocol/web-common';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { HANDLED_BUTTON_USER_STATE_ERRORS } from 'client/components/ValidUserStatePrimaryButton/useButtonUserStateErrorProps';
import { ValidUserStatePrimaryButton } from 'client/components/ValidUserStatePrimaryButton/ValidUserStatePrimaryButton';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { useMemo } from 'react';

interface RepayConvertButtonProps {
  state: BaseActionButtonState;
}

export const RepayConvertButton = ({
  state,
  className,
}: WithClassnames<RepayConvertButtonProps>) => {
  const message = useMemo(() => {
    switch (state) {
      case 'disabled':
        return `Enter Amount`;
      case 'loading':
        return (
          <ButtonStateContent.Loading singleSignatureMessage="Placing Order" />
        );
      case 'success':
        return <ButtonStateContent.Success message="Repayment Made" />;
      case 'idle':
        return `Repay with Market Order`;
    }
  }, [state]);

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
};
