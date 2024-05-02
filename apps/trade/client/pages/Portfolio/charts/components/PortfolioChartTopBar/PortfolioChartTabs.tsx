import { TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { SegmentedControl } from '@vertex-protocol/web-ui';
import { TabIdentifiableList } from 'client/hooks/ui/tabs/types';
import { PortfolioChartTab } from '../../types';

interface Props<TTabID extends string> extends WithClassnames {
  tabs: TabIdentifiableList<PortfolioChartTab<TTabID>>;
  selectedTabId: TTabID;
  disabled?: boolean;
}

export function PortfolioChartTabs<TTabID extends string>({
  className,
  tabs,
  selectedTabId,
  disabled,
}: Props<TTabID>) {
  return (
    <TabsList asChild>
      <SegmentedControl.Container
        className={joinClassNames('min-w-max p-px', className)}
      >
        {tabs.map(({ id, label }) => (
          <TabsTrigger key={id} value={id} asChild>
            <SegmentedControl.Button
              size="sm"
              className="flex-1 py-1"
              active={!disabled && id === selectedTabId}
              disabled={disabled}
            >
              {label}
            </SegmentedControl.Button>
          </TabsTrigger>
        ))}
      </SegmentedControl.Container>
    </TabsList>
  );
}
