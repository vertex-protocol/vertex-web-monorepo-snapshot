import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { usePerpsAiUserStats } from 'client/pages/Leaderboard/hooks/usePerpsAiUserStats';

export function LeaderboardUserStats() {
  const { data: userStats } = usePerpsAiUserStats();

  return (
    <div className="flex flex-col gap-y-2">
      <span>Your All Time Stats</span>
      <div className="flex gap-x-8">
        <ValueWithLabel.Vertical
          label="Rank"
          value={userStats?.rank ? userStats.rank : undefined}
          numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_INT}
        />
        <ValueWithLabel.Vertical
          label="PnL"
          value={userStats?.pnl}
          numberFormatSpecifier={
            CustomNumberFormatSpecifier.CURRENCY_LARGE_ABBREVIATED
          }
        />
        <ValueWithLabel.Vertical
          label="Volume"
          value={userStats?.volume}
          numberFormatSpecifier={
            CustomNumberFormatSpecifier.CURRENCY_LARGE_ABBREVIATED
          }
        />
      </div>
    </div>
  );
}
