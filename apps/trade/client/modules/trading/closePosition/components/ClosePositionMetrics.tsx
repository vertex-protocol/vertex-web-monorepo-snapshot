import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { BigDecimal } from '@vertex-protocol/utils';
import { joinClassNames, NextImageSrc } from '@vertex-protocol/web-common';
import { Card, Divider } from '@vertex-protocol/web-ui';
import { MarginInfoPill } from 'client/components/MarginInfoPill';
import { MarketInfoWithSide } from 'client/components/MarketInfoWithSide';
import { PnlValueWithPercentage } from 'client/components/PnlValueWithPercentage';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';

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
  isoLeverage: number | undefined;
  estimatedPnlFrac: BigDecimal | undefined;
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
  estimatedPnlFrac,
  isoLeverage,
}: ClosePositionMetricsProps) {
  return (
    <Card
      className={joinClassNames(
        'flex flex-col gap-y-2 px-3.5 py-3',
        'bg-surface-1 rounded-sm',
      )}
    >
      <div className="flex items-center justify-between">
        <MarketInfoWithSide
          isPerp
          alwaysShowOrderDirection={false}
          marketName={productName}
          iconSrc={iconSrc}
          amountForSide={positionAmount}
        />
        <MarginInfoPill isoLeverage={isoLeverage} />
      </div>
      <div className="flex flex-col gap-y-1.5">
        <ValueWithLabel.Horizontal
          sizeVariant="xs"
          label="Est. Current PnL"
          valueContent={
            <PnlValueWithPercentage
              pnlFrac={estimatedPnlFrac}
              pnlUsd={estimatedPnlUsd}
            />
          }
        />
        <Divider />
        <ValueWithLabel.Horizontal
          sizeVariant="xs"
          label="Size"
          value={positionAmount?.abs()}
          numberFormatSpecifier={marketSizeFormatSpecifier}
          valueEndElement={<span className="text-2xs">{symbol}</span>}
        />
        <ValueWithLabel.Horizontal
          sizeVariant="xs"
          label="Avg. Entry"
          value={averageEntryPrice}
          numberFormatSpecifier={marketPriceFormatSpecifier}
        />
        <ValueWithLabel.Horizontal
          sizeVariant="xs"
          label="Notional"
          value={notionalValueUsd}
          numberFormatSpecifier={PresetNumberFormatSpecifier.CURRENCY_2DP}
        />
        <ValueWithLabel.Horizontal
          sizeVariant="xs"
          label="Oracle Price"
          value={oraclePrice}
          numberFormatSpecifier={marketPriceFormatSpecifier}
        />
      </div>
    </Card>
  );
}
