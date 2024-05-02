import { TimeInSeconds } from '@vertex-protocol/client';
import { COLORS } from 'common/theme/colors';
import { mapValues, range } from 'lodash';
import { ComponentProps, ComponentPropsWithoutRef } from 'react';
import {
  AreaProps,
  CartesianGrid,
  TooltipProps,
  XAxisProps,
  YAxisProps,
} from 'recharts';
import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';
import { Dot } from 'recharts/types/shape/Dot';
import { ChartCoordinate } from 'recharts/types/util/types';
import { ChartTimespan } from './types';
import { timestampDataKey } from './utils/dataKeys';

type ChartTimespanMetadata = Record<
  ChartTimespan,
  {
    shortLabel: string;
    longLabel: string;
    durationInSeconds: number;
  }
>;

export const PORTFOLIO_CHART_TIMESPAN_METADATA: ChartTimespanMetadata = {
  '24hr': {
    shortLabel: '24H',
    longLabel: '24H PnL',
    durationInSeconds: TimeInSeconds.DAY,
  },
  '7d': {
    shortLabel: '7D',
    longLabel: '7D PnL',
    durationInSeconds: 7 * TimeInSeconds.DAY,
  },
  '1m': {
    shortLabel: '30D',
    longLabel: '30D PnL',
    durationInSeconds: 30 * TimeInSeconds.DAY,
  },
  all_time: {
    shortLabel: 'ALL',
    longLabel: 'All time PnL',
    durationInSeconds: Infinity,
  },
} as const;

export const PORTFOLIO_CHART_XAXIS_DEFAULTS: XAxisProps = {
  dataKey: timestampDataKey,
  domain: ['dataMin', 'dataMax'],
  tick: { fontSize: 10 },
  minTickGap: 30,
  axisLine: false,
  tickLine: false,
  stroke: COLORS.text.tertiary,
  tickMargin: 8,
  height: 20,
};

export const PORTFOLIO_CHART_YAXIS_DEFAULTS: YAxisProps = {
  tick: { fontSize: 10 },
  axisLine: false,
  tickLine: false,
  stroke: COLORS.text.tertiary,
  minTickGap: 30,
  width: 55,
  tickCount: 5,
  padding: { top: 10, bottom: 10 },
  scale: 'auto',
  domain: ['auto', 'auto'],
};

export const PORTFOLIO_CHART_TOOLTIP_DEFAULTS: TooltipProps<
  ValueType,
  NameType
> = {
  cursor: {
    stroke: COLORS.stroke.DEFAULT,
    strokeWidth: 1,
  },
};

export const PORTFOLIO_CHART_GRID_DEFAULTS: ComponentPropsWithoutRef<
  typeof CartesianGrid
> = {
  stroke: COLORS.disabled.DEFAULT,
  strokeDasharray: '2 10',
  strokeWidth: 1,
  horizontalCoordinatesGenerator: () => [],
  // To build the proper vertical grid, we need to know the width of the chart.
  // We start it at 48px, which is the width of the YAxis plus the XAxis tick margin.
  // We then increment every 10px to shape the grid correctly.
  verticalCoordinatesGenerator: (props) =>
    range(props.offset?.left ?? 0, props.width, 10),
};

export const PORTFOLIO_CHART_DOT_DEFAULTS: ComponentProps<typeof Dot> = {
  strokeWidth: 1,
  fill: COLORS.surface.card,
  stroke: COLORS.stroke.DEFAULT,
};

export const AREA_CHART_DEFAULTS: Omit<AreaProps, 'dataKey' | 'ref'> = {
  strokeWidth: 2,
  type: 'linear',
  fillOpacity: 0.5,
};

export const PORTFOLIO_CHART_GRADIENT_IDS = {
  accountValue: 'account_value',
  pnlPositive: 'pnl_positive',
  pnlNegative: 'pnl_negative',
  funding: 'funding',
  netBalance: 'net_balance',
  apr: 'apr',
  deposits: 'deposits',
  borrows: 'borrows',
  interest: 'interest',
  lpPosition: 'lp_position',
} as const;

export const PORTFOLIO_CHART_GRADIENT_URLS = mapValues(
  PORTFOLIO_CHART_GRADIENT_IDS,
  (id) => `url(#${id})`,
);

export const PORTFOLIO_DYNAMIC_GRADIENT_CONFIGS = {
  interest: [
    {
      id: PORTFOLIO_CHART_GRADIENT_IDS.interest,
      stopColor: COLORS.warning.DEFAULT,
    },
  ],
  funding: [
    {
      id: PORTFOLIO_CHART_GRADIENT_IDS.funding,
      stopColor: COLORS.warning.DEFAULT,
    },
  ],
  pnl: [
    {
      id: PORTFOLIO_CHART_GRADIENT_IDS.pnlPositive,
      stopColor: COLORS.positive.DEFAULT,
    },
    {
      id: PORTFOLIO_CHART_GRADIENT_IDS.pnlNegative,
      stopColor: COLORS.negative.DEFAULT,
    },
  ],
  apr: [
    {
      id: PORTFOLIO_CHART_GRADIENT_IDS.apr,
      stopColor: COLORS.warning.DEFAULT,
    },
  ],
  lpPosition: [
    {
      id: PORTFOLIO_CHART_GRADIENT_IDS.lpPosition,
      stopColor: COLORS.accent.DEFAULT,
    },
  ],
};
