import { WithClassnames } from '@vertex-protocol/web-common';
import { PrimaryButton } from '@vertex-protocol/web-ui';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';

interface Props extends WithClassnames {
  state: BaseActionButtonState;
}

export function UnstakeVrtxSubmitButton({ className, state }: Props) {
  const message = (() => {
    switch (state) {
      case 'disabled':
        return 'Enter Amount';
      case 'success':
        return <ButtonStateContent.Success message="Unstake Successful" />;
      case 'loading':
        return 'Confirm Unstake';
      case 'idle':
        return 'Unstake';
    }
  })();

  return (
    <PrimaryButton
      size="lg"
      type="submit"
      className={className}
      isLoading={state === 'loading'}
      disabled={state === 'disabled'}
    >
      {message}
    </PrimaryButton>
  );
}
