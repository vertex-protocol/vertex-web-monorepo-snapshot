import { range } from 'lodash';
import { ComponentProps, ComponentPropsWithoutRef } from 'react';
import {
  AreaProps,
  CartesianGrid,
  LineProps,
  TooltipProps,
  XAxisProps,
  YAxisProps,
} from 'recharts';
import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';
import { Dot } from 'recharts/types/shape/Dot';
import { VERTEX_COLORS } from '@vertex-protocol/web-ui';

export const CHART_XAXIS_DEFAULTS: Omit<XAxisProps, 'ref'> = {
  dataKey: (data) => data.timestampMillis,
  type: 'number',
  scale: 'time',
  domain: ['auto', 'auto'],
  minTickGap: 30,
  tick: { fontSize: 10, color: VERTEX_COLORS.overlay.divider },
  axisLine: false,
  tickLine: false,
  stroke: VERTEX_COLORS.text.tertiary,
  tickMargin: 8,
  height: 20,
  tickCount: 10,
};

export const CHART_YAXIS_DEFAULTS: Omit<YAxisProps, 'ref'> = {
  tick: { fontSize: 10, color: VERTEX_COLORS.overlay.divider },
  axisLine: false,
  tickLine: false,
  stroke: VERTEX_COLORS.text.tertiary,
  minTickGap: 25,
  width: 44,
  tickCount: 6,
  padding: { top: 10, bottom: 10 },
  scale: 'auto',
  domain: ['auto', 'auto'],
};

export const CHART_TOOLTIP_DEFAULTS: TooltipProps<ValueType, NameType> = {
  cursor: {
    stroke: VERTEX_COLORS.stroke.DEFAULT,
    strokeWidth: 1,
  },
};

export const CHART_GRID_DEFAULTS: ComponentPropsWithoutRef<
  typeof CartesianGrid
> = {
  stroke: VERTEX_COLORS.disabled.DEFAULT,
  strokeDasharray: '2 10',
  strokeWidth: 1,
  horizontalCoordinatesGenerator: () => [],
  // We increment every 10px to shape the grid correctly.
  verticalCoordinatesGenerator: (props) =>
    range(props.offset?.left ?? 0, props.width, 10),
};

export const CHART_DOT_DEFAULTS: ComponentProps<typeof Dot> = {
  strokeWidth: 0.5,
  fill: VERTEX_COLORS.surface.card,
  stroke: VERTEX_COLORS.text.tertiary,
};

export const AREA_CHART_DEFAULTS: Omit<AreaProps, 'dataKey' | 'ref'> = {
  strokeWidth: 2,
  type: 'linear',
  fillOpacity: 0.5,
};

export const LINE_CHART_DEFAULTS: Omit<LineProps, 'dataKey' | 'ref'> = {
  strokeWidth: 2,
  type: 'linear',
  dot: false,
};
