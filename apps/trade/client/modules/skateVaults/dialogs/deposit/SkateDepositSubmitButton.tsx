import { WithClassnames } from '@vertex-protocol/web-common';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { HANDLED_BUTTON_USER_STATE_ERRORS } from 'client/components/ValidUserStatePrimaryButton/useButtonUserStateErrorProps';
import { ValidUserStatePrimaryButton } from 'client/components/ValidUserStatePrimaryButton/ValidUserStatePrimaryButton';
import { OnChainActionButtonStateWithApproval } from 'client/types/OnChainActionButtonStateWithApproval';

interface Props extends WithClassnames {
  state: OnChainActionButtonStateWithApproval;
}

export function SkateDepositSubmitButton({ className, state }: Props) {
  const message = {
    disabled: 'Enter Amount',
    approve_idle: 'Approve',
    approve_success: <ButtonStateContent.Success message="Approved" />,
    approve_loading: 'Confirm Approval',
    loading: 'Confirm Deposit',
    success: <ButtonStateContent.Success message="Deposited" />,
    idle: 'Deposit',
  }[state];

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
