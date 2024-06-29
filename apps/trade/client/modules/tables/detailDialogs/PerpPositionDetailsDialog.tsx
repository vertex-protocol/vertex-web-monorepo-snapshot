import {
  PresetNumberFormatSpecifier,
  getMarketPriceFormatSpecifier,
  getMarketSizeFormatSpecifier,
} from '@vertex-protocol/react-client';
import { SecondaryButton } from '@vertex-protocol/web-ui';
import { PnlValueWithPercentage } from 'client/components/PnlValueWithPercentage';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { useUserActionState } from 'client/hooks/subaccount/useUserActionState';
import { usePushTradePage } from 'client/hooks/ui/navigation/usePushTradePage';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { ProductHeader } from 'client/modules/tables/detailDialogs/components/ProductHeader';
import { TableDetailDialog } from 'client/modules/tables/detailDialogs/components/base/TableDetailDialog';
import { PerpPositionsTableItem } from 'client/modules/tables/hooks/usePerpPositionsTable';

export type PerpPositionDetailsDialogParams = PerpPositionsTableItem;

export function PerpPositionDetailsDialog({
  productId,
  marketInfo,
  amountInfo,
  netFunding,
  marginUsedUsd,
  pnlInfo,
  price,
  estimatedLiquidationPrice,
}: PerpPositionDetailsDialogParams) {
  const { primaryQuoteToken } = useVertexMetadataContext();
  const { show, hide } = useDialog();
  const pushTradePage = usePushTradePage();
  const userActionState = useUserActionState();

  const { marketName, icon, amountForSide } = marketInfo;
  const { position, notionalValueUsd, symbol } = amountInfo;
  const { averageEntryPrice, fastOraclePrice } = price;

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
    <div className="flex flex-col gap-y-4">
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Position Size"
        value={position}
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
        label="Entry Price"
        value={averageEntryPrice}
        numberFormatSpecifier={priceFormatSpecifier}
      />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Mark Price"
        value={fastOraclePrice}
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
        label="Margin"
        value={marginUsedUsd}
        numberFormatSpecifier={PresetNumberFormatSpecifier.CURRENCY_2DP}
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
          show({
            type: 'close_position',
            params: {
              productId,
            },
          });
        }}
        disabled={userActionState === 'block_all' || position.eq(0)}
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
