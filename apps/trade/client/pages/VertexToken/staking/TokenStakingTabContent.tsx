import {
  joinClassNames,
  VERTEX_SPECIFIC_LINKS,
} from '@vertex-protocol/web-common';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { useUserActionState } from 'client/hooks/subaccount/useUserActionState';
import { RewardsCard } from 'client/modules/rewards/components/RewardsCard';
import { useTokenStaking } from 'client/modules/rewards/hooks/useTokenStaking';
import { TOKEN_ICONS } from 'common/productMetadata/tokenIcons';
import Image from 'next/image';
import Link from 'next/link';
import { TokenStakingAprCard } from './TokenStakingAprCard/TokenStakingAprCard';
import { TokenStakingDismissibleBanner } from './TokenStakingDismissibleBanner';
import { TokenStakingMoreDetailsCard } from './TokenStakingMoreDetailsCard';
import { TokenStakingPoolStats } from './TokenStakingPoolStats';
import { TokenStakingTopBarItems } from './TokenStakingTopBarItems';

export function TokenStakingTabContent() {
  const { primaryQuoteToken, protocolToken } = useVertexMetadataContext();
  const userActionState = useUserActionState();
  const {
    accountStaked,
    accountStakedValueUsd,
    accountScore,
    accountMaxScore,
    accountCurrentApr,
    accountScoreMultiplierFraction,
    accountShareFraction,
    accountUsdcRewardsEarned,
    accountUsdcRewardsClaimable,
    accountUnstakedClaimable,
    accountAvailableToStake,
    accountUnstakedLocked,
    poolTotalScore,
    poolTotalStaked,
    poolAvgApr,
    poolLiquidSupplyFraction,
    lastStakeTimeMillis,
    lastUnstakeTimeMillis,
    maxScoreTimeMillis,
    accountRewardsClaimed,
    lastRewardsDistributionAmount,
    estimatedAccountMaxApr,
    estimatedAccountMaxShareFraction,
  } = useTokenStaking();

  return (
    <div className="relative flex flex-col gap-y-6">
      <GradientEllipseBackground />
      <TokenStakingDismissibleBanner protocolToken={protocolToken} />
      <RewardsCard.Container>
        <div className="flex flex-col gap-y-3">
          <RewardsCard.Header
            contentWrapperClassName="flex items-center gap-x-2"
            endElement={
              <RewardsCard.HeaderLinkButton
                color="white"
                as={Link}
                href={VERTEX_SPECIFIC_LINKS.stakeVrtxDocs}
                external
                withExternalIcon
              >
                Staking Guide
              </RewardsCard.HeaderLinkButton>
            }
          >
            <Image
              src={TOKEN_ICONS.vovrtx.asset}
              alt="VRTX"
              className="h-auto w-10"
            />
            Staking
          </RewardsCard.Header>
          <TokenStakingTopBarItems
            accountScore={accountScore}
            accountStakedValueUsd={accountStakedValueUsd}
            accountStaked={accountStaked}
            accountScoreMultiplierFraction={accountScoreMultiplierFraction}
            accountMaxScore={accountMaxScore}
            accountAvailableToStake={accountAvailableToStake}
            userActionState={userActionState}
            usdcSymbol={primaryQuoteToken.symbol}
          />
        </div>
        <div className="flex flex-col gap-y-3">
          <TokenStakingAprCard
            accountCurrentApr={accountCurrentApr}
            estimatedAccountMaxApr={estimatedAccountMaxApr}
            accountShareFraction={accountShareFraction}
            estimatedAccountMaxShareFraction={estimatedAccountMaxShareFraction}
            accountUsdcRewardsEarned={accountUsdcRewardsEarned}
            accountUsdcRewardsClaimable={accountUsdcRewardsClaimable}
            accountRewardsClaimed={accountRewardsClaimed}
            userActionState={userActionState}
            usdcSymbol={primaryQuoteToken.symbol}
          />
          <TokenStakingMoreDetailsCard
            lastStakeTimeMillis={lastStakeTimeMillis}
            maxScoreTimeMillis={maxScoreTimeMillis}
            lastUnstakeTimeMillis={lastUnstakeTimeMillis}
            accountUnstakedLocked={accountUnstakedLocked}
            accountUnstakedClaimable={accountUnstakedClaimable}
            userActionState={userActionState}
          />
        </div>
      </RewardsCard.Container>
      <TokenStakingPoolStats
        poolTotalStaked={poolTotalStaked}
        poolTotalScore={poolTotalScore}
        poolAvgApr={poolAvgApr}
        poolLiquidSupplyFraction={poolLiquidSupplyFraction}
        lastRewardsDistributionAmount={lastRewardsDistributionAmount}
        usdcSymbol={primaryQuoteToken.symbol}
      />
    </div>
  );
}

function GradientEllipseBackground() {
  return (
    <div
      className={joinClassNames(
        'bg-overlay-accent/30 absolute -z-10',
        'left-1/2 top-24 -translate-x-1/2',
        'h-[151px] w-[492px] rounded-[492px]',
        'blur-[150px]',
      )}
    />
  );
}
