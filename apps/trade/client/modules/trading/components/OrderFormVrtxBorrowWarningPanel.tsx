import { WarningPanel } from 'client/components/WarningPanel';
import { VRTX_TOKEN_INFO } from '@vertex-protocol/react-client';

export function OrderFormVrtxBorrowWarningPanel() {
  return (
    <WarningPanel title="No Borrows">
      Borrows are not permitted for {VRTX_TOKEN_INFO.symbol}. You may only trade
      with your deposited {VRTX_TOKEN_INFO.symbol}.
    </WarningPanel>
  );
}
