import { PrimaryButton } from '@vertex-protocol/web-ui';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
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
    <PrimaryButton
      size="lg"
      type="submit"
      isLoading={state === 'loading'}
      disabled={state === 'disabled'}
    >
      {message}
    </PrimaryButton>
  );
};
