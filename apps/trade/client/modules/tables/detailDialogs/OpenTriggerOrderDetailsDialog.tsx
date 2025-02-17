import {
  formatNumber,
  getMarketPriceFormatSpecifier,
} from '@vertex-protocol/react-client';
import {
  SecondaryButton,
  formatTimestamp,
  TimeFormatSpecifier,
} from '@vertex-protocol/web-ui';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { TableDetailDialog } from 'client/modules/tables/detailDialogs/components/base/TableDetailDialog';
import { ProductHeader } from 'client/modules/tables/detailDialogs/components/ProductHeader';
import { useOpenOrderDetailsDialog } from 'client/modules/tables/detailDialogs/hooks/useOpenOrderDetailsDialog';
import { OpenTriggerOrderTableItem } from 'client/modules/tables/hooks/useOpenTriggerOrdersTable';
import { getOrderSideLabel } from 'client/modules/trading/utils/getOrderSideLabel';
import { getOrderTypeLabel } from 'client/modules/trading/utils/getOrderTypeLabel';
import { signDependentValue } from '@vertex-protocol/react-client';
import { isTpSlOrderSize } from 'client/modules/trading/tpsl/utils/isTpSlOrderSize';

export type OpenTriggerOrderDetailsDialogParams = OpenTriggerOrderTableItem;

export function OpenTriggerOrderDetailsDialog({
  productId,
  timePlacedMillis,
  marketInfo,
  digest,
  triggerPrice: price,
  orderType,
  marginModeType,
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

  const { amountForSide, icon, marketName } = marketInfo;

  const metricItems = (
    <div className="flex flex-col gap-y-2">
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
        valueContent={getOrderTypeLabel(orderType, marginModeType)}
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
        valueContent={
          isTpSlOrderSize(totalSize)
            ? 'MAX'
            : formatNumber(totalSize, {
                formatSpecifier: sizeFormatSpecifier,
              })
        }
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
      destructive
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
