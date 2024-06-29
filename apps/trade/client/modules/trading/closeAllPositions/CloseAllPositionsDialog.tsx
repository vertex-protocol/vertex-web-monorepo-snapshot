import { SecondaryButton, TextButton } from '@vertex-protocol/web-ui';
import { BaseDialog } from 'client/components/BaseDialog/BaseDialog';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useCloseAllPositionsDialog } from 'client/modules/trading/closeAllPositions/hooks/useCloseAllPositionsDialog';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { useMemo } from 'react';

export function CloseAllPositionsDialog() {
  const { hide } = useDialog();
  const { onSubmit, buttonState } = useCloseAllPositionsDialog();

  return (
    <BaseAppDialog onClose={hide}>
      <BaseDialog.Title onClose={hide}>Close All Positions</BaseDialog.Title>
      <BaseDialog.Body className="flex flex-col gap-y-8 text-sm">
        <p>Are you sure you want to close all of your positions?</p>
        <ActionButtons
          hide={hide}
          closeAllPositions={onSubmit}
          buttonState={buttonState}
        />
      </BaseDialog.Body>
    </BaseAppDialog>
  );
}

interface ActionButtonsProps {
  hide: () => void;
  closeAllPositions: () => void;
  buttonState: BaseActionButtonState;
}

function ActionButtons({
  hide,
  closeAllPositions,
  buttonState,
}: ActionButtonsProps) {
  const message = useMemo(() => {
    switch (buttonState) {
      case 'loading':
        return (
          <ButtonStateContent.Loading singleSignatureMessage="Closing All Positions" />
        );
      case 'success':
        return <ButtonStateContent.Success message="Orders Submitted" />;
      default:
        return 'Close All';
    }
  }, [buttonState]);

  return (
    <div className="flex flex-col gap-y-3">
      <SecondaryButton
        destructive
        isLoading={buttonState === 'loading'}
        onClick={closeAllPositions}
      >
        {message}
      </SecondaryButton>
      <TextButton onClick={hide}>Cancel</TextButton>
    </div>
  );
}
