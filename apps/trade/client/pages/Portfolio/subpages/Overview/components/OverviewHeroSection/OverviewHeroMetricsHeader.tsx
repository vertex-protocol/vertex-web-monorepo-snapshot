import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { BigDecimal } from '@vertex-protocol/utils';
import { joinClassNames } from '@vertex-protocol/web-common';
import { Icons } from '@vertex-protocol/web-ui';
import { useSubaccountTimespanMetrics } from 'client/hooks/subaccount/useSubaccountTimespanMetrics';
import { PrivateContent } from 'client/modules/privacy/components/PrivateContent';
import { usePrivacySetting } from 'client/modules/privacy/hooks/usePrivacySetting';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { PortfolioHeroMetricsPane } from 'client/pages/Portfolio/components/PortfolioHeroMetricsPane';
import { signDependentValue } from '@vertex-protocol/react-client';
import { PortfolioChartTimespan } from 'client/pages/Portfolio/charts/types';
import { PORTFOLIO_CHART_TIMESPAN_METADATA } from 'client/pages/Portfolio/charts/consts';

interface OverviewHeroHeaderProps {
  timespan: PortfolioChartTimespan;
  portfolioValueUsd: BigDecimal | undefined;
}

export function OverviewHeroMetricsHeader({
  timespan,
  portfolioValueUsd,
}: OverviewHeroHeaderProps) {
  const { data: timespanMetrics } = useSubaccountTimespanMetrics(
    PORTFOLIO_CHART_TIMESPAN_METADATA[timespan].durationInSeconds,
  );

  return (
    <PortfolioHeroMetricsPane.Header
      title="Account"
      valueContent={formatNumber(portfolioValueUsd, {
        formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
      })}
      definitionTooltipId="overviewAccountValue"
      changeContent={
        <AccountPnl
          timespan={timespan}
          cumulativeAccountPnl={timespanMetrics?.deltas.cumulativeAccountPnlUsd}
          cumulativeAccountPnlFrac={
            timespanMetrics?.deltas.cumulativeAccountPnlFrac
          }
        />
      }
    />
  );
}

interface OverviewAccountPnlProps {
  cumulativeAccountPnl: BigDecimal | undefined;
  cumulativeAccountPnlFrac: BigDecimal | undefined;
  timespan: PortfolioChartTimespan;
}

function AccountPnl({
  cumulativeAccountPnl,
  cumulativeAccountPnlFrac,
  timespan,
}: OverviewAccountPnlProps) {
  const [areAccountValuesPrivate] = usePrivacySetting(
    'areAccountValuesPrivate',
  );
  const pnlTimespanLabel = `${PORTFOLIO_CHART_TIMESPAN_METADATA[timespan].longLabel} PnL`;

  return (
    <div className="text-2xs flex flex-wrap items-center gap-x-2 sm:text-xs">
      <PrivateContent
        className={joinClassNames(
          'flex items-center gap-x-0.5',
          signDependentValue(cumulativeAccountPnl, {
            positive: 'text-positive',
            negative: 'text-negative',
            zero: 'text-text-primary',
          }),
        )}
        isPrivate={areAccountValuesPrivate}
      >
        {signDependentValue(cumulativeAccountPnl, {
          positive: <Icons.ArrowUp size={14} />,
          negative: <Icons.ArrowDown size={14} />,
          zero: undefined,
        })}
        <div className="flex items-center gap-x-1">
          {formatNumber(cumulativeAccountPnl?.abs(), {
            formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
          })}
          <span>
            (
            {formatNumber(cumulativeAccountPnlFrac?.abs(), {
              formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
            })}
            )
          </span>
        </div>
      </PrivateContent>
      <DefinitionTooltip
        definitionId="overviewAccountPnL"
        contentWrapperClassName="text-text-tertiary"
      >
        {pnlTimespanLabel}
      </DefinitionTooltip>
    </div>
  );
}
