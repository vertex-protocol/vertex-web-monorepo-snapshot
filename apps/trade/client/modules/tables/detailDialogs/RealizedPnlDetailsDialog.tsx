import { ProductEngineType } from '@vertex-protocol/client';
import { SecondaryButton } from '@vertex-protocol/web-ui';
import { AmountWithSymbol } from 'client/components/AmountWithSymbol';
import { Icons } from '@vertex-protocol/web-ui';
import { LineItem } from 'client/components/LineItem/LineItem';
import { PnlValueWithPercentage } from 'client/components/PnlValueWithPercentage';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { ProductHeader } from 'client/modules/tables/detailDialogs/components/ProductHeader';
import { TableDetailDialog } from 'client/modules/tables/detailDialogs/components/base/TableDetailDialog';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { getMarketSizeFormatSpecifier } from 'client/utils/formatNumber/getMarketSizeFormatSpecifier';
import { RealizedPnlEventItem } from '../types/RealizedPnlEventItem';

export type RealizedPnlDetailsDialogParams = RealizedPnlEventItem;

export function RealizedPnlDetailsDialog({
  marketInfo,
  pnlInfo,
  entryPrice,
  exitPrice,
  filledAmountAbs,
  marketPriceFormatSpecifier,
}: RealizedPnlDetailsDialogParams) {
  const { show } = useDialog();

  const { marketName, icon, amountForSide, symbol, sizeIncrement } = marketInfo;

  const { realizedPnlFrac } = pnlInfo;

  const header = (
    <ProductHeader
      isPerp={marketInfo.productType === ProductEngineType.PERP}
      iconSrc={icon.asset}
      productName={marketName}
      amountForSide={amountForSide}
    />
  );

  const metricItems = (
    <div className="flex flex-col gap-y-4">
      <LineItem.Metric
        label="Entry Price"
        renderValue={marketPriceFormatSpecifier}
        value={entryPrice}
      />
      <LineItem.Metric
        label="Exit Price"
        renderValue={marketPriceFormatSpecifier}
        value={exitPrice}
      />
      <LineItem.Metric
        label="Size"
        renderValue={(val) => (
          <AmountWithSymbol
            symbol={symbol}
            formattedSize={formatNumber(val, {
              formatSpecifier: getMarketSizeFormatSpecifier(sizeIncrement),
            })}
          />
        )}
        value={filledAmountAbs}
      />
      <LineItem.Metric
        label="PnL"
        renderValue={(val?: typeof pnlInfo) => (
          <PnlValueWithPercentage
            pnlFrac={val?.realizedPnlFrac}
            pnlUsd={val?.realizedPnlUsd}
          />
        )}
        value={pnlInfo}
      />
    </div>
  );

  const actions = (
    <SecondaryButton
      size="md"
      className="w-full"
      startIcon={<Icons.RiShareForwardFill size={12} />}
      onClick={() => {
        show({
          type: 'perp_pnl_social_sharing',
          params: {
            marketInfo,
            entryPrice,
            referencePrice: exitPrice,
            pnlFrac: realizedPnlFrac,
            isRealized: true,
          },
        });
      }}
    >
      Share
    </SecondaryButton>
  );

  return (
    <TableDetailDialog
      title="Realized PnL"
      header={header}
      metricItems={metricItems}
      actions={actions}
    />
  );
}
