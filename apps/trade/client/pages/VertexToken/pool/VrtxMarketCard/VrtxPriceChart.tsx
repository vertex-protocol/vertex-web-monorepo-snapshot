import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { BrandIconLoadingIndicator } from 'client/components/BrandIconLoadingIndicator';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { useMarket } from 'client/hooks/markets/useMarket';
import {
  useVrtxPriceChartData,
  VrtxPriceChartDataItem,
} from 'client/pages/VertexToken/pool/VrtxMarketCard/hooks/useVrtxPriceChartData';
import { formatNumber } from '@vertex-protocol/react-client';
import { getMarketPriceFormatSpecifier } from '@vertex-protocol/react-client';
import {
  formatTimestamp,
  TimeFormatSpecifier,
} from 'client/utils/formatTimestamp';
import { COLORS } from 'common/theme/colors';
import { range } from 'lodash';
import { ComponentPropsWithoutRef } from 'react';
import {
  Area,
  AreaChart,
  AreaProps,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  XAxisProps,
  YAxis,
  YAxisProps,
} from 'recharts';
import { ChartCoordinate } from 'recharts/types/util/types';

export function VrtxPriceChart({
  className,
  minHeightClassName,
}: WithClassnames<{
  // This is unfortunately required for mobile, where the parent is flex-col. Without it, `ResponsiveContainer` has a height of 0
  minHeightClassName: string;
}>) {
  const { protocolTokenMetadata } = useVertexMetadataContext();
  const { data } = useVrtxPriceChartData();
  const { data: vrtxSpotMarket } = useMarket({
    productId: protocolTokenMetadata.productId,
  });

  if (!data) {
    return (
      <div
        className={joinClassNames(
          'flex items-center justify-center',
          minHeightClassName,
          className,
        )}
      >
        <BrandIconLoadingIndicator size={24} />
      </div>
    );
  }

  const yAxisTickFormatter = (value: number) => {
    return formatNumber(value, {
      formatSpecifier: getMarketPriceFormatSpecifier(
        vrtxSpotMarket?.priceIncrement,
      ),
    });
  };

  return (
    <div className={joinClassNames(minHeightClassName, className)}>
      {/*Without this, the chart isn't responsive*/}
      <ResponsiveContainer
        width="99%"
        height="99%"
        className={minHeightClassName}
      >
        <AreaChart data={data}>
          <CartesianGrid {...GRID_PROPS} />
          <XAxis {...XAXIS_PROPS} />
          <YAxis {...Y_AXIS_PROPS} tickFormatter={yAxisTickFormatter} />
          <Area {...AREA_CHART_PROPS} />
        </AreaChart>
      </ResponsiveContainer>
      {/*Gradient used for the chart*/}
      <svg width={0} height={0}>
        <defs>
          <linearGradient id={GRADIENT_ID} x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="20%"
              stopColor={COLORS.accent.DEFAULT}
              stopOpacity={0.5}
            />
            <stop offset="100%" stopOpacity={0} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

const GRADIENT_ID = 'vrtx_price_chart';

export const GRID_PROPS: ComponentPropsWithoutRef<typeof CartesianGrid> = {
  stroke: COLORS.disabled.DEFAULT,
  strokeDasharray: '2 10',
  strokeWidth: 1,
  horizontalCoordinatesGenerator: () => [],
  verticalCoordinatesGenerator: (props) =>
    range(props.offset?.left ?? 0, props.width, 10),
};

const AREA_CHART_PROPS: Omit<AreaProps, 'ref'> = {
  strokeWidth: 2,
  type: 'linear',
  fillOpacity: 0.5,
  dataKey: (data: VrtxPriceChartDataItem) => data.price,
  stroke: COLORS.accent.DEFAULT,
  fill: `url(#${GRADIENT_ID})`,
};

const XAXIS_PROPS: XAxisProps = {
  dataKey: (data: VrtxPriceChartDataItem) => data.timestampMillis,
  type: 'number',
  scale: 'time',
  domain: ['auto', 'auto'],
  // We want to show 4 time indicators, and query asks for 24 data points
  interval: 6,
  padding: { right: 20 },
  tick: { fontSize: 10, color: COLORS.overlay.divider },
  axisLine: false,
  tickLine: false,
  stroke: COLORS.overlay.divider,
  tickMargin: 8,
  height: 20,
  tickFormatter: (value: number) => {
    return formatTimestamp(value, {
      formatSpecifier: TimeFormatSpecifier.HH_MM_12H,
    });
  },
};

export const Y_AXIS_PROPS: YAxisProps = {
  hide: true,
  // Pad the domain a bit
  domain: [
    (dataMin: number) => dataMin * 0.99,
    (dataMax: number) => dataMax * 1.01,
  ],
};
