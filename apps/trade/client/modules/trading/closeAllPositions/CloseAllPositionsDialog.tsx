import {
  PrimaryButton,
  SecondaryButton,
  TextButton,
} from '@vertex-protocol/web-ui';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import {
  HANDLED_BUTTON_USER_STATE_ERRORS,
  useButtonUserStateErrorProps,
} from 'client/components/ValidUserStatePrimaryButton/useButtonUserStateErrorProps';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useCloseAllPositionsDialog } from 'client/modules/trading/closeAllPositions/hooks/useCloseAllPositionsDialog';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { useMemo } from 'react';

export function CloseAllPositionsDialog() {
  const { hide } = useDialog();
  const { onSubmit, buttonState } = useCloseAllPositionsDialog();

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title onClose={hide}>
        Close All Positions
      </BaseAppDialog.Title>
      <BaseAppDialog.Body>
        <p>Are you sure you want to close all of your positions?</p>
        <ActionButtons
          hide={hide}
          closeAllPositions={onSubmit}
          buttonState={buttonState}
        />
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
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
  const userStateErrorButtonProps = useButtonUserStateErrorProps({
    handledErrors: HANDLED_BUTTON_USER_STATE_ERRORS.onlyIncorrectConnectedChain,
  });

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

  const actionButton = (() => {
    if (userStateErrorButtonProps) {
      return <PrimaryButton {...userStateErrorButtonProps} />;
    }

    return (
      <SecondaryButton
        destructive
        isLoading={buttonState === 'loading'}
        onClick={closeAllPositions}
      >
        {message}
      </SecondaryButton>
    );
  })();

  return (
    <div className="flex flex-col gap-y-3">
      {actionButton}
      <TextButton colorVariant="secondary" onClick={hide}>
        Cancel
      </TextButton>
    </div>
  );
}
