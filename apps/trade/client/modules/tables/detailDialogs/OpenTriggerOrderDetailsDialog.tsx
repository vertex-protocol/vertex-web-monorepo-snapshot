import { getMarketPriceFormatSpecifier } from '@vertex-protocol/react-client';
import { SecondaryButton } from '@vertex-protocol/web-ui';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { TableDetailDialog } from 'client/modules/tables/detailDialogs/components/base/TableDetailDialog';
import { getOrderSideLabel } from 'client/modules/trading/utils/getOrderSideLabel';
import { getOrderTypeLabel } from 'client/modules/trading/utils/getOrderTypeLabel';
import {
  TimeFormatSpecifier,
  formatTimestamp,
} from 'client/utils/formatTimestamp';
import { signDependentValue } from 'client/utils/signDependentValue';
import { OpenTriggerOrderTableItem } from '../hooks/useOpenTriggerOrdersTable';
import { ProductHeader } from './components/ProductHeader';
import { useOpenOrderDetailsDialog } from './hooks/useOpenOrderDetailsDialog';

export type OpenTriggerOrderDetailsDialogParams = OpenTriggerOrderTableItem;

export function OpenTriggerOrderDetailsDialog({
  productId,
  timePlacedMillis,
  marketInfo,
  digest,
  triggerPrice: price,
  orderType,
  totalAmount,
  orderPrice,
  totalSize,
}: OpenTriggerOrderDetailsDialogParams) {
  const {
    sizeFormatSpecifier,
    isPerp,
    disableCancelOrder,
    cancelOrderHandler,
  } = useOpenOrderDetailsDialog({
    isTrigger: true,
    orderType,
    productId,
    digest,
    marketInfo,
    price,
    totalAmount,
  });

  const { symbol, amountForSide, icon, marketName } = marketInfo;

  const metricItems = (
    <div className="flex flex-col gap-y-4">
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Time"
        valueContent={formatTimestamp(timePlacedMillis, {
          formatSpecifier: TimeFormatSpecifier.MONTH_D_YYYY,
        })}
        valueEndElement={formatTimestamp(timePlacedMillis, {
          formatSpecifier: TimeFormatSpecifier.HH_MM_SS_12H,
        })}
      />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Type"
        valueClassName="text-text-tertiary uppercase"
        valueContent={getOrderTypeLabel(orderType)}
      />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Action"
        valueClassName={signDependentValue(amountForSide, {
          positive: 'text-positive',
          negative: 'text-negative',
          zero: 'text-text-secondary',
        })}
        valueContent={getOrderSideLabel({
          isPerp,
          alwaysShowOrderDirection: true,
          amountForSide,
        })}
      />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Trigger Price"
        value={price}
        numberFormatSpecifier={getMarketPriceFormatSpecifier(
          marketInfo.priceIncrement,
        )}
      />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Amount"
        numberFormatSpecifier={sizeFormatSpecifier}
        value={totalSize}
        valueEndElement={symbol}
      />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Limit Price"
        tooltip={{ id: 'triggerOrderLimitPrice' }}
        value={orderPrice}
        numberFormatSpecifier={getMarketPriceFormatSpecifier(
          marketInfo.priceIncrement,
        )}
      />
    </div>
  );

  const header = (
    <ProductHeader
      iconSrc={icon.asset}
      productName={marketName}
      isPerp={isPerp}
    />
  );

  const actions = (
    <SecondaryButton
      className="w-full"
      destructive
      size="sm"
      title="Cancel Order"
      disabled={disableCancelOrder}
      onClick={cancelOrderHandler}
    >
      Cancel Order
    </SecondaryButton>
  );

  return (
    <TableDetailDialog
      title="Trigger Order"
      header={header}
      metricItems={metricItems}
      actions={actions}
    />
  );
}
