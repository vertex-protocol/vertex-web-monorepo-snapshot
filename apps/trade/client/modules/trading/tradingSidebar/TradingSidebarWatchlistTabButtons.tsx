import { TabsList, Root as TabsRoot, TabsTrigger } from '@radix-ui/react-tabs';
import { WithChildren, WithClassnames } from '@vertex-protocol/web-common';
import { SegmentedControl } from '@vertex-protocol/web-ui';
import { TradingSidebarWatchlistTabID } from 'client/modules/localstorage/userState/types/userTradingSidebarTypes';

interface Props extends WithClassnames, WithChildren {
  selectedWatchlistTabId: TradingSidebarWatchlistTabID;
  setSelectedWatchlistTabId: (tabId: TradingSidebarWatchlistTabID) => void;
}

const TABS: { id: TradingSidebarWatchlistTabID; label: string }[] = [
  {
    id: 'watchlist',
    label: 'Watchlist',
  },
  {
    id: 'all_markets',
    label: 'All Markets',
  },
];

export function TradingSidebarWatchlistTabButtons({
  className,
  selectedWatchlistTabId,
  setSelectedWatchlistTabId,
}: Props) {
  return (
    // Adding `TabsRoot` for arrow key navigation - filtering logic is done hook-side so we can share a single content component
    <TabsRoot
      className={className}
      value={selectedWatchlistTabId}
      onValueChange={(value) => {
        setSelectedWatchlistTabId(value as TradingSidebarWatchlistTabID);
      }}
    >
      {/*Tab buttons*/}
      <TabsList asChild>
        <SegmentedControl.Container>
          {TABS.map(({ id, label }) => {
            const isSelected = id === selectedWatchlistTabId;

            return (
              <TabsTrigger value={id} key={id} asChild>
                <SegmentedControl.Button
                  size="xs"
                  active={isSelected}
                  className="flex-1"
                >
                  {label}
                </SegmentedControl.Button>
              </TabsTrigger>
            );
          })}
        </SegmentedControl.Container>
      </TabsList>
    </TabsRoot>
  );
}
