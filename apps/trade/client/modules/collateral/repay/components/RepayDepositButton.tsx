import { WithClassnames } from '@vertex-protocol/web-common';
import { PrimaryButton } from '@vertex-protocol/web-ui';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { useMemo } from 'react';
import { DepositActionButtonState } from '../../deposit/types';

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
    <PrimaryButton
      className={className}
      type="submit"
      isLoading={isLoading}
      disabled={state === 'disabled'}
    >
      {message}
    </PrimaryButton>
  );
};
