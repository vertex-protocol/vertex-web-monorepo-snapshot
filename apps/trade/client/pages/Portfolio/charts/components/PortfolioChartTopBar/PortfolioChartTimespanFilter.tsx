import * as RadioGroup from '@radix-ui/react-radio-group';
import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { TabTextButton } from '@vertex-protocol/web-ui';
import { PORTFOLIO_CHART_TIMESPAN_METADATA } from 'client/pages/Portfolio/charts/consts';
import { ChartTimespan } from 'client/pages/Portfolio/charts/types';

export interface Props extends WithClassnames {
  timespan: ChartTimespan;
  disabled?: boolean;

  setTimespan(timespan: ChartTimespan): void;
}

export function PortfolioChartTimespanFilter({
  className,
  timespan,
  setTimespan,
}: Props) {
  return (
    <RadioGroup.Root
      value={timespan}
      onValueChange={(value) => setTimespan(value as ChartTimespan)}
      className={joinClassNames('flex items-center', className)}
    >
      {Object.keys(PORTFOLIO_CHART_TIMESPAN_METADATA).map((key) => {
        const option = key as ChartTimespan;
        return (
          <RadioGroup.Item key={key} value={key} asChild>
            <TabTextButton className="p-1 text-xs" active={key === timespan}>
              {PORTFOLIO_CHART_TIMESPAN_METADATA[option].shortLabel}
            </TabTextButton>
          </RadioGroup.Item>
        );
      })}
    </RadioGroup.Root>
  );
}
