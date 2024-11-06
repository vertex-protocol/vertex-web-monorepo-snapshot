import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { useTokenStakingPool } from 'client/modules/rewards/hooks/useTokenStakingPool';

export function StakingAvgApr() {
  const { poolAprAvg } = useTokenStakingPool();

  return (
    <ValueWithLabel.Horizontal
      // This is a one-off case where we want the value first so reversing `flex-direction` here
      className="flex-row-reverse items-baseline"
      valueClassName="text-accent gap-x-0"
      sizeVariant="lg"
      label="Avg. APR"
      value={poolAprAvg}
      numberFormatSpecifier={PresetNumberFormatSpecifier.PERCENTAGE_2DP}
    />
  );
}
