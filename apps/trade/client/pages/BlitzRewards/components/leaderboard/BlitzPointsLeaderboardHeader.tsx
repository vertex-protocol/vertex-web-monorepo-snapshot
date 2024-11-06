'use client';

import { Countdown } from 'client/components/Countdown';
import { BlitzRewardsPageHeader } from 'client/pages/BlitzRewards/components/BlitzRewardsPageHeader';
import { useCurrentBlitzPointsEpoch } from 'client/pages/BlitzRewards/hooks/useCurrentBlitzPointsEpoch';

export function BlitzPointsLeaderboardHeader() {
  const currentEpoch = useCurrentBlitzPointsEpoch();

  return (
    <BlitzRewardsPageHeader
      title={
        <div className="flex flex-col gap-x-4 gap-y-2.5 sm:flex-row sm:items-center">
          <h2>Epoch Leaderboard</h2>
          <div className="text-text-tertiary flex items-center gap-x-4 text-sm">
            Ends in
            <Countdown
              segmentClassName="text-base lg:text-xl"
              unitClassName="text-xs lg:text-sm"
              endTimeMillis={currentEpoch?.endTimeMillis}
            />
          </div>
        </div>
      }
    />
  );
}
