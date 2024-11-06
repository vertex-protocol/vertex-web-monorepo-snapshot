'use client';

import { useAddressBlitzPoints } from 'client/hooks/query/points/useAddressBlitzPoints';
import { BlitzEarningsContentValueCard } from 'client/pages/BlitzRewards/components/earnings/BlitzEarningsContentValueCard';

export function BlitzBlastGoldEarningsCardContent() {
  const { data: blitzPointsData } = useAddressBlitzPoints();

  return (
    <BlitzEarningsContentValueCard
      label="Total Earned"
      value={blitzPointsData?.blast.gold}
    />
  );
}
