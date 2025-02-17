import { ProductEngineType } from '@vertex-protocol/contracts';
import { toBigDecimal } from '@vertex-protocol/utils';
import { joinClassNames } from '@vertex-protocol/web-common';
import { ActionToast } from 'client/components/Toast/ActionToast/ActionToast';
import { ToastProps } from 'client/components/Toast/types';
import { CancelOrderNotificationData } from 'client/modules/notifications/types';
import { getOrderSideLabel } from 'client/modules/trading/utils/getOrderSideLabel';
import { getOrderTypeLabel } from 'client/modules/trading/utils/getOrderTypeLabel';
import { CustomNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { formatNumber } from '@vertex-protocol/react-client';
import { signDependentValue } from '@vertex-protocol/react-client';
import { isTpSlOrderSize } from 'client/modules/trading/tpsl/utils/isTpSlOrderSize';

interface CancelOrderNotificationProps extends ToastProps {
  data: CancelOrderNotificationData['cancelOrderParams'];
}

export function CancelOrderSuccessNotification({
  data,
  visible,
  ttl,
  onDismiss,
}: CancelOrderNotificationProps) {
  const { decimalAdjustedAmount, metadata, type, orderType } = data;
  const isPerp = type === ProductEngineType.PERP;

  const orderDetails = (() => {
    // If this is for a TP/SL order, the amount is a very large number only
    // meant for internal use, so we just show the market name.
    if (isTpSlOrderSize(decimalAdjustedAmount)) {
      return metadata.marketName;
    }

    const decimalAdjustedAmountAbs = toBigDecimal(decimalAdjustedAmount).abs();
    const amount = formatNumber(decimalAdjustedAmountAbs, {
      formatSpecifier: CustomNumberFormatSpecifier.NUMBER_PRECISE,
    });

    return `${amount} ${metadata.marketName}`;
  })();

  const side = getOrderSideLabel({
    alwaysShowOrderDirection: false,
    amountForSide: decimalAdjustedAmount,
    isPerp,
  });

  const bodyContent = (
    <>
      You have successfully cancelled your{' '}
      <span className="text-text-primary">{orderDetails}</span>{' '}
      <span
        className={joinClassNames(
          'uppercase',
          signDependentValue(decimalAdjustedAmount, {
            positive: 'text-positive',
            negative: 'text-negative',
            zero: undefined,
          }),
        )}
      >
        {side}
      </span>{' '}
      order.
    </>
  );

  return (
    <ActionToast.Container visible={visible}>
      <ActionToast.TextHeader variant="success" onDismiss={onDismiss}>
        {getOrderTypeLabel(orderType)} Cancelled
      </ActionToast.TextHeader>
      <ActionToast.Separator variant="success" ttl={ttl} />
      <ActionToast.Body variant="success">{bodyContent}</ActionToast.Body>
    </ActionToast.Container>
  );
}
