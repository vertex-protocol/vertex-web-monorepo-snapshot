import { ErrorPanel } from 'client/components/ErrorPanel';
import { TriggerOrderEnableOneClickTradingInfo } from 'client/modules/trading/components/TriggerOrderEnableOneClickTradingInfo';
import { OrderFormError } from 'client/modules/trading/types';

interface Props {
  formError: OrderFormError | undefined;
}

export function TradingErrorPanel({ formError }: Props) {
  const errorContent = (() => {
    switch (formError) {
      case 'trigger_order_single_signature_disabled':
        return <TriggerOrderEnableOneClickTradingInfo />;
      case 'zero_buying_power_only_fok':
        return 'You have no buying power. Deposit more collateral or close open positions via market orders.';
      default:
        return null;
    }
  })();

  if (!errorContent) {
    return null;
  }

  return <ErrorPanel>{errorContent}</ErrorPanel>;
}
