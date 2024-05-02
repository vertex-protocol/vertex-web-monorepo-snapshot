import { BigDecimal } from '@vertex-protocol/client';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { UserActionState } from 'client/hooks/subaccount/useUserActionState';
import { TOKEN_PAGE_RIGHT_SECTION_CLASSNAMES } from '../../consts';
import { TokenStakingAprCircles } from './TokenStakingAprCircles';
import { TokenStakingRewardsCard } from './TokenStakingRewardsCard';

interface Props extends WithClassnames {
  accountCurrentApr: BigDecimal | undefined;
  estimatedAccountMaxApr: BigDecimal | undefined;
  accountShareFraction: BigDecimal | undefined;
  accountUsdcRewardsEarned: BigDecimal | undefined;
  accountUsdcRewardsClaimable: BigDecimal | undefined;
  accountRewardsClaimed: BigDecimal | undefined;
  estimatedAccountMaxShareFraction: BigDecimal | undefined;
  userActionState: UserActionState;
  usdcSymbol: string;
}

export function TokenStakingAprCard({
  className,
  estimatedAccountMaxApr,
  accountCurrentApr,
  accountShareFraction,
  accountUsdcRewardsClaimable,
  accountUsdcRewardsEarned,
  estimatedAccountMaxShareFraction,
  accountRewardsClaimed,
  userActionState,
  usdcSymbol,
}: Props) {
  return (
    // Overflow hidden to clip overhanging shadows on the background circles
    <div
      className={joinClassNames(
        'bg-background overflow-hidden rounded-lg',
        'flex flex-col sm:flex-row',
        'gap-5 px-2.5 py-4',
        className,
      )}
    >
      <div className="relative h-52 sm:h-auto sm:flex-1">
        <TokenStakingAprCircles
          className="absolute inset-0 mx-auto"
          accountCurrentApr={accountCurrentApr}
          accountShareFraction={accountShareFraction}
          estimatedAccountMaxApr={estimatedAccountMaxApr}
          estimatedAccountMaxShareFraction={estimatedAccountMaxShareFraction}
        />
      </div>
      <TokenStakingRewardsCard
        className={joinClassNames(
          TOKEN_PAGE_RIGHT_SECTION_CLASSNAMES,
          // We want the earnings card to be full width only on mobile
          'sm:w-1/2',
        )}
        accountUsdcRewardsEarned={accountUsdcRewardsEarned}
        accountUsdcRewardsClaimable={accountUsdcRewardsClaimable}
        accountRewardsClaimed={accountRewardsClaimed}
        userActionState={userActionState}
        usdcSymbol={usdcSymbol}
      />
    </div>
  );
}
