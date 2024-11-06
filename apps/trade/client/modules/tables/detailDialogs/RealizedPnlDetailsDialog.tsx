import { ProductEngineType } from '@vertex-protocol/client';
import { getMarketSizeFormatSpecifier } from '@vertex-protocol/react-client';
import { Icons, SecondaryButton } from '@vertex-protocol/web-ui';
import { PnlValueWithPercentage } from 'client/components/PnlValueWithPercentage';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { TableDetailDialog } from 'client/modules/tables/detailDialogs/components/base/TableDetailDialog';
import { ProductHeader } from 'client/modules/tables/detailDialogs/components/ProductHeader';
import { RealizedPnlEventsTableItem } from 'client/modules/tables/types/RealizedPnlEventsTableItem';

export type RealizedPnlDetailsDialogParams = RealizedPnlEventsTableItem;

export function RealizedPnlDetailsDialog({
  marketInfo,
  pnlInfo,
  entryPrice,
  exitPrice,
  filledAmountAbs,
  marketPriceFormatSpecifier,
}: RealizedPnlDetailsDialogParams) {
  const { push } = useDialog();

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
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Entry Price"
        numberFormatSpecifier={marketPriceFormatSpecifier}
        value={entryPrice}
      />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Exit Price"
        numberFormatSpecifier={marketPriceFormatSpecifier}
        value={exitPrice}
      />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Size"
        numberFormatSpecifier={getMarketSizeFormatSpecifier(sizeIncrement)}
        value={filledAmountAbs}
        valueEndElement={symbol}
      />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="PnL"
        valueContent={
          <PnlValueWithPercentage
            pnlFrac={pnlInfo.realizedPnlFrac}
            pnlUsd={pnlInfo.realizedPnlUsd}
          />
        }
      />
    </div>
  );

  const actions = (
    <SecondaryButton
      startIcon={<Icons.ShareFatFill size={12} />}
      onClick={() => {
        push({
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
