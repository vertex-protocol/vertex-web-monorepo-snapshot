import { PrimaryButton } from '@vertex-protocol/web-ui';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { useMemo } from 'react';

interface Props {
  state: BaseActionButtonState;
}

export function CustomizeReferralLinkSubmitButton({ state }: Props) {
  const message = useMemo(() => {
    switch (state) {
      case 'disabled':
        return `Enter a Code`;
      case 'loading':
        return `Sign Message`;
      case 'success':
        return <ButtonStateContent.Success message="Success" />;
      case 'idle':
        return `Customize`;
    }
  }, [state]);

  return (
    <PrimaryButton
      type="submit"
      disabled={state === 'disabled'}
      isLoading={state === 'loading'}
    >
      {message}
    </PrimaryButton>
  );
}
