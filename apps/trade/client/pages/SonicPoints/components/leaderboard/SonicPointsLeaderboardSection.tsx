import { SonicPointsLeaderboardTable } from 'client/pages/SonicPoints/components/leaderboard/SonicPointsLeaderboardTable';
import { SonicPointsSectionHeader } from 'client/pages/SonicPoints/components/SonicPointsSectionHeader';

export function SonicPointsLeaderboardSection() {
  return (
    <>
      <SonicPointsSectionHeader
        title="Leaderboard"
        description="Updates every hour"
      />
      <SonicPointsLeaderboardTable />
    </>
  );
}
