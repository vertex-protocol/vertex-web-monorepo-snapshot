import { WithClassnames } from '@vertex-protocol/web-common';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { HANDLED_BUTTON_USER_STATE_ERRORS } from 'client/components/ValidUserStatePrimaryButton/useButtonUserStateErrorProps';
import { ValidUserStatePrimaryButton } from 'client/components/ValidUserStatePrimaryButton/ValidUserStatePrimaryButton';
import { DepositActionButtonState } from 'client/modules/collateral/deposit/types';
import { useMemo } from 'react';

interface RepayButtonProps {
  state: DepositActionButtonState;
}

export const RepayDepositButton = ({
  state,
  className,
}: WithClassnames<RepayButtonProps>) => {
  const message = useMemo(() => {
    switch (state) {
      case 'disabled':
        return `Enter Amount`;
      case 'approve_loading':
        return 'Approve Asset';
      case 'approve_success':
        return <ButtonStateContent.Success message="Asset Approved" />;
      case 'approve_idle':
        return `Approve`;
      case 'loading':
        return 'Confirm Deposit';
      case 'success':
        return <ButtonStateContent.Success message="Repayment Made" />;
      case 'idle':
        return `Deposit & Repay`;
    }
  }, [state]);

  const isLoading = state === 'approve_loading' || state === 'loading';

  return (
    <ValidUserStatePrimaryButton
      className={className}
      type="submit"
      isLoading={isLoading}
      disabled={state === 'disabled'}
      handledErrors={
        HANDLED_BUTTON_USER_STATE_ERRORS.onlyIncorrectConnectedChain
      }
    >
      {message}
    </ValidUserStatePrimaryButton>
  );
};
