import { timestampDataKey } from 'client/modules/charts/utils/dataKeys';
import { getTradeAppColorVar } from 'client/modules/theme/colorVars';
import { range } from 'lodash';
import { ComponentProps, ComponentPropsWithoutRef } from 'react';
import {
  AreaProps,
  CartesianGrid,
  Dot,
  TooltipProps,
  XAxisProps,
  YAxisProps,
} from 'recharts';
import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';

export const CHART_XAXIS_DEFAULTS: Omit<XAxisProps, 'ref'> = {
  dataKey: timestampDataKey,
  domain: ['dataMin', 'dataMax'],
  tick: { fontSize: 10 },
  minTickGap: 30,
  axisLine: false,
  tickLine: false,
  stroke: getTradeAppColorVar('text-tertiary'),
  tickMargin: 8,
  height: 20,
};

export const CHART_YAXIS_DEFAULTS: Omit<YAxisProps, 'ref'> = {
  tick: { fontSize: 10 },
  axisLine: false,
  tickLine: false,
  stroke: getTradeAppColorVar('text-tertiary'),
  minTickGap: 30,
  width: 55,
  tickCount: 5,
  padding: { top: 10, bottom: 10 },
  scale: 'auto',
  domain: ['auto', 'auto'],
};

export const CHART_TOOLTIP_DEFAULTS: TooltipProps<ValueType, NameType> = {
  cursor: {
    stroke: getTradeAppColorVar('stroke'),
    strokeWidth: 1,
  },
};

export const CHART_GRID_DEFAULTS: ComponentPropsWithoutRef<
  typeof CartesianGrid
> = {
  stroke: getTradeAppColorVar('disabled'),
  strokeDasharray: '2 10',
  strokeWidth: 1,
  horizontalCoordinatesGenerator: () => [],
  // To build the proper vertical grid, we need to know the width of the chart.
  // We start it at 48px, which is the width of the YAxis plus the XAxis tick margin.
  // We then increment every 10px to shape the grid correctly.
  verticalCoordinatesGenerator: (props) =>
    range(props.offset?.left ?? 0, props.width, 10),
};

export const CHART_DOT_DEFAULTS: ComponentProps<typeof Dot> = {
  strokeWidth: 1,
  fill: getTradeAppColorVar('surface-card'),
  stroke: getTradeAppColorVar('stroke'),
};

export const AREA_CHART_DEFAULTS: Omit<AreaProps, 'dataKey' | 'ref'> = {
  strokeWidth: 2,
  type: 'linear',
  fillOpacity: 0.5,
};
