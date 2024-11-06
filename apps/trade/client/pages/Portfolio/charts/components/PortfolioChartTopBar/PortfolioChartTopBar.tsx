import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { TabIdentifiableList } from 'client/hooks/ui/tabs/types';
import { PortfolioChartTabs } from 'client/pages/Portfolio/charts/components/PortfolioChartTopBar/PortfolioChartTabs';
import { PortfolioChartTimespanFilter } from 'client/pages/Portfolio/charts/components/PortfolioChartTopBar/PortfolioChartTimespanFilter';
import {
  ChartTimespan,
  PortfolioChartTab,
} from 'client/pages/Portfolio/charts/types';

interface Props<TTabID extends string> extends WithClassnames {
  tabs: TabIdentifiableList<PortfolioChartTab<TTabID>>;
  timespan: ChartTimespan;
  selectedTabId: TTabID;
  setTimespan: (timespan: ChartTimespan) => void;
}

export function PortfolioChartTopBar<TTabID extends string>({
  className,
  tabs,
  timespan,
  selectedTabId,
  setTimespan,
}: Props<TTabID>) {
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
      <PortfolioChartTimespanFilter
        timespan={timespan}
        setTimespan={setTimespan}
        className="self-end sm:self-auto"
      />
    </div>
  );
}
