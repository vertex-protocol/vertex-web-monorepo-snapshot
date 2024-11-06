import { PORTFOLIO_CHART_GRADIENT_IDS } from 'client/pages/Portfolio/charts/consts';
import { COLORS } from 'common/theme/colors';

export function PortfolioChartGradientDefinitions() {
  return (
    <svg width={0} height={0}>
      <defs>
        <linearGradient
          id={PORTFOLIO_CHART_GRADIENT_IDS.accountValue}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0" stopColor={COLORS.accent.DEFAULT} />
          <stop offset="100%" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          id={PORTFOLIO_CHART_GRADIENT_IDS.deposits}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0" stopColor={COLORS.positive.DEFAULT} />
          <stop offset="100%" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          id={PORTFOLIO_CHART_GRADIENT_IDS.lpPosition}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0" stopColor={COLORS.accent.DEFAULT} />
          <stop offset="100%" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          id={PORTFOLIO_CHART_GRADIENT_IDS.netBalance}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop
            offset="20%"
            stopColor={COLORS.accent.DEFAULT}
            stopOpacity={0.5}
          />
          <stop offset="100%" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          id={PORTFOLIO_CHART_GRADIENT_IDS.borrows}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop
            offset="20%"
            stopColor={COLORS.accent.DEFAULT}
            stopOpacity={0.5}
          />
          <stop offset="100%" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
}
