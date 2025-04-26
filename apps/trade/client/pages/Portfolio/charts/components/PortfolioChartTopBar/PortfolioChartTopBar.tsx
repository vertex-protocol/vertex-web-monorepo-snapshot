import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { TabIdentifiableList } from 'client/hooks/ui/tabs/types';
import { ChartTimespanRadioGroup } from 'client/modules/charts/components/ChartTimespanRadioGroup';
import { PortfolioChartTabs } from 'client/pages/Portfolio/charts/components/PortfolioChartTopBar/PortfolioChartTabs';
import { PORTFOLIO_CHART_TIMESPAN_METADATA } from 'client/pages/Portfolio/charts/consts';
import {
  PortfolioChartTab,
  PortfolioChartTimespan,
} from 'client/pages/Portfolio/charts/types';
import { Dispatch, SetStateAction, useMemo } from 'react';

interface Props<TTabID extends string> extends WithClassnames {
  tabs: TabIdentifiableList<PortfolioChartTab<TTabID>>;
  timespan: PortfolioChartTimespan;
  selectedTabId: TTabID;
  setTimespan: Dispatch<SetStateAction<PortfolioChartTimespan>>;
}

export function PortfolioChartTopBar<TTabID extends string>({
  className,
  tabs,
  timespan,
  selectedTabId,
  setTimespan,
}: Props<TTabID>) {
  const timespanOptions = useMemo(() => {
    return Object.entries(PORTFOLIO_CHART_TIMESPAN_METADATA).map(
      ([key, { shortLabel }]) => ({
        label: shortLabel,
        value: key as PortfolioChartTimespan,
      }),
    );
  }, []);

  return (
    <div
      className={joinClassNames(
        'flex flex-col gap-y-2',
        'sm:flex-row sm:items-center sm:justify-between sm:gap-x-4',
        className,
      )}
    >
      <PortfolioChartTabs
        selectedTabId={selectedTabId}
        tabs={tabs}
        className="sm:w-44"
      />
      <ChartTimespanRadioGroup
        timespan={timespan}
        setTimespan={setTimespan}
        timespanOptions={timespanOptions}
        className="self-end sm:self-auto"
      />
    </div>
  );
}
