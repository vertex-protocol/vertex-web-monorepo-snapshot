import { joinClassNames } from '@vertex-protocol/web-common';
import { useStakingAprCard } from 'client/pages/VertexToken/components/StakingStatsCard/hooks/useStakingAprCard';
import { StakingAprCircles } from 'client/pages/VertexToken/components/StakingStatsCard/StakingAprCard/StakingAprCircles';
import { StakingRewardsCard } from 'client/pages/VertexToken/components/StakingStatsCard/StakingAprCard/StakingRewardsCard';
import { TOKEN_PAGE_RIGHT_SECTION_CLASSNAMES } from 'client/pages/VertexToken/consts';

export function StakingAprCard() {
  const {
    accountCurrentApr,
    accountRewardsClaimed,
    accountShareFraction,
    accountUsdcRewardsClaimable,
    accountUsdcRewardsEarned,
    estimatedAccountMaxApr,
    estimatedAccountMaxShareFraction,
    primaryQuoteToken: { symbol: quoteSymbol },
  } = useStakingAprCard();

  return (
    // Overflow hidden to clip overhanging shadows on the background circles
    <div
      className={joinClassNames(
        'bg-background overflow-hidden rounded-lg',
        'flex flex-col sm:flex-row',
        'gap-5 px-2.5 py-4',
      )}
    >
      <div className="relative h-52 sm:h-auto sm:flex-1">
        <StakingAprCircles
          className="absolute inset-0 mx-auto"
          accountCurrentApr={accountCurrentApr}
          accountShareFraction={accountShareFraction}
          estimatedAccountMaxApr={estimatedAccountMaxApr}
          estimatedAccountMaxShareFraction={estimatedAccountMaxShareFraction}
        />
      </div>
      <StakingRewardsCard
        className={TOKEN_PAGE_RIGHT_SECTION_CLASSNAMES}
        accountUsdcRewardsEarned={accountUsdcRewardsEarned}
        accountUsdcRewardsClaimable={accountUsdcRewardsClaimable}
        accountRewardsClaimed={accountRewardsClaimed}
        quoteSymbol={quoteSymbol}
      />
    </div>
  );
}
