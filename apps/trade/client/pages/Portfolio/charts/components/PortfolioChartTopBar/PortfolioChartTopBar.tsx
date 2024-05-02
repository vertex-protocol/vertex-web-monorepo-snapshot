import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { TabIdentifiableList } from 'client/hooks/ui/tabs/types';
import { ChartTimespan, PortfolioChartTab } from '../../types';
import { PortfolioChartTabs } from './PortfolioChartTabs';
import { PortfolioChartTimespanTabs } from './PortfolioChartTimespanTabs';

interface Props<TTabID extends string> extends WithClassnames {
  tabs: TabIdentifiableList<PortfolioChartTab<TTabID>>;
  timespan: ChartTimespan;
  selectedTabId: TTabID;
  setTimespan: (timespan: ChartTimespan) => void;
  disableButtons?: boolean;
}

export function PortfolioChartTopBar<TTabID extends string>({
  className,
  tabs,
  timespan,
  selectedTabId,
  setTimespan,
  disableButtons,
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
        disabled={disableButtons}
        className="w-full sm:w-44"
      />
      <PortfolioChartTimespanTabs
        timespan={timespan}
        setTimespan={setTimespan}
        disabled={disableButtons}
        className="self-end sm:self-auto"
      />
    </div>
  );
}
