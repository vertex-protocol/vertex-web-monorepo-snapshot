import { ButtonHelperInfo } from '@vertex-protocol/web-ui';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { HANDLED_BUTTON_USER_STATE_ERRORS } from 'client/components/ValidUserStatePrimaryButton/useButtonUserStateErrorProps';
import { ValidUserStatePrimaryButton } from 'client/components/ValidUserStatePrimaryButton/ValidUserStatePrimaryButton';
import {
  SignatureModeSlowModeSettingsAction,
  SignatureModeSlowModeSettingsActionButtonState,
} from 'client/modules/singleSignatureSessions/components/SignatureModeSlowModeSettingsDialog/hooks/types';

interface Props {
  buttonState: SignatureModeSlowModeSettingsActionButtonState;
  userAction: SignatureModeSlowModeSettingsAction | undefined;
}

export function SlowModeSettingsActionButton({
  buttonState,
  userAction,
}: Props) {
  const buttonContent = (() => {
    switch (buttonState) {
      case 'success':
        return <ButtonStateContent.Success message="Trading Mode Saved" />;
      case 'approve_success':
        return <ButtonStateContent.Success message="Fee Approved" />;
      case 'idle':
        switch (userAction) {
          case 'requires_fee_approval':
            return `Approve Fee`;
          case 'execute_slow_mode':
            return 'Save & Send Transaction';
          case 'save_without_tx':
            return 'Save';
          case undefined:
            // This shouldn't ever be the case
            return '';
        }
      case 'loading':
        if (userAction === 'save_without_tx') {
          return 'Saving';
        }
        return 'Confirm Transaction';
      case 'disabled':
        return 'Save';
    }
  })();

  return (
    <ButtonHelperInfo.Container>
      <ValidUserStatePrimaryButton
        type="submit"
        isLoading={buttonState === 'loading'}
        disabled={buttonState === 'disabled'}
        handledErrors={
          HANDLED_BUTTON_USER_STATE_ERRORS.onlyIncorrectConnectedChain
        }
      >
        {buttonContent}
      </ValidUserStatePrimaryButton>
      {buttonState === 'success' && (
        <ButtonHelperInfo.Content>
          You may now close this dialog. It may take a minute for 1CT to be
          enabled.
        </ButtonHelperInfo.Content>
      )}
    </ButtonHelperInfo.Container>
  );
}
