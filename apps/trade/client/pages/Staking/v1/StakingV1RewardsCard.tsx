import { BigDecimal } from '@vertex-protocol/client';
import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { joinClassNames } from '@vertex-protocol/web-common';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { StakingCard } from 'client/pages/Staking/components/StakingCard';
import { StakingSecondaryClaimButton } from 'client/pages/Staking/components/StakingSecondaryClaimButton';
import { STAKING_DESKTOP_ACTION_BUTTON_WIDTH } from 'client/pages/Staking/consts';

interface Props {
  accountUsdcRewardsClaimable: BigDecimal | undefined;
  accountUsdcRewardsEarned: BigDecimal | undefined;
  claimV1StakingRewards(): void;
  isClaimV1StakingRewardsTxLoading: boolean;
}

export function StakingV1RewardsCard({
  accountUsdcRewardsClaimable,
  accountUsdcRewardsEarned,
  claimV1StakingRewards,
  isClaimV1StakingRewardsTxLoading,
}: Props) {
  return (
    <StakingCard
      titleContent="Rewards"
      contentClassName="lg:flex-row lg:items-end lg:justify-between"
    >
      <div
        className={joinClassNames(
          'flex flex-col gap-y-4',
          'sm:flex-row sm:items-center sm:gap-x-8',
        )}
      >
        <ValueWithLabel.Vertical
          sizeVariant="lg"
          label="Rewards Claimable"
          value={accountUsdcRewardsClaimable}
          numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
          valueEndElement="USDC"
        />
        <ValueWithLabel.Vertical
          sizeVariant="lg"
          label="Rewards Earned"
          value={accountUsdcRewardsEarned}
          numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
          valueEndElement="USDC"
        />
      </div>
      <StakingSecondaryClaimButton
        className={STAKING_DESKTOP_ACTION_BUTTON_WIDTH}
        isLoading={isClaimV1StakingRewardsTxLoading}
        onClick={claimV1StakingRewards}
      >
        {isClaimV1StakingRewardsTxLoading ? 'Confirm Claim' : 'Claim Rewards'}
      </StakingSecondaryClaimButton>
    </StakingCard>
  );
}
