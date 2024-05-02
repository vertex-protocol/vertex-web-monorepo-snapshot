import { SecondaryButton } from '@vertex-protocol/web-ui';
import { LineItem } from 'client/components/LineItem/LineItem';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { TableDetailDialog } from 'client/modules/tables/detailDialogs/components/base/TableDetailDialog';
import { getOrderSideLabel } from 'client/modules/trading/utils/getOrderSideLabel';
import { getOrderTypeLabel } from 'client/modules/trading/utils/getOrderTypeLabel';
import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from 'client/utils/formatNumber/NumberFormatSpecifier';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { getMarketPriceFormatSpecifier } from 'client/utils/formatNumber/getMarketPriceFormatSpecifier';
import {
  TimeFormatSpecifier,
  formatTimestamp,
} from 'client/utils/formatTimestamp';
import { signDependentValue } from 'client/utils/signDependentValue';
import { OpenEngineOrderTableItem } from '../hooks/useOpenEngineOrdersTable';
import { ProductHeader } from './components/ProductHeader';
import { useOpenOrderDetailsDialog } from './hooks/useOpenOrderDetailsDialog';

export type OpenEngineOrderDetailsDialogParams = OpenEngineOrderTableItem;

export function OpenEngineOrderDetailsDialog({
  productId,
  timePlacedMillis,
  marketInfo,
  digest,
  price,
  orderType,
  totalAmount,
  totalCost,
  filled,
  unfilled,
}: OpenEngineOrderDetailsDialogParams) {
  const { primaryQuoteToken } = useVertexMetadataContext();
  const {
    sizeFormatSpecifier,
    isPerp,
    disableCancelOrder,
    cancelOrderHandler,
  } = useOpenOrderDetailsDialog({
    isTrigger: false,
    orderType,
    productId,
    digest,
    marketInfo,
    price,
    totalAmount,
  });

  const { amount: filledAmount, fraction: filledFraction } = filled;
  const { amount: unfilledAmount } = unfilled;
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
        label="Price"
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
        value={totalAmount}
      />
      <LineItem.Metric
        label="Total"
        renderValue={(val) => (
          <div className="flex gap-x-1">
            {formatNumber(val, {
              formatSpecifier: CustomNumberFormatSpecifier.NUMBER_AUTO,
            })}
            <div className="text-text-tertiary">{primaryQuoteToken.symbol}</div>
          </div>
        )}
        value={totalCost}
      />
      <LineItem.Metric
        label="Filled"
        renderValue={(val) => (
          <div className="flex gap-x-1">
            {formatNumber(val?.filledAmount, {
              formatSpecifier: sizeFormatSpecifier,
            })}
            <div className="text-text-tertiary">{symbol}</div>
            <div className="text-text-tertiary">
              (
              {formatNumber(val?.filledFraction, {
                formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
              })}
              )
            </div>
          </div>
        )}
        value={{ filledAmount, filledFraction }}
      />
      <LineItem.Metric
        label="Unfilled"
        renderValue={(val) => (
          <div className="flex gap-x-1">
            {formatNumber(val, {
              formatSpecifier: sizeFormatSpecifier,
            })}
            <div className="text-text-tertiary">{symbol}</div>
          </div>
        )}
        value={unfilledAmount}
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
      title="Limit Order"
      header={header}
      metricItems={metricItems}
      actions={actions}
    />
  );
}
