'use client';

import { joinClassNames } from '@vertex-protocol/web-common';
import { LinkButton } from '@vertex-protocol/web-ui';
import { AppPage } from 'client/modules/app/AppPage';
import { LeaderboardTable } from 'client/pages/Leaderboard/components/LeaderboardTable';
import { LeaderboardTimespanTabs } from 'client/pages/Leaderboard/components/LeaderboardTimespanTabs';
import { LeaderboardUserStats } from 'client/pages/Leaderboard/components/LeaderboardUserStats';
import { useLeaderboardTimespanTabs } from 'client/pages/Leaderboard/hooks/useLeaderboardTimespanTabs';
import { LINKS } from 'common/brandMetadata/links/links';
import Link from 'next/link';

export function LeaderboardPage() {
  const { selectedTabId, setSelectedUntypedTabId, tabs } =
    useLeaderboardTimespanTabs();

  return (
    <AppPage.Content>
      <div className="flex flex-col gap-y-2 sm:flex-row sm:justify-between">
        <AppPage.Header
          title="Leaderboard"
          description={
            <p>
              Check out the best traders on Vertex. Rankings include data from
              Arbitrum and Mantle. Powered by{' '}
              <LinkButton
                as={Link}
                href={LINKS.perpsAi}
                external
                colorVariant="primary"
              >
                PerpsAI
              </LinkButton>
              .
            </p>
          }
        />
      </div>
      <div
        className={joinClassNames(
          'flex flex-col items-start gap-y-4',
          'sm:flex-row sm:items-end sm:justify-between',
        )}
      >
        <LeaderboardUserStats />
        <LeaderboardTimespanTabs
          timespan={selectedTabId}
          setTimespan={setSelectedUntypedTabId}
          tabs={tabs}
        />
      </div>
      <LeaderboardTable timespan={selectedTabId} />
    </AppPage.Content>
  );
}
