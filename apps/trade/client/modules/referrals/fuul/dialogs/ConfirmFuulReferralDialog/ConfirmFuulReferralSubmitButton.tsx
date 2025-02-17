import { PrimaryButton } from '@vertex-protocol/web-ui';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { useMemo } from 'react';

interface Props {
  state: BaseActionButtonState;
  onClick: () => void;
}

export function ConfirmFuulReferralSubmitButton({ state, onClick }: Props) {
  const message = useMemo(() => {
    switch (state) {
      case 'disabled':
        return `Confirm`;
      case 'loading':
        return `Sign Message`;
      case 'success':
        return <ButtonStateContent.Success message="Success" />;
      case 'idle':
        return `Confirm Referral`;
    }
  }, [state]);

  return (
    <PrimaryButton
      disabled={state === 'disabled'}
      isLoading={state === 'loading'}
      onClick={onClick}
    >
      {message}
    </PrimaryButton>
  );
}
