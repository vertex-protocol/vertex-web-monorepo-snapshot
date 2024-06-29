import { WithClassnames } from '@vertex-protocol/web-common';
import { PrimaryButton } from '@vertex-protocol/web-ui';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { useMemo } from 'react';

interface WithdrawSubmitButtonProps {
  state: BaseActionButtonState;
  enableBorrows: boolean;
}

export function WithdrawButton({
  state,
  enableBorrows,
  className,
}: WithClassnames<WithdrawSubmitButtonProps>) {
  const message = useMemo(() => {
    switch (state) {
      case 'disabled':
        return 'Enter Amount';
      case 'success':
        return (
          <ButtonStateContent.Success
            message={
              enableBorrows ? 'Borrow Submitted' : 'Withdrawal Successful'
            }
          />
        );
      case 'loading':
        return (
          <ButtonStateContent.Loading
            singleSignatureMessage={
              enableBorrows ? 'Submitting Borrow' : 'Submitting Withdrawal'
            }
          />
        );
      case 'idle':
        return enableBorrows ? 'Borrow & Withdraw' : 'Withdraw';
    }
  }, [state, enableBorrows]);

  return (
    <PrimaryButton
      className={className}
      type="submit"
      isLoading={state === 'loading'}
      disabled={state === 'disabled'}
    >
      {message}
    </PrimaryButton>
  );
}
