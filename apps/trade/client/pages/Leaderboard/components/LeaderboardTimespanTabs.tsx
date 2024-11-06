import { Root as TabsRoot, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { SegmentedControl } from '@vertex-protocol/web-ui';
import { PerpsAiServerLeaderboardTimespan } from 'client/pages/Leaderboard/types';
import { TabIdentifiableList } from 'client/hooks/ui/tabs/types';
import { LeaderboardTimespanTabItem } from 'client/pages/Leaderboard/hooks/useLeaderboardTimespanTabs';

interface Props {
  timespan: PerpsAiServerLeaderboardTimespan;
  setTimespan: (id: string) => void;
  tabs: TabIdentifiableList<LeaderboardTimespanTabItem>;
}

export function LeaderboardTimespanTabs({
  timespan,
  setTimespan,
  tabs,
}: Props) {
  return (
    <TabsRoot value={timespan} onValueChange={setTimespan} asChild>
      <TabsList asChild>
        <SegmentedControl.Container>
          {tabs.map(({ id, label }) => {
            return (
              <TabsTrigger key={id} value={id} asChild>
                <SegmentedControl.Button
                  size="sm"
                  active={id === timespan}
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
