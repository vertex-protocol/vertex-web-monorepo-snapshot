import { PrimaryButton } from '@vertex-protocol/web-ui';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { useMemo } from 'react';

export const ClosePositionButton = ({
  state,
  onSubmit,
}: {
  onSubmit: () => void;
  state: BaseActionButtonState;
}) => {
  const message = useMemo(() => {
    switch (state) {
      case 'disabled':
        return 'Choose % to Close';
      case 'loading':
        return (
          <ButtonStateContent.Loading singleSignatureMessage="Placing Order" />
        );
      case 'success':
        return <ButtonStateContent.Success message="Market Close Submitted" />;
      case 'idle':
        return 'Market Close';
    }
  }, [state]);

  return (
    <PrimaryButton
      size="lg"
      type="submit"
      isLoading={state === 'loading'}
      disabled={state === 'disabled'}
      onClick={onSubmit}
    >
      {message}
    </PrimaryButton>
  );
};
