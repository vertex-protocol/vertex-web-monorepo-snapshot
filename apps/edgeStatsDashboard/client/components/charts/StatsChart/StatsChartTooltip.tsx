import { Divider } from '@vertex-protocol/web-ui';
import { ChartTooltip } from 'client/components/charts/ChartTooltip';
import {
  StatsChartConfigByDataKey,
  StatsChartDataItem,
} from 'client/components/charts/StatsChart/types';
import { getDefaultChartFillColor } from 'client/components/charts/utils/getDefaultChartFillColor';
import { first } from 'lodash';
import { Fragment, useMemo } from 'react';
import {
  NameType,
  Payload,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';

interface Props<TDataKey extends string> {
  valueFormatter:
    | ((value: number | undefined, index: number) => string)
    | undefined;
  payload: Payload<ValueType, NameType>[] | undefined;
  active: boolean | undefined;
  configByDataKey: StatsChartConfigByDataKey<TDataKey>;
  data: StatsChartDataItem<TDataKey>[] | undefined;
}

export function StatsChartTooltip<TDataKey extends string>({
  active,
  payload,
  configByDataKey,
  data,
  valueFormatter,
}: Props<TDataKey>) {
  const configByDataKeyValues = useMemo(
    () => Object.values(configByDataKey as StatsChartConfigByDataKey),
    [configByDataKey],
  );

  const originalDataPayload: StatsChartDataItem<TDataKey> | undefined =
    first(payload)?.payload;

  if (!active || !originalDataPayload) {
    return null;
  }

  const { currentTimestampMillis, earlierTimestampMillis } =
    originalDataPayload;

  // We have to use data instead of originalDataPayload because we want to show some values only on tooltip but hide on chart.
  const tooltipData: StatsChartDataItem<TDataKey> | undefined = data?.find(
    (d) => d?.currentTimestampMillis === currentTimestampMillis,
  );

  if (!tooltipData) {
    return null;
  }

  return (
    <ChartTooltip.Container>
      <ChartTooltip.TimestampHeader
        earlierTimestampMillis={earlierTimestampMillis}
        currentTimestampMillis={currentTimestampMillis}
      />
      {configByDataKeyValues.map(
        (
          { dataKey, hasTooltipTopDivider, color: colorOverride, label },
          index,
        ) => {
          const value = tooltipData.data?.[dataKey as TDataKey];

          // If value is null or undefined. Don't show value on tooltip.
          if (value == null) {
            return null;
          }

          const color = getDefaultChartFillColor(
            colorOverride,
            index,
            configByDataKeyValues.length,
          );

          return (
            <Fragment key={dataKey}>
              {hasTooltipTopDivider && <Divider />}
              <ChartTooltip.Row>
                <ChartTooltip.RowLabel legendColor={color} label={label} />
                {valueFormatter?.(value, index) ?? value}
              </ChartTooltip.Row>
            </Fragment>
          );
        },
      )}
    </ChartTooltip.Container>
  );
}
