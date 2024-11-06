import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { BigDecimal } from '@vertex-protocol/utils';
import {
  joinClassNames,
  NextImageSrc,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { Divider } from '@vertex-protocol/web-ui';
import { MarketInfoWithSide } from 'client/components/MarketInfoWithSide';
import { signDependentValue } from 'client/utils/signDependentValue';
import { ReactNode } from 'react';

interface ClosePositionMetricsProps {
  iconSrc: NextImageSrc | undefined;
  positionAmount: BigDecimal | undefined;
  productName: string | undefined;
  symbol: string | undefined;
  marketSizeFormatSpecifier: string;
  marketPriceFormatSpecifier: string;
  averageEntryPrice: BigDecimal | undefined;
  oraclePrice: BigDecimal | undefined;
  notionalValueUsd: BigDecimal | undefined;
  estimatedPnlUsd: BigDecimal | undefined;
}

export function ClosePositionMetrics({
  productName,
  iconSrc,
  symbol,
  marketSizeFormatSpecifier,
  marketPriceFormatSpecifier,
  averageEntryPrice,
  oraclePrice,
  notionalValueUsd,
  positionAmount,
  estimatedPnlUsd,
}: ClosePositionMetricsProps) {
  return (
    <div
      className={joinClassNames(
        'flex flex-col gap-y-4 px-3.5 py-3',
        'bg-surface-1 rounded',
      )}
    >
      <div className="grid grid-cols-2">
        <MarketInfoWithSide
          isPerp
          alwaysShowOrderDirection={false}
          marketName={productName}
          iconSrc={iconSrc}
          amountForSide={positionAmount}
        />
        <PositionMetric
          title="Est. PnL"
          content={<EstimatedPnlMetric estimatedPnlUsd={estimatedPnlUsd} />}
        />
      </div>
      <Divider />
      <div className="grid grid-cols-2">
        <PositionMetric
          title="Size"
          content={
            <>
              {formatNumber(positionAmount?.abs(), {
                formatSpecifier: marketSizeFormatSpecifier,
              })}
              <span className="text-text-tertiary text-2xs">{symbol}</span>
            </>
          }
        />
        <PositionMetric
          title="Notional"
          content={formatNumber(notionalValueUsd, {
            formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
          })}
        />
      </div>
      <div className="grid grid-cols-2">
        <PositionMetric
          title="Avg. Entry"
          content={formatNumber(averageEntryPrice, {
            formatSpecifier: marketPriceFormatSpecifier,
          })}
        />
        <PositionMetric
          title="Oracle Price"
          content={formatNumber(oraclePrice, {
            formatSpecifier: marketPriceFormatSpecifier,
          })}
        />
      </div>
    </div>
  );
}

function EstimatedPnlMetric({
  estimatedPnlUsd,
}: {
  estimatedPnlUsd?: BigDecimal;
}) {
  return (
    <p
      className={joinClassNames(
        'text-xs',
        signDependentValue(estimatedPnlUsd, {
          positive: 'text-positive',
          negative: 'text-negative',
          zero: 'text-text-secondary',
        }),
      )}
    >
      {formatNumber(estimatedPnlUsd, {
        formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
      })}
    </p>
  );
}

function PositionMetric({
  title,
  content,
  className,
}: WithClassnames<{
  title: string;
  content: ReactNode;
}>) {
  return (
    <div className={joinClassNames('flex flex-col', className)}>
      <div className="text-text-tertiary flex items-center gap-x-1 text-xs">
        {title}
      </div>
      <div className="text-text-primary flex items-center gap-x-1 text-xs">
        {content}
      </div>
    </div>
  );
}
