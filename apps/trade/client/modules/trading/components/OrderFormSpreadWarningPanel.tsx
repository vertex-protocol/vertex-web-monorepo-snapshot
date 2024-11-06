import { WarningPanel } from 'client/components/WarningPanel';

export function OrderFormSpreadWarningPanel() {
  return (
    <WarningPanel title="Spread is High">
      Manage your risk by adjusting slippage tolerance or using limit orders.
    </WarningPanel>
  );
}
