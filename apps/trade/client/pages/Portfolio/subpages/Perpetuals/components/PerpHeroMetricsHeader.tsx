import { BigDecimal } from '@vertex-protocol/utils';
import { joinClassNames } from '@vertex-protocol/web-common';
import { Icons } from '@vertex-protocol/web-ui';
import { useDerivedSubaccountOverview } from 'client/hooks/subaccount/useDerivedSubaccountOverview';
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

interface PerpHeroHeaderProps {
  timespan: ChartTimespan;
}

export function PerpHeroMetricsHeader({ timespan }: PerpHeroHeaderProps) {
  const { data: timespanMetrics } = useSubaccountTimespanMetrics(
    PORTFOLIO_CHART_TIMESPAN_METADATA[timespan].durationInSeconds,
  );
  const { data: subaccountSummary } = useDerivedSubaccountOverview();

  return (
    <PortfolioHeroMetricsPane.Header
      title="Total Perp PnL"
      definitionTooltipId="perpTotalPerpPnl"
      valueContent={formatNumber(
        subaccountSummary?.perp.totalCumulativePnlUsd,
        {
          formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
        },
      )}
      changeContent={
        <PerpPnl
          timespan={timespan}
          cumulativeTotalPerpPnl={
            timespanMetrics?.deltas?.cumulativeTotalPerpPnlUsd
          }
          cumulativeTotalPerpPnlFrac={
            timespanMetrics?.deltas?.cumulativeTotalPerpPnlFrac
          }
        />
      }
    />
  );
}

interface PerpPnlProps {
  cumulativeTotalPerpPnl: BigDecimal | undefined;
  cumulativeTotalPerpPnlFrac?: BigDecimal | undefined;
  timespan: ChartTimespan;
}

function PerpPnl({
  cumulativeTotalPerpPnl,
  cumulativeTotalPerpPnlFrac,
  timespan,
}: PerpPnlProps) {
  const [areAccountValuesPrivate] = usePrivacySetting(
    'areAccountValuesPrivate',
  );

  return (
    <div className="text-2xs flex items-center gap-x-2 sm:text-xs">
      <PrivateContent
        isPrivate={areAccountValuesPrivate}
        className={joinClassNames(
          'flex items-center gap-x-0.5',
          signDependentValue(cumulativeTotalPerpPnl, {
            positive: 'text-positive',
            negative: 'text-negative',
            zero: 'text-text-primary',
          }),
        )}
      >
        {signDependentValue(cumulativeTotalPerpPnl, {
          positive: <Icons.MdArrowUpward size={14} />,
          negative: <Icons.MdArrowDownward size={14} />,
          zero: undefined,
        })}
        <div className="flex items-center gap-x-1">
          {formatNumber(cumulativeTotalPerpPnl?.abs(), {
            formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
          })}
          <span>
            (
            {formatNumber(cumulativeTotalPerpPnlFrac?.abs(), {
              formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
            })}
            )
          </span>
        </div>
      </PrivateContent>
      <DefinitionTooltip
        definitionId="perpPnLOverTime"
        contentWrapperClassName="text-text-tertiary"
      >
        {PORTFOLIO_CHART_TIMESPAN_METADATA[timespan].longLabel}
      </DefinitionTooltip>
    </div>
  );
}
