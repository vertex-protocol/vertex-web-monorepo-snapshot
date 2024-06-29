import { ProductEngineType } from '@vertex-protocol/contracts';
import { toBigDecimal } from '@vertex-protocol/utils';
import { ActionToast } from 'client/components/Toast/ActionToast/ActionToast';
import { ToastProps } from 'client/components/Toast/types';
import { PlaceOrderNotificationData } from 'client/modules/notifications/types';
import { getOrderSideLabel } from 'client/modules/trading/utils/getOrderSideLabel';
import { removeDecimals } from '@vertex-protocol/utils';
import { capitalize } from 'lodash';

interface PlaceOrderErrorProps extends ToastProps {
  orderData: PlaceOrderNotificationData;
  error: string;
}

export function PlaceOrderErrorNotification({
  orderData,
  error,
  visible,
  ttl,
  onDismiss,
}: PlaceOrderErrorProps) {
  const decimalAdjustedAmount = removeDecimals(
    toBigDecimal(orderData.placeOrderParams.amount),
  );
  const isPerp = orderData.orderMarketType === ProductEngineType.PERP;

  const orderSide = getOrderSideLabel({
    isPerp,
    alwaysShowOrderDirection: false,
    amountForSide: decimalAdjustedAmount,
  });

  return (
    <ActionToast.Container visible={visible}>
      <ActionToast.SectionedHeader
        variant="failure"
        onDismiss={onDismiss}
        leftLabel={`${capitalize(orderData.orderPriceType)} ${orderSide}`}
        rightLabel="Order Failed"
      />
      <ActionToast.Separator variant="failure" ttl={ttl} />
      <ActionToast.Body variant="failure">
        Your order was not placed: {error}
      </ActionToast.Body>
    </ActionToast.Container>
  );
}
