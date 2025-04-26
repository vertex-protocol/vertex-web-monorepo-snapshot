'use client';

import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { useSonicPoints } from 'client/hooks/query/points/useSonicPoints';
import { useMemo } from 'react';

export function SonicPointsHeroCreditsCardMetrics() {
  const { data: sonicPointsData } = useSonicPoints();

  const { accountRank, accountTotalPointsEarned } = useMemo(() => {
    const accountTotalPointsEarned = sonicPointsData
      ? sonicPointsData.tradingPoints.plus(sonicPointsData.referralPoints)
      : undefined;

    return {
      accountTotalPointsEarned,
      // The query will return the rank as maxRank - 1 if points equal 0,
      // but we want to show nothing rather than an invalid rank
      accountRank: accountTotalPointsEarned?.isZero()
        ? undefined
        : sonicPointsData?.rank,
    };
  }, [sonicPointsData]);

  return (
    <div className="grid grid-cols-2">
      <ValueWithLabel.Vertical
        sizeVariant="lg"
        label="Total Credits Earned"
        value={accountTotalPointsEarned}
        numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_INT}
      />
      <ValueWithLabel.Vertical
        sizeVariant="lg"
        label="Rank"
        value={accountRank}
        numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_INT}
      />
    </div>
  );
}
