import { WithClassnames } from '@vertex-protocol/web-common';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { HANDLED_BUTTON_USER_STATE_ERRORS } from 'client/components/ValidUserStatePrimaryButton/useButtonUserStateErrorProps';
import { ValidUserStatePrimaryButton } from 'client/components/ValidUserStatePrimaryButton/ValidUserStatePrimaryButton';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { useMemo } from 'react';

interface SubaccountQuoteTransferSubmitButtonProps extends WithClassnames {
  state: BaseActionButtonState;
}

export function SubaccountQuoteTransferSubmitButton({
  state,
  className,
}: SubaccountQuoteTransferSubmitButtonProps) {
  const message = useMemo(() => {
    switch (state) {
      case 'disabled':
        return `Enter Amount`;
      case 'loading':
        return 'Confirm Transfer';
      case 'success':
        return <ButtonStateContent.Success message="Transfer Successful" />;
      case 'idle':
        return 'Transfer Funds';
    }
  }, [state]);

  return (
    <ValidUserStatePrimaryButton
      className={className}
      type="submit"
      disabled={state === 'disabled'}
      isLoading={state === 'loading'}
      handledErrors={
        HANDLED_BUTTON_USER_STATE_ERRORS.onlyIncorrectConnectedChain
      }
    >
      {message}
    </ValidUserStatePrimaryButton>
  );
}
