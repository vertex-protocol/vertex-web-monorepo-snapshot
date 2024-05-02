import { OrderFormWarningPanel } from './OrderFormWarningPanel';

export function OrderFormTpSlWarningPanel() {
  return (
    <OrderFormWarningPanel
      title="TP/SL orders will cancel"
      content="Placing this order will cancel TP/SL orders for your existing position. You will need to recreate TP/SL orders for the position."
    />
  );
}
