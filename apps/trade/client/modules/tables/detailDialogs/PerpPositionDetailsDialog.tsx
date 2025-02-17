import {
  formatNumber,
  getMarketPriceFormatSpecifier,
  getMarketSizeFormatSpecifier,
  PresetNumberFormatSpecifier,
  useVertexMetadataContext,
} from '@vertex-protocol/react-client';
import { SecondaryButton } from '@vertex-protocol/web-ui';
import { PnlValueWithPercentage } from 'client/components/PnlValueWithPercentage';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { usePushTradePage } from 'client/hooks/ui/navigation/usePushTradePage';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { TableDetailDialog } from 'client/modules/tables/detailDialogs/components/base/TableDetailDialog';
import { ProductHeader } from 'client/modules/tables/detailDialogs/components/ProductHeader';
import { PerpPositionsTableItem } from 'client/modules/tables/hooks/usePerpPositionsTable';

export type PerpPositionDetailsDialogParams = PerpPositionsTableItem;

export function PerpPositionDetailsDialog({
  productId,
  marketInfo,
  amountInfo,
  netFunding,
  margin,
  pnlInfo,
  averageEntryPrice,
  oraclePrice,
  estimatedLiquidationPrice,
  isoSubaccountName,
}: PerpPositionDetailsDialogParams) {
  const { primaryQuoteToken } = useVertexMetadataContext();
  const { push, hide } = useDialog();
  const pushTradePage = usePushTradePage();
  const isConnected = useIsConnected();

  const { marketName, icon, amountForSide } = marketInfo;
  const { amount, notionalValueUsd, symbol } = amountInfo;

  const header = (
    <ProductHeader
      isPerp
      iconSrc={icon.asset}
      productName={marketName}
      amountForSide={amountForSide}
    />
  );

  const sizeFormatSpecifier = getMarketSizeFormatSpecifier(
    marketInfo.sizeIncrement,
  );
  const priceFormatSpecifier = getMarketPriceFormatSpecifier(
    marketInfo.priceIncrement,
  );

  const metricItems = (
    <div className="flex flex-col gap-y-2">
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Type"
        valueClassName="capitalize"
        valueContent={margin.marginModeType}
        valueEndElement={
          margin.isoLeverage ? (
            <span className="text-accent">
              {formatNumber(margin.isoLeverage, {
                formatSpecifier: PresetNumberFormatSpecifier.NUMBER_1DP,
              })}
              x
            </span>
          ) : null
        }
      />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Position Size"
        value={amount}
        numberFormatSpecifier={sizeFormatSpecifier}
        valueEndElement={symbol}
      />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Notional Value"
        value={notionalValueUsd}
        numberFormatSpecifier={PresetNumberFormatSpecifier.CURRENCY_2DP}
      />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Margin"
        value={
          margin.isoMarginUsedUsd
            ? margin.isoMarginUsedUsd
            : margin.crossMarginUsedUsd
        }
        numberFormatSpecifier={PresetNumberFormatSpecifier.CURRENCY_2DP}
      />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Entry Price"
        value={averageEntryPrice}
        numberFormatSpecifier={priceFormatSpecifier}
      />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Oracle Price"
        value={oraclePrice}
        numberFormatSpecifier={priceFormatSpecifier}
      />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Est. Liq. Price"
        value={estimatedLiquidationPrice ?? undefined}
        numberFormatSpecifier={priceFormatSpecifier}
      />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="PnL"
        valueContent={
          <PnlValueWithPercentage
            pnlFrac={pnlInfo?.estimatedPnlFrac}
            pnlUsd={pnlInfo?.estimatedPnlUsd}
          />
        }
      />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Funding"
        value={netFunding}
        numberFormatSpecifier={PresetNumberFormatSpecifier.SIGNED_NUMBER_2DP}
        valueEndElement={primaryQuoteToken.symbol}
      />
    </div>
  );

  const actions = (
    <div className="flex flex-col gap-y-3">
      {/* Quote product not possible here, hence why we forgo the disabled state */}
      <SecondaryButton
        onClick={() => {
          hide();
          pushTradePage({
            productId,
          });
        }}
      >
        Trade
      </SecondaryButton>
      <SecondaryButton
        onClick={() => {
          push({
            type: 'close_position',
            params: {
              productId,
              isoSubaccountName,
            },
          });
        }}
        disabled={!isConnected || amount.eq(0)}
      >
        Market Close
      </SecondaryButton>
    </div>
  );

  return (
    <TableDetailDialog
      title="Perp Positions"
      header={header}
      metricItems={metricItems}
      actions={actions}
    />
  );
}
