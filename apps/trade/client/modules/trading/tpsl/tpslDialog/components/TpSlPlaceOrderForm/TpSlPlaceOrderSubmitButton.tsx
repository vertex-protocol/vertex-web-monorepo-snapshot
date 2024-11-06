import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { HANDLED_BUTTON_USER_STATE_ERRORS } from 'client/components/ValidUserStatePrimaryButton/useButtonUserStateErrorProps';
import { ValidUserStatePrimaryButton } from 'client/components/ValidUserStatePrimaryButton/ValidUserStatePrimaryButton';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';

interface Props {
  state: BaseActionButtonState;
  isTakeProfit: boolean;
}

export const TpSlPlaceOrderSubmitButton = ({ state, isTakeProfit }: Props) => {
  const message = (() => {
    const orderTypeLabel = isTakeProfit ? 'Take Profit' : 'Stop Loss';

    switch (state) {
      case 'disabled':
        return `Enter ${orderTypeLabel}`;
      case 'loading':
        return `Placing Order`;
      case 'success':
        return <ButtonStateContent.Success message="Order Submitted" />;
      case 'idle':
        return `Place ${orderTypeLabel}`;
    }
  })();

  return (
    <ValidUserStatePrimaryButton
      type="submit"
      isLoading={state === 'loading'}
      disabled={state === 'disabled'}
      handledErrors={
        HANDLED_BUTTON_USER_STATE_ERRORS.onlyIncorrectConnectedChain
      }
    >
      {message}
    </ValidUserStatePrimaryButton>
  );
};
