import { SecondaryButton } from '@vertex-protocol/web-ui';
import { AmountWithSymbol } from 'client/components/AmountWithSymbol';
import { LineItem } from 'client/components/LineItem/LineItem';
import { PnlValueWithPercentage } from 'client/components/PnlValueWithPercentage';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { useUserActionState } from 'client/hooks/subaccount/useUserActionState';
import { usePushTradePage } from 'client/hooks/ui/navigation/usePushTradePage';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { ProductHeader } from 'client/modules/tables/detailDialogs/components/ProductHeader';
import { TableDetailDialog } from 'client/modules/tables/detailDialogs/components/base/TableDetailDialog';
import { PerpPositionsTableItem } from 'client/modules/tables/hooks/usePerpPositionsTable';
import { PresetNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { getMarketPriceFormatSpecifier } from 'client/utils/formatNumber/getMarketPriceFormatSpecifier';
import { getMarketSizeFormatSpecifier } from 'client/utils/formatNumber/getMarketSizeFormatSpecifier';

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
      <LineItem.Metric
        label="Position Size"
        renderValue={(val) => (
          <AmountWithSymbol
            symbol={symbol}
            formattedSize={formatNumber(val, {
              formatSpecifier: sizeFormatSpecifier,
            })}
          />
        )}
        value={position}
      />
      <LineItem.Metric
        label="Notional Value"
        renderValue={PresetNumberFormatSpecifier.CURRENCY_2DP}
        value={notionalValueUsd}
      />
      <LineItem.Metric
        label="Entry Price"
        renderValue={priceFormatSpecifier}
        value={averageEntryPrice}
      />
      <LineItem.Metric
        label="Mark Price"
        renderValue={priceFormatSpecifier}
        value={fastOraclePrice}
      />
      <LineItem.Metric
        label="Est. Liq. Price"
        renderValue={priceFormatSpecifier}
        value={estimatedLiquidationPrice}
      />
      <LineItem.Metric
        label="Margin"
        renderValue={PresetNumberFormatSpecifier.CURRENCY_2DP}
        value={marginUsedUsd}
      />
      <LineItem.Metric
        label="PnL"
        renderValue={(val?: typeof pnlInfo) => (
          <PnlValueWithPercentage
            pnlFrac={val?.estimatedPnlFrac}
            pnlUsd={val?.estimatedPnlUsd}
          />
        )}
        value={pnlInfo}
      />
      <LineItem.Metric
        label="Funding"
        renderValue={(val) => (
          <div className="flex gap-x-1">
            {formatNumber(val, {
              formatSpecifier: PresetNumberFormatSpecifier.SIGNED_NUMBER_2DP,
            })}
            <div className="text-text-tertiary">{primaryQuoteToken.symbol}</div>
          </div>
        )}
        value={netFunding}
      />
    </div>
  );

  const actions = (
    <div className="flex flex-col gap-y-3">
      {/* Quote product not possible here, hence why we forgo the disabled state */}
      <SecondaryButton
        size="md"
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
        size="md"
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
