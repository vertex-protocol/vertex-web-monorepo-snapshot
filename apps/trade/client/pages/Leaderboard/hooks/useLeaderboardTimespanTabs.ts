import { useTabs } from 'client/hooks/ui/tabs/useTabs';
import { PerpsAiServerLeaderboardTimespan } from 'client/pages/Leaderboard/types';

export interface LeaderboardTimespanTabItem {
  id: PerpsAiServerLeaderboardTimespan;
  label: string;
}

const LEADERBOARD_TIMESPAN_TABS: LeaderboardTimespanTabItem[] = [
  {
    id: '1d',
    label: '1D',
  },
  {
    id: '30d',
    label: '30D',
  },
  {
    id: '90d',
    label: '90D',
  },
  {
    id: 'alltime',
    label: 'All Time',
  },
];

export function useLeaderboardTimespanTabs() {
  const { selectedTabId, setSelectedUntypedTabId, tabs } = useTabs(
    LEADERBOARD_TIMESPAN_TABS,
  );

  return {
    selectedTabId,
    setSelectedUntypedTabId,
    tabs,
  };
}
