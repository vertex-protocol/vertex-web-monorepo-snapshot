import { mapValues } from '@vertex-protocol/client';
import { WithClassnames } from '@vertex-protocol/web-common';
import { BrandLoadingWrapper } from 'client/components/BrandIconLoadingWrapper/BrandLoadingWrapper';
import { DepthChartTooltip } from 'client/modules/trading/chart/depth/DepthChartTooltip';
import { useDepthChart } from 'client/modules/trading/chart/depth/useDepthChart';
import { COLORS } from 'common/theme/colors';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

const GRADIENT_IDS = {
  bids: 'bids_grad',
  asks: 'asks_grad',
};

const GRADIENT_URLS = mapValues(GRADIENT_IDS, (id) => `url(#${id})`);

interface Props extends WithClassnames {
  productId: number | undefined;
}

export function DepthChart({ productId, className }: Props) {
  const {
    chartData,
    priceFormatSpecifier,
    sizeFormatSpecifier,
    isLoading,
    symbol,
  } = useDepthChart({
    productId,
    limit: 75,
  });

  return (
    <BrandLoadingWrapper
      isLoading={isLoading}
      indicatorContainerClassName="h-full w-full"
      grayscale
    >
      <ResponsiveContainer className={className}>
        <AreaChart data={chartData} margin={{ left: 0, right: 0 }}>
          {/* Gradient Definitions */}
          <defs>
            <linearGradient id={GRADIENT_IDS.bids} y1={0} y2={1} x1={1} x2={0}>
              <stop stopColor={COLORS.positive.DEFAULT} stopOpacity={0.5} />
              <stop offset="100%" stopOpacity={0.2} />
            </linearGradient>
            <linearGradient id={GRADIENT_IDS.asks} y1={0} y2={1} x1={0} x2={1}>
              <stop stopColor={COLORS.negative.DEFAULT} stopOpacity={0.5} />
              <stop offset="100%" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <XAxis dataKey="price" hide />
          {/* Asks chart */}
          <Area
            type="stepAfter"
            stroke={COLORS.negative.DEFAULT}
            activeDot={{ stroke: COLORS.negative.DEFAULT }}
            fill={GRADIENT_URLS.asks}
            dataKey="cumulativeAskSize"
            isAnimationActive={false}
          />
          {/* Bids chart */}
          <Area
            type="stepBefore"
            stroke={COLORS.positive.DEFAULT}
            activeDot={{ stroke: COLORS.positive.DEFAULT }}
            fill={GRADIENT_URLS.bids}
            dataKey="cumulativeBidSize"
            isAnimationActive={false}
          />
          <Tooltip
            content={
              <DepthChartTooltip
                symbol={symbol}
                priceFormatSpecifier={priceFormatSpecifier}
                sizeFormatSpecifier={sizeFormatSpecifier}
              />
            }
            cursor={{
              stroke: COLORS.disabled.DEFAULT,
              strokeDasharray: '5 5',
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </BrandLoadingWrapper>
  );
}
