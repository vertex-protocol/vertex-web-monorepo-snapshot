import {
  CustomNumberFormatSpecifier,
  formatNumber,
  getMarketPriceFormatSpecifier,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { CounterPill } from '@vertex-protocol/web-ui';
import { ActionToast } from 'client/components/Toast/ActionToast/ActionToast';
import { Toast } from 'client/components/Toast/Toast';
import { ToastProps } from 'client/components/Toast/types';
import { ROUTES } from 'client/modules/app/consts/routes';
import { NotificationPositionInfo } from 'client/modules/notifications/components/NotificationPositionInfo';
import { PartialFillIcon } from 'client/modules/notifications/components/orders/OrderFillNotification/PartialFillIcon';
import { useOrderFilledNotification } from 'client/modules/notifications/components/orders/OrderFillNotification/useOrderFilledNotification';
import { OrderNotificationValueItem } from 'client/modules/notifications/components/orders/OrderNotificationValueItem';
import { OrderFillNotificationData } from 'client/modules/notifications/types';
import { getOrderTypeLabel } from 'client/modules/trading/utils/getOrderTypeLabel';

interface OrderFillNotificationProps extends ToastProps {
  data: OrderFillNotificationData;
}

export function OrderFillNotification({
  data,
  visible,
  ttl,
  onDismiss,
}: OrderFillNotificationProps) {
  const notificationData = useOrderFilledNotification(data);

  if (!notificationData) {
    return null;
  }

  const {
    decimalAdjustedFilledAmount,
    fillStatus,
    fillPrice,
    orderType,
    isTriggerOrder,
    isUnfilledLimitOrder,
    market,
    metadata,
    fractionFilled,
    currentFilledAmount,
  } = notificationData;

  const orderInfoContent = (
    <>
      <OrderNotificationValueItem
        label="Amount"
        value={
          <div className="flex flex-col gap-y-1">
            <div className="flex items-center gap-x-2">
              {formatNumber(decimalAdjustedFilledAmount.abs(), {
                formatSpecifier: CustomNumberFormatSpecifier.NUMBER_PRECISE,
              })}
              <CounterPill>{metadata.symbol}</CounterPill>
            </div>
            {fillStatus === 'partial' && (
              <div className="text-text-tertiary text-2xs">
                {`(${formatNumber(fractionFilled, {
                  formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_INT,
                })} of order)`}
              </div>
            )}
          </div>
        }
      />
      <OrderNotificationValueItem
        label="Avg. Price"
        value={formatNumber(fillPrice, {
          formatSpecifier: getMarketPriceFormatSpecifier(
            metadata.priceIncrement,
          ),
        })}
      />
      <Toast.FooterLink
        href={
          isUnfilledLimitOrder
            ? ROUTES.portfolio.orders
            : ROUTES.portfolio.history
        }
        className="pt-1"
      >
        View {isUnfilledLimitOrder ? 'Open Orders' : 'History'}
      </Toast.FooterLink>
    </>
  );

  const headingStatusText = (() => {
    if (isTriggerOrder) {
      return 'Triggered';
    }

    if (fillStatus === 'partial') {
      return 'Partial Fill';
    }

    return 'Filled';
  })();

  return (
    <ActionToast.Container visible={visible}>
      <ActionToast.SectionedHeader
        variant="success"
        leftLabel={getOrderTypeLabel(orderType)}
        rightLabel={headingStatusText}
        onDismiss={onDismiss}
        icon={fillStatus === 'partial' ? PartialFillIcon : undefined} // If undefined `icon` uses the default icon set in component
      />
      <ActionToast.Separator variant="success" ttl={ttl} />
      <ActionToast.SectionedBody
        leftSection={
          <NotificationPositionInfo
            productType={market.type}
            isLong={currentFilledAmount.isPositive()}
            metadata={metadata}
          />
        }
        rightSection={orderInfoContent}
      />
    </ActionToast.Container>
  );
}
