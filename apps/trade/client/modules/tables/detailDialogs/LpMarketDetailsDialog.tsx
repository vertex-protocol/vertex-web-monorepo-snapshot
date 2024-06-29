import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { Divider } from '@vertex-protocol/web-ui';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { useSubaccountFeeRates } from 'client/hooks/query/subaccount/useSubaccountFeeRates';
import { LpTableItem } from 'client/modules/pools/hooks/useLpTable';
import { TableDetailDialog } from 'client/modules/tables/detailDialogs/components/base/TableDetailDialog';
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
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="APR"
        value={yieldFraction}
        numberFormatSpecifier={PresetNumberFormatSpecifier.PERCENTAGE_2DP}
      />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="TVL"
        value={tvlUsd}
        numberFormatSpecifier={PresetNumberFormatSpecifier.CURRENCY_2DP}
      />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="24h Volume"
        value={volume}
        valueEndElement={metadata.quote.symbol}
        numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
      />
      <Divider />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Position"
        value={valueUsd}
        numberFormatSpecifier={PresetNumberFormatSpecifier.CURRENCY_2DP}
      />
      <div className="flex flex-col gap-y-1">
        <ValueWithLabel.Horizontal
          sizeVariant="xs"
          label={`${metadata.base.symbol}:`}
          value={baseAmount}
          valueClassName="text-text-tertiary"
          numberFormatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
        />
        <ValueWithLabel.Horizontal
          sizeVariant="xs"
          label={`${primaryQuoteToken.symbol}:`}
          value={quoteAmount}
          valueClassName="text-text-tertiary"
          numberFormatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
        />
        <ValueWithLabel.Horizontal
          sizeVariant="xs"
          label="LP Tokens:"
          value={amounts.lpAmount}
          valueClassName="text-text-tertiary"
          numberFormatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
        />
      </div>
      <Divider />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="PnL"
        value={unrealizedPnl}
        valueClassName={signDependentValue(unrealizedPnl, {
          positive: 'text-positive',
          negative: 'text-negative',
          zero: 'text-text-primary',
        })}
        numberFormatSpecifier={CustomNumberFormatSpecifier.SIGNED_CURRENCY_2DP}
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
