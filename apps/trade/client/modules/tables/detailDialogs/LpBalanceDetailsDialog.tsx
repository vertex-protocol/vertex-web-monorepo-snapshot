import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
  formatNumber,
} from '@vertex-protocol/react-client';
import { AmountWithSymbol } from 'client/components/AmountWithSymbol';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { LpTableItem } from 'client/modules/pools/hooks/useLpTable';
import { TableDetailDialog } from 'client/modules/tables/detailDialogs/components/base/TableDetailDialog';
import { LpCtaButtons } from 'client/modules/tables/detailDialogs/components/LpCtaButtons';
import { LpHeader } from 'client/modules/tables/detailDialogs/components/LpHeader';
import { signDependentValue } from '@vertex-protocol/react-client';

export type LpBalanceDetailsDialogParams = LpTableItem;

export function LpBalanceDetailsDialog({
  productId,
  metadata,
  yieldFraction,
  valueUsd,
  amounts,
  unrealizedPnl,
}: LpBalanceDetailsDialogParams) {
  const header = (
    <LpHeader
      baseSymbol={metadata.base.symbol}
      quoteSymbol={metadata.quote.symbol}
      baseIconSrc={metadata.base.icon.asset}
      quoteIconSrc={metadata.quote.icon.asset}
    />
  );

  const metricItems = (
    <div className="flex flex-col gap-y-2">
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Liquidity Provided"
        value={valueUsd}
        numberFormatSpecifier={PresetNumberFormatSpecifier.CURRENCY_2DP}
      />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Position"
        value={amounts.lpAmount}
        numberFormatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
        valueEndElement="LP Tokens"
      />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Composition"
        className="items-center"
        valueClassName="flex-col items-end gap-y-1"
        valueContent={
          <>
            <AmountWithSymbol
              formattedSize={formatNumber(amounts.baseAmount, {
                formatSpecifier: CustomNumberFormatSpecifier.NUMBER_AUTO,
              })}
              symbol={metadata.base.symbol}
            />
            <AmountWithSymbol
              formattedSize={formatNumber(amounts.quoteAmount, {
                formatSpecifier: CustomNumberFormatSpecifier.NUMBER_AUTO,
              })}
              symbol={metadata.quote.symbol}
            />
          </>
        }
      />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="APR"
        numberFormatSpecifier={PresetNumberFormatSpecifier.PERCENTAGE_2DP}
        value={yieldFraction}
      />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="PnL"
        valueClassName={signDependentValue(unrealizedPnl, {
          positive: 'text-positive',
          negative: 'text-negative',
          zero: 'text-text-primary',
        })}
        numberFormatSpecifier={CustomNumberFormatSpecifier.SIGNED_CURRENCY_2DP}
        value={unrealizedPnl}
      />
    </div>
  );

  const actions = (
    <LpCtaButtons productId={productId} lpAmount={amounts.lpAmount} />
  );

  return (
    <TableDetailDialog
      title="Position Details"
      header={header}
      metricItems={metricItems}
      actions={actions}
    />
  );
}
