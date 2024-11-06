import { TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { SegmentedControl } from '@vertex-protocol/web-ui';
import { TabIdentifiableList } from 'client/hooks/ui/tabs/types';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { PortfolioChartTab } from 'client/pages/Portfolio/charts/types';

interface Props<TTabID extends string> extends WithClassnames {
  tabs: TabIdentifiableList<PortfolioChartTab<TTabID>>;
  selectedTabId: TTabID;
}

export function PortfolioChartTabs<TTabID extends string>({
  className,
  tabs,
  selectedTabId,
}: Props<TTabID>) {
  return (
    <TabsList asChild>
      <SegmentedControl.Container
        className={joinClassNames('min-w-max p-px', className)}
      >
        {tabs.map(({ id, label, labelDefinitionId }) => (
          <TabsTrigger key={id} value={id} asChild>
            <SegmentedControl.Button
              size="sm"
              className="flex-1 gap-x-1 py-1"
              active={id === selectedTabId}
            >
              {label}
              <DefinitionTooltip
                definitionId={labelDefinitionId}
                decoration={{ icon: { size: 12 } }}
              />
            </SegmentedControl.Button>
          </TabsTrigger>
        ))}
      </SegmentedControl.Container>
    </TabsList>
  );
}
