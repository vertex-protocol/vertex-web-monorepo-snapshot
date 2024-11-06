import { WithClassnames } from '@vertex-protocol/web-common';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { HANDLED_BUTTON_USER_STATE_ERRORS } from 'client/components/ValidUserStatePrimaryButton/useButtonUserStateErrorProps';
import { ValidUserStatePrimaryButton } from 'client/components/ValidUserStatePrimaryButton/ValidUserStatePrimaryButton';
import { StakeVrtxActionButtonState } from 'client/modules/rewards/dialogs/staking/StakeVrtxDialog/useStakeVrtxForm';

interface Props extends WithClassnames {
  state: StakeVrtxActionButtonState;
}

export function StakeVrtxSubmitButton({ className, state }: Props) {
  const message = (() => {
    switch (state) {
      case 'disabled':
        return 'Enter Amount';
      case 'approve_loading':
        return 'Approve Asset';
      case 'approve_success':
        return <ButtonStateContent.Success message="Approval Successful" />;
      case 'approve_idle':
        return 'Approve';
      case 'loading':
        return 'Confirm Stake';
      case 'success':
        return <ButtonStateContent.Success message="Staking Successful" />;
      case 'idle':
        return 'Stake';
    }
  })();

  const isLoading = state === 'approve_loading' || state === 'loading';

  return (
    <ValidUserStatePrimaryButton
      type="submit"
      className={className}
      isLoading={isLoading}
      disabled={state === 'disabled'}
      handledErrors={
        HANDLED_BUTTON_USER_STATE_ERRORS.onlyIncorrectConnectedChain
      }
    >
      {message}
    </ValidUserStatePrimaryButton>
  );
}
