import {
  CustomNumberFormatSpecifier,
  formatNumber,
  getMarketPriceFormatSpecifier,
  PresetNumberFormatSpecifier,
  signDependentValue,
  useVertexMetadataContext,
} from '@vertex-protocol/react-client';
import {
  formatTimestamp,
  SecondaryButton,
  TimeFormatSpecifier,
} from '@vertex-protocol/web-ui';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { TableDetailDialog } from 'client/modules/tables/detailDialogs/components/base/TableDetailDialog';
import { ProductHeader } from 'client/modules/tables/detailDialogs/components/ProductHeader';
import { useOpenOrderDetailsDialog } from 'client/modules/tables/detailDialogs/hooks/useOpenOrderDetailsDialog';
import { OpenEngineOrderTableItem } from 'client/modules/tables/hooks/useOpenEngineOrdersTable';
import { getOrderSideLabel } from 'client/modules/trading/utils/getOrderSideLabel';
import { getOrderTypeLabel } from 'client/modules/trading/utils/getOrderTypeLabel';

export type OpenEngineOrderDetailsDialogParams = OpenEngineOrderTableItem;

export function OpenEngineOrderDetailsDialog({
  productId,
  timePlacedMillis,
  marketInfo,
  digest,
  price,
  orderType,
  isoMarginTransfer,
  marginModeType,
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
    navigateToTradePage,
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
  const { symbol, quoteSymbol, amountForSide, icon, marketName } = marketInfo;

  const metricItems = (
    <div className="flex flex-col gap-y-2">
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Time"
        valueContent={formatTimestamp(timePlacedMillis, {
          formatSpecifier: TimeFormatSpecifier.MONTH_D_YYYY,
        })}
        valueClassName="gap-x-1.5"
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
        label="Price"
        numberFormatSpecifier={getMarketPriceFormatSpecifier(
          marketInfo.priceIncrement,
        )}
        value={price}
      />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Amount"
        value={totalAmount}
        numberFormatSpecifier={sizeFormatSpecifier}
        valueEndElement={symbol}
      />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Total"
        value={totalCost}
        numberFormatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
        valueEndElement={primaryQuoteToken.symbol}
      />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Margin"
        value={isoMarginTransfer}
        numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
        // If no margin transfer, show just `-` without the USDC symbol
        valueEndElement={isoMarginTransfer ? quoteSymbol : ''}
      />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Filled"
        value={filledAmount}
        numberFormatSpecifier={sizeFormatSpecifier}
        valueEndElement={
          <div className="flex items-center gap-x-1">
            {symbol}
            <span>
              (
              {formatNumber(filledFraction, {
                formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
              })}
              )
            </span>
          </div>
        }
      />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Unfilled"
        value={unfilledAmount}
        numberFormatSpecifier={sizeFormatSpecifier}
        valueEndElement={symbol}
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
    <div className="flex flex-col gap-y-3">
      <SecondaryButton title="Trade" onClick={navigateToTradePage}>
        Trade
      </SecondaryButton>
      <SecondaryButton
        destructive
        title="Cancel Order"
        disabled={disableCancelOrder}
        onClick={cancelOrderHandler}
      >
        Cancel Order
      </SecondaryButton>
    </div>
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
