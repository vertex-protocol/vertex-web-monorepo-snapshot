import { WithClassnames } from '@vertex-protocol/web-common';
import { PrimaryButton } from '@vertex-protocol/web-ui';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
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
    <PrimaryButton
      className={className}
      size="lg"
      type="submit"
      isLoading={state === 'loading'}
      disabled={state === 'disabled'}
    >
      {message}
    </PrimaryButton>
  );
};
