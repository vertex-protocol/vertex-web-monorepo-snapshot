import {
  ChartDataItemKey,
  ChartGradientOffsetParams,
  useChartGradientOffset,
} from 'client/modules/charts/components/ChartDynamicGradientDefinitions/useChartGradientOffset';
import { clamp } from 'lodash';

interface Props<TChartDataItem>
  extends ChartGradientOffsetParams<TChartDataItem> {
  gradientConfigs: DynamicGradientConfig[];
}

interface DynamicGradientConfig {
  id: string;
  stopColor: string;
}

/**
 * Gradient definitions for pnl charts
 * Using `gradientStopOffset` as the stop offset we invert the pattern at 0 value.
 * The first and last stop represent the top and bottom of the chart respectively.
 * The middle stops are used to create a smooth transition with transparency
 * between the positive and negative values.
 * @example If the chart is 100px tall and the 0 value is 40px from the top, the 'gradientOffset' will be 0.4
 */
export function ChartDynamicGradientDefinitions<
  TChartDataItem extends Record<
    ChartDataItemKey<TChartDataItem>,
    number | undefined
  >,
>({ valueKey, data, gradientConfigs }: Props<TChartDataItem>) {
  // The middle stops use this offset to transition between the inverted color pattern at 0 value
  const gradientStopOffset = useChartGradientOffset({
    valueKey,
    data,
  });

  // The secondary stops are used to transition color to transparent half way between the outer and middle stops
  // Creating a smooth transition between the positive and negative values
  // Half way between top and 0 value
  const secondaryStopOffsetTop = clamp(gradientStopOffset / 2, 0, 1);
  // Half way between 0 value and bottom
  const secondaryStopOffsetBottom = clamp(
    gradientStopOffset + secondaryStopOffsetTop,
    0,
    1,
  );
  return (
    <svg width={0} height={0}>
      <defs>
        {gradientConfigs.map(({ id, stopColor }) => (
          <DynamicLinearGradient
            key={id}
            gradientId={id}
            offsets={{
              top: secondaryStopOffsetTop,
              middle: gradientStopOffset,
              bottom: secondaryStopOffsetBottom,
            }}
            stopColor={stopColor}
          />
        ))}
      </defs>
    </svg>
  );
}

function DynamicLinearGradient({
  gradientId,
  stopColor,
  offsets,
}: {
  gradientId: string;
  stopColor: string;
  offsets: {
    top: number;
    middle: number;
    bottom: number;
  };
}) {
  return (
    <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
      <stop offset={0} stopOpacity={0.9} stopColor={stopColor} />
      <stop offset={offsets.top} stopOpacity={0.2} stopColor={stopColor} />
      <stop offset={offsets.middle} stopOpacity={0} />
      <stop offset={offsets.middle} stopOpacity={0} />
      <stop offset={offsets.bottom} stopOpacity={0.2} stopColor={stopColor} />
      <stop offset={1} stopOpacity={0.9} stopColor={stopColor} />
    </linearGradient>
  );
}
