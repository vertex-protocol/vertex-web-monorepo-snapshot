import { AmountWithSymbol } from 'client/components/AmountWithSymbol';
import { LineItem } from 'client/components/LineItem/LineItem';
import { LpTableItem } from 'client/modules/pools/hooks/useLpTable';
import { TableDetailDialog } from 'client/modules/tables/detailDialogs/components/base/TableDetailDialog';
import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from 'client/utils/formatNumber/NumberFormatSpecifier';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { signDependentValue } from 'client/utils/signDependentValue';
import { LpCtaButtons } from './components/LpCtaButtons';
import { LpHeader } from './components/LpHeader';

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
    <div className="flex flex-col gap-y-4">
      <LineItem.Metric
        label="Liquidity Provided"
        renderValue={(val) =>
          formatNumber(val, {
            formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
          })
        }
        value={valueUsd}
      />
      <LineItem.Metric
        label="Position"
        renderValue={(val) => (
          <AmountWithSymbol
            formattedSize={formatNumber(val, {
              formatSpecifier: CustomNumberFormatSpecifier.NUMBER_AUTO,
            })}
            symbol="LP Tokens"
          />
        )}
        value={amounts.lpAmount}
      />
      <LineItem.Metric
        label="Composition"
        // Alignment items to the top
        labelClassName="mb-auto"
        renderValue={(val) => (
          <div className="flex flex-col items-end gap-y-1">
            <AmountWithSymbol
              formattedSize={formatNumber(val?.baseAmount, {
                formatSpecifier: CustomNumberFormatSpecifier.NUMBER_AUTO,
              })}
              symbol={metadata.base.symbol}
            />
            <AmountWithSymbol
              formattedSize={formatNumber(val?.quoteAmount, {
                formatSpecifier: CustomNumberFormatSpecifier.NUMBER_AUTO,
              })}
              symbol={metadata.quote.symbol}
            />
          </div>
        )}
        value={{
          baseAmount: amounts.baseAmount,
          quoteAmount: amounts.quoteAmount,
        }}
      />
      <LineItem.Metric
        label="APR"
        renderValue={(val) =>
          formatNumber(val, {
            formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
          })
        }
        value={yieldFraction}
      />
      <LineItem.Metric
        label="PnL"
        renderValue={(val) => (
          <div
            className={signDependentValue(val, {
              positive: 'text-positive',
              negative: 'text-negative',
              zero: 'text-text-primary',
            })}
          >
            {formatNumber(val, {
              formatSpecifier: CustomNumberFormatSpecifier.SIGNED_CURRENCY_2DP,
            })}
          </div>
        )}
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
