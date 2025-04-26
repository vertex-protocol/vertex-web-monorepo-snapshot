import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { Pill } from '@vertex-protocol/web-ui';
import { AppPage } from 'client/modules/app/AppPage';
import { StakingV1PositionCard } from 'client/pages/Staking/v1/StakingV1PositionCard';
import { StakingV1RewardsCard } from 'client/pages/Staking/v1/StakingV1RewardsCard';
import { StakingV1UnstakeCard } from 'client/pages/Staking/v1/StakingV1UnstakeCard';
import { useStakingV1Section } from 'client/pages/Staking/v1/useStakingV1Section';

export function StakingV1SectionContent({ className }: WithClassnames) {
  const {
    accountUsdcRewardsClaimable,
    accountUsdcRewardsEarned,
    unstakedUnlockTimeMillis,
    sectionState,
    amountStaked,
    amountStakedValueUsd,
    accountUnstakedClaimable,
    accountUnstakedLocked,
    claimV1StakingRewards,
    isClaimV1StakingRewardsTxLoading,
    withdrawClaimable,
    isWithdrawUnstakedTxLoading,
    protocolTokenSymbol,
  } = useStakingV1Section();

  if (!sectionState.showSection) {
    return null;
  }

  return (
    <div className={joinClassNames('flex flex-col gap-y-4', className)}>
      <AppPage.Header
        title={
          <span className="flex items-center gap-x-3">
            V1 Staking
            <Pill
              colorVariant="warning"
              sizeVariant="xs"
              borderRadiusVariant="sm"
            >
              Actions Needed
            </Pill>
          </span>
        }
        description="Action required for your V1 position and unclaimed rewards."
      />
      {sectionState.showPositionCard && (
        <StakingV1PositionCard
          amountStaked={amountStaked}
          amountStakedValueUsd={amountStakedValueUsd}
          protocolTokenSymbol={protocolTokenSymbol}
        />
      )}
      {sectionState.showRewardsCard && (
        <StakingV1RewardsCard
          accountUsdcRewardsClaimable={accountUsdcRewardsClaimable}
          accountUsdcRewardsEarned={accountUsdcRewardsEarned}
          claimV1StakingRewards={claimV1StakingRewards}
          isClaimV1StakingRewardsTxLoading={isClaimV1StakingRewardsTxLoading}
        />
      )}
      {sectionState.showUnstakedCard && (
        <StakingV1UnstakeCard
          accountUnstakedLocked={accountUnstakedLocked}
          accountUnstakedClaimable={accountUnstakedClaimable}
          unstakedUnlockTimeMillis={unstakedUnlockTimeMillis}
          isUnstakedClaimable={sectionState.isUnstakedClaimable}
          isUnstakedLocked={sectionState.isUnstakedLocked}
          withdrawClaimable={withdrawClaimable}
          isWithdrawUnstakedTxLoading={isWithdrawUnstakedTxLoading}
          protocolTokenSymbol={protocolTokenSymbol}
        />
      )}
    </div>
  );
}
