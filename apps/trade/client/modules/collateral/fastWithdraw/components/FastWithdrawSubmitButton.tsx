import { PrimaryButton } from '@vertex-protocol/web-ui';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { useMemo } from 'react';

interface FastWithdrawSubmitButtonProps {
  state: BaseActionButtonState;
  onSubmit: () => void;
}

export function FastWithdrawSubmitButton({
  state,
  onSubmit,
}: FastWithdrawSubmitButtonProps) {
  const message = useMemo(() => {
    switch (state) {
      case 'disabled':
        return 'Fast Withdraw';
      case 'success':
        return <ButtonStateContent.Success message="Withdrawal Successful" />;
      case 'loading':
        return 'Submitting Withdrawal';
      case 'idle':
        return 'Fast Withdraw';
    }
  }, [state]);

  return (
    <PrimaryButton
      type="submit"
      onClick={onSubmit}
      isLoading={state === 'loading'}
      disabled={state === 'disabled'}
    >
      {message}
    </PrimaryButton>
  );
}
