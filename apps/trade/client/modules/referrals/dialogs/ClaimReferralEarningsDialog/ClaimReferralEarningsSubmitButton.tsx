import { PrimaryButton } from '@vertex-protocol/web-ui';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { useMemo } from 'react';

interface Props {
  state: BaseActionButtonState;
  onSubmit: () => void;
}

export function ClaimReferralEarningsSubmitButton({ state, onSubmit }: Props) {
  const message = useMemo(() => {
    switch (state) {
      case 'disabled':
        return `Claim`;
      case 'loading':
        return `Confirm Transaction`;
      case 'success':
        return <ButtonStateContent.Success message="Earnings Claimed" />;
      case 'idle':
        return `Claim`;
    }
  }, [state]);

  return (
    <PrimaryButton
      disabled={state === 'disabled'}
      isLoading={state === 'loading'}
      onClick={onSubmit}
    >
      {message}
    </PrimaryButton>
  );
}
