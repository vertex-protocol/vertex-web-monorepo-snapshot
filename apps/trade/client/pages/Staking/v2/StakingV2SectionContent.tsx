import { StakingV2ActionsCard } from 'client/pages/Staking/v2/StakingV2ActionsCard';
import { StakingV2PositionCard } from 'client/pages/Staking/v2/StakingV2PositionCard';
import { StakingV2TopBar } from 'client/pages/Staking/v2/StakingV2TopBar';
import { useStakingV2Section } from 'client/pages/Staking/v2/useStakingV2Section';

export function StakingV2SectionContent() {
  const {
    amountStaked,
    amountStakedValueUsd,
    currentBalance,
    currentBalanceValueUsd,
    currentAmountEarned,
    currentAmountEarnedValueUsd,
    combinedPoolLiquidSupplyFraction,
    combinedPoolTotalBalance,
    isUnstakedClaimable,
    lastUsdcDistributionAmount,
    shareOfPool,
    stakingApr,
    unstakedClaimable,
    unstakedClaimableTimeMillis,
    isWithdrawUnstakedTxLoading,
    protocolTokenSymbol,
    stakingV2HistoryUrl,
    withdrawUnstaked,
  } = useStakingV2Section();

  return (
    <div className="flex flex-col gap-y-4">
      <StakingV2TopBar
        usdcFeesRedirected={lastUsdcDistributionAmount}
        liquidSupplyFraction={combinedPoolLiquidSupplyFraction}
        stakingApy={stakingApr}
        totalStaked={combinedPoolTotalBalance}
      />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <StakingV2PositionCard
          amountStaked={amountStaked}
          amountStakedValueUsd={amountStakedValueUsd}
          currentAmountEarned={currentAmountEarned}
          currentAmountEarnedUsd={currentAmountEarnedValueUsd}
          currentBalance={currentBalance}
          currentBalanceValueUsd={currentBalanceValueUsd}
          shareOfPool={shareOfPool}
          protocolTokenSymbol={protocolTokenSymbol}
          stakingV2HistoryUrl={stakingV2HistoryUrl}
        />
        <StakingV2ActionsCard
          isUnstakedClaimable={isUnstakedClaimable}
          protocolTokenSymbol={protocolTokenSymbol}
          unstakedClaimable={unstakedClaimable}
          unstakedClaimableTimeMillis={unstakedClaimableTimeMillis}
          withdrawUnstaked={withdrawUnstaked}
          isWithdrawUnstakedTxLoading={isWithdrawUnstakedTxLoading}
        />
      </div>
    </div>
  );
}
