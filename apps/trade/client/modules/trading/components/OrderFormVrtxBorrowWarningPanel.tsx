import { VRTX_TOKEN_INFO } from 'common/productMetadata/vertexTokenInfo';
import { OrderFormWarningPanel } from './OrderFormWarningPanel';

export function OrderFormVrtxBorrowWarningPanel() {
  return (
    <OrderFormWarningPanel
      title="No Borrows"
      content={`Borrows are not permitted for ${VRTX_TOKEN_INFO.symbol}. You may only trade with your deposited ${VRTX_TOKEN_INFO.symbol}.`}
    />
  );
}
