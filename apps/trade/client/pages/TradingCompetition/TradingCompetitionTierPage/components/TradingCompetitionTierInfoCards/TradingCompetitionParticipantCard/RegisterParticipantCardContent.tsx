import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { HANDLED_BUTTON_USER_STATE_ERRORS } from 'client/components/ValidUserStatePrimaryButton/useButtonUserStateErrorProps';
import { ValidUserStatePrimaryButton } from 'client/components/ValidUserStatePrimaryButton/ValidUserStatePrimaryButton';
import { useExecuteRegisterForTier } from 'client/hooks/execute/tradingCompetition/useExecuteRegisterForTier';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { TradingCompetitionCard } from 'client/pages/TradingCompetition/components/TradingCompetitionInfoCards/TradingCompetitionCard';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { useCallback } from 'react';

interface Props {
  contestId: number;
  currentTier: number;
  isRegisteredForOtherTier: boolean;
  requiresInitialDeposit: boolean;
  isContestPending: boolean;
}

export function RegisterParticipantCardContent({
  contestId,
  currentTier,
  isRegisteredForOtherTier,
  requiresInitialDeposit,
  isContestPending,
}: Props) {
  const { mutateAsync, isSuccess, isPending } = useExecuteRegisterForTier();
  const { dispatchNotification } = useNotificationManagerContext();
  const { show } = useDialog();
  const isConnected = useIsConnected();

  const registerForTier = useCallback(() => {
    const serverExecutionResult = mutateAsync({ contestId });

    dispatchNotification({
      type: 'action_error_handler',
      data: {
        errorNotificationTitle: 'Tier Registration Failed',
        executionData: {
          serverExecutionResult,
        },
      },
    });
  }, [mutateAsync, contestId, dispatchNotification]);

  const buttonState: BaseActionButtonState = (() => {
    if (requiresInitialDeposit) {
      return 'idle';
    }
    if (isPending) {
      return 'loading';
    }
    if (isSuccess) {
      return 'success';
    }
    if (!isConnected || isContestPending) {
      return 'disabled';
    }
    return 'idle';
  })();

  const registerButtonMessage = (() => {
    switch (buttonState) {
      case 'loading':
        return isRegisteredForOtherTier ? 'Switching' : 'Registering';
      case 'success':
        return (
          <ButtonStateContent.Success
            message={isRegisteredForOtherTier ? 'Switched' : 'Registered'}
          />
        );
      case 'idle':
      case 'disabled':
        return `${
          isRegisteredForOtherTier ? 'Switch to' : 'Register for'
        } tier ${currentTier}`;
    }
  })();

  const buttonProps = (() => {
    if (requiresInitialDeposit) {
      return {
        onClick: () => show({ type: 'deposit', params: {} }),
        children: 'Deposit',
      };
    }

    return {
      onClick: registerForTier,
      children: registerButtonMessage,
    };
  })();

  const subheading = (() => {
    if (requiresInitialDeposit) {
      return 'You need to fund your account before registering';
    }

    return isContestPending
      ? 'Registration will open once contest has started'
      : 'You need to register to join this tier';
  })();

  return (
    <>
      <TradingCompetitionCard.Body className="justify-between gap-y-4">
        <div className="flex flex-col sm:basis-3/5">
          <span className="text-text-primary text-xl">Register</span>
          <span className="text-xs">{subheading}</span>
        </div>
        <div className="flex w-full flex-col items-center gap-y-1.5 sm:w-auto">
          <ValidUserStatePrimaryButton
            handledErrors={
              HANDLED_BUTTON_USER_STATE_ERRORS.onlyIncorrectConnectedChain
            }
            isLoading={buttonState === 'loading'}
            disabled={buttonState === 'disabled'}
            className="w-full"
            {...buttonProps}
          />
          {!requiresInitialDeposit && (
            <span className="text-xs">Requires 1 signature</span>
          )}
        </div>
      </TradingCompetitionCard.Body>
      <TradingCompetitionCard.Footer>
        You can only register for one tier per account.
      </TradingCompetitionCard.Footer>
    </>
  );
}
