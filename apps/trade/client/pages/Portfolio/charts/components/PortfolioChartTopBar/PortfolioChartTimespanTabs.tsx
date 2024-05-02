import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { TextButton } from '@vertex-protocol/web-ui';
import { PORTFOLIO_CHART_TIMESPAN_METADATA } from '../../consts';
import { ChartTimespan } from '../../types';
import { Root as TabsRoot, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
export interface Props extends WithClassnames {
  timespan: ChartTimespan;
  disabled?: boolean;

  setTimespan(timespan: ChartTimespan): void;
}

export function PortfolioChartTimespanTabs({
  className,
  timespan,
  disabled,
  setTimespan,
}: Props) {
  return (
    <TabsRoot
      value={timespan}
      onValueChange={(value) => setTimespan(value as ChartTimespan)}
      asChild
    >
      <TabsList className={joinClassNames('flex items-center', className)}>
        {Object.keys(PORTFOLIO_CHART_TIMESPAN_METADATA).map((key) => {
          const option = key as ChartTimespan;
          return (
            <TabsTrigger key={key} value={key} asChild>
              <TextButton
                className="p-1 text-xs"
                active={key === timespan}
                disabled={disabled}
              >
                {PORTFOLIO_CHART_TIMESPAN_METADATA[option].shortLabel}
              </TextButton>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </TabsRoot>
  );
}
