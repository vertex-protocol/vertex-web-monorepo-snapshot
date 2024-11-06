'use client';

import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { joinClassNames } from '@vertex-protocol/web-common';
import { Pill } from '@vertex-protocol/web-ui';
import { BlitzEarningsContentValueCard } from 'client/pages/BlitzRewards/components/earnings/BlitzEarningsContentValueCard';
import { useCurrentBlitzPointsEpoch } from 'client/pages/BlitzRewards/hooks/useCurrentBlitzPointsEpoch';

export function BlitzPointsEarningsCardContent() {
  const currentEpoch = useCurrentBlitzPointsEpoch();

  return (
    <>
      <BlitzEarningsContentValueCard
        label="Current Epoch"
        value={currentEpoch?.totalPoints}
      />
      <div
        className={joinClassNames(
          'flex items-center justify-center gap-x-3',
          'text-text-secondary text-xs',
        )}
      >
        <Pill
          sizeVariant="xs"
          borderRadiusVariant="base"
          colorVariant="tertiary"
        >
          Rank:
          <span className="text-text-primary">
            {formatNumber(currentEpoch?.rank, {
              formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
            })}
          </span>
        </Pill>
        Leaderboard below
      </div>
    </>
  );
}
