import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { ChartTooltip } from 'client/components/ChartTooltip';
import { HistoricalInterestRateChartDataItem } from 'client/modules/tables/detailDialogs/SpotMoneyMarketDetailsDialog/HistoricalInterestRateChart/hooks/useHistoricalInterestRateChartData';
import { getTooltipPayloadData } from 'client/utils/charts/getTooltipPayloadData';
import { TooltipProps } from 'recharts';
import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';

interface Props extends TooltipProps<ValueType, NameType> {
  isDeposit: boolean;
}

export function HistoricalInterestRateChartTooltip({
  active,
  payload,
  isDeposit,
}: Props) {
  const originalDataPayload: HistoricalInterestRateChartDataItem | undefined =
    getTooltipPayloadData(payload);

  if (!active || !originalDataPayload) {
    return null;
  }

  return (
    <ChartTooltip.Container>
      <ChartTooltip.TimestampHeader
        timestampMillis={originalDataPayload.timestampMillis}
      />
      <ChartTooltip.Items>
        {isDeposit ? (
          <ChartTooltip.Item
            title="Deposit APR"
            legendColorClassName="bg-positive"
            content={formatNumber(originalDataPayload.depositAprFraction, {
              formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
            })}
          />
        ) : (
          <ChartTooltip.Item
            title="Borrow APR"
            legendColorClassName="bg-negative"
            content={formatNumber(originalDataPayload.borrowAprFraction, {
              formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
            })}
          />
        )}
      </ChartTooltip.Items>
    </ChartTooltip.Container>
  );
}
