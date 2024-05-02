import { SecondaryButton } from '@vertex-protocol/web-ui';
import { LineItem } from 'client/components/LineItem/LineItem';
import { TableDetailDialog } from 'client/modules/tables/detailDialogs/components/base/TableDetailDialog';
import { getOrderSideLabel } from 'client/modules/trading/utils/getOrderSideLabel';
import { getOrderTypeLabel } from 'client/modules/trading/utils/getOrderTypeLabel';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { getMarketPriceFormatSpecifier } from 'client/utils/formatNumber/getMarketPriceFormatSpecifier';
import {
  formatTimestamp,
  TimeFormatSpecifier,
} from 'client/utils/formatTimestamp';
import { signDependentValue } from 'client/utils/signDependentValue';
import { OpenTriggerOrderTableItem } from '../hooks/useOpenTriggerOrdersTable';
import { ProductHeader } from './components/ProductHeader';
import { useOpenOrderDetailsDialog } from './hooks/useOpenOrderDetailsDialog';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';

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
      <LineItem.Metric
        label="Time"
        renderValue={(val) => (
          <div className="flex gap-x-1.5">
            {formatTimestamp(val, {
              formatSpecifier: TimeFormatSpecifier.MONTH_D_YYYY,
            })}
            <div className="text-text-tertiary">
              {formatTimestamp(val, {
                formatSpecifier: TimeFormatSpecifier.HH_MM_SS_12H,
              })}
            </div>
          </div>
        )}
        value={timePlacedMillis}
      />
      <LineItem.Metric
        label="Type"
        valueClassName="text-text-tertiary uppercase"
        renderValue={(val) => (val ? getOrderTypeLabel(val) : undefined)}
        value={orderType}
      />
      <LineItem.Metric
        label="Action"
        renderValue={(val) => (
          <div
            className={signDependentValue(val, {
              positive: 'text-positive',
              negative: 'text-negative',
              zero: 'text-text-secondary',
            })}
          >
            {getOrderSideLabel({
              isPerp,
              alwaysShowOrderDirection: true,
              amountForSide,
            })}
          </div>
        )}
        value={amountForSide}
      />
      <LineItem.Metric
        label="Trigger Price"
        renderValue={getMarketPriceFormatSpecifier(marketInfo.priceIncrement)}
        value={price}
      />
      <LineItem.Metric
        label="Amount"
        renderValue={(val) => (
          <div className="flex gap-x-1">
            {formatNumber(val, {
              formatSpecifier: sizeFormatSpecifier,
            })}
            <div className="text-text-tertiary">{symbol}</div>
          </div>
        )}
        value={totalSize}
      />
      <LineItem.Metric
        label="Limit Price"
        tooltip={{ id: 'triggerOrderLimitPrice' }}
        renderValue={getMarketPriceFormatSpecifier(marketInfo.priceIncrement)}
        value={orderPrice}
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
