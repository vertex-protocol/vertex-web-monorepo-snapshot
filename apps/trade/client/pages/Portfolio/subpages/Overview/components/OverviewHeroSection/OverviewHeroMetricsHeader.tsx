import { BigDecimal } from '@vertex-protocol/utils';
import { joinClassNames } from '@vertex-protocol/web-common';
import { Icons } from '@vertex-protocol/web-ui';
import { useSubaccountTimespanMetrics } from 'client/hooks/subaccount/useSubaccountTimespanMetrics';
import { PrivateContent } from 'client/modules/privacy/components/PrivateContent';
import { usePrivacySetting } from 'client/modules/privacy/hooks/usePrivacySetting';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { PORTFOLIO_CHART_TIMESPAN_METADATA } from 'client/pages/Portfolio/charts/consts';
import { ChartTimespan } from 'client/pages/Portfolio/charts/types';
import { PortfolioHeroMetricsPane } from 'client/pages/Portfolio/components/PortfolioHeroMetricsPane';
import { PresetNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { signDependentValue } from 'client/utils/signDependentValue';

interface OverviewHeroHeaderProps {
  timespan: ChartTimespan;
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
  timespan: ChartTimespan;
}

function AccountPnl({
  cumulativeAccountPnl,
  cumulativeAccountPnlFrac,
  timespan,
}: OverviewAccountPnlProps) {
  const [areAccountValuesPrivate] = usePrivacySetting(
    'areAccountValuesPrivate',
  );
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
          positive: <Icons.MdArrowUpward size={14} />,
          negative: <Icons.MdArrowDownward size={14} />,
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
        {PORTFOLIO_CHART_TIMESPAN_METADATA[timespan].longLabel}
      </DefinitionTooltip>
    </div>
  );
}
