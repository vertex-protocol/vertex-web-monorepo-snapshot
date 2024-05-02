import { Divider } from '@vertex-protocol/web-ui';
import { LineItem } from 'client/components/LineItem/LineItem';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { useSubaccountFeeRates } from 'client/hooks/query/subaccount/useSubaccountFeeRates';
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

export type LpMarketDetailsDialogParams = LpTableItem;

export function LpMarketDetailsDialog({
  productId,
  metadata,
  yieldFraction,
  valueUsd,
  tvlUsd,
  volume,
  amounts,
  unrealizedPnl,
}: LpMarketDetailsDialogParams) {
  const { primaryQuoteToken } = useVertexMetadataContext();
  const { data } = useSubaccountFeeRates();

  const { baseAmount, quoteAmount } = amounts;
  const takerFee = data?.orders[productId]?.taker;

  const header = (
    <LpHeader
      takerFee={takerFee}
      baseSymbol={metadata.base.symbol}
      quoteSymbol={metadata.quote.symbol}
      baseIconSrc={metadata.base.icon.asset}
      quoteIconSrc={metadata.quote.icon.asset}
    />
  );

  const metricItems = (
    <div className="flex flex-col gap-y-4">
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
        label="TVL"
        renderValue={(val) =>
          formatNumber(val, {
            formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
          })
        }
        value={tvlUsd}
      />
      <LineItem.Metric
        label="24h Volume"
        renderValue={(val) =>
          `${formatNumber(val, {
            formatSpecifier: PresetNumberFormatSpecifier.NUMBER_2DP,
          })} ${metadata.quote.symbol}`
        }
        value={volume}
      />
      <Divider />
      <LineItem.Metric
        label="Position"
        renderValue={(val) =>
          formatNumber(val, {
            formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
          })
        }
        value={valueUsd}
      />
      <div className="flex flex-col gap-y-1">
        <LineItem.Metric
          label={`${metadata.base.symbol}:`}
          valueClassName="text-text-tertiary"
          renderValue={(val) =>
            formatNumber(val, {
              formatSpecifier: CustomNumberFormatSpecifier.NUMBER_AUTO,
            })
          }
          value={baseAmount}
        />
        <LineItem.Metric
          label={`${primaryQuoteToken.symbol}:`}
          valueClassName="text-text-tertiary"
          renderValue={(val) =>
            formatNumber(val, {
              formatSpecifier: CustomNumberFormatSpecifier.NUMBER_AUTO,
            })
          }
          value={quoteAmount}
        />
        <LineItem.Metric
          label="LP Tokens:"
          valueClassName="text-text-tertiary"
          renderValue={(val) =>
            formatNumber(val, {
              formatSpecifier: CustomNumberFormatSpecifier.NUMBER_AUTO,
            })
          }
          value={amounts.lpAmount}
        />
      </div>
      <Divider />
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
      title="Spot Pool"
      header={header}
      metricItems={metricItems}
      actions={actions}
    />
  );
}
