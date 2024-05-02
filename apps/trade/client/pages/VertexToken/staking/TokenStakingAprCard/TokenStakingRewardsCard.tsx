import { BigDecimal } from '@vertex-protocol/client';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { SecondaryButton } from '@vertex-protocol/web-ui';
import { UserActionState } from 'client/hooks/subaccount/useUserActionState';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { RewardsCard } from 'client/modules/rewards/components/RewardsCard';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { PresetNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';

interface Props extends WithClassnames {
  accountUsdcRewardsEarned: BigDecimal | undefined;
  accountRewardsClaimed: BigDecimal | undefined;
  accountUsdcRewardsClaimable: BigDecimal | undefined;
  userActionState: UserActionState;
  usdcSymbol: string;
}

export function TokenStakingRewardsCard({
  className,
  accountUsdcRewardsEarned,
  accountRewardsClaimed,
  accountUsdcRewardsClaimable,
  userActionState,
  usdcSymbol,
}: Props) {
  const { show } = useDialog();

  // Design wants these values to have a smaller font as they are used in a nested card
  const valueClassName = 'text-sm sm:text-base';

  const actionDisabled =
    !accountUsdcRewardsClaimable ||
    accountUsdcRewardsClaimable.isZero() ||
    userActionState === 'block_all';

  return (
    <div
      className={joinClassNames(
        'bg-surface-card flex flex-col gap-y-5 rounded p-4',
        className,
      )}
    >
      <DefinitionTooltip
        contentWrapperClassName="text-base text-text-primary"
        definitionId="stakingRewards"
      >
        Staking Rewards
      </DefinitionTooltip>
      <RewardsCard.LineItems>
        <RewardsCard.MetricStackedItem
          label="Total"
          value={accountUsdcRewardsEarned}
          formatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
          symbol={usdcSymbol}
          valueClassName={valueClassName}
        />
        <RewardsCard.MetricStackedItem
          label="Claimed"
          value={accountRewardsClaimed}
          formatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
          symbol={usdcSymbol}
          valueClassName={valueClassName}
        />
        <RewardsCard.MetricStackedItem
          label="Available to Claim"
          value={accountUsdcRewardsClaimable}
          formatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
          symbol={usdcSymbol}
          valueClassName={valueClassName}
        />
        <SecondaryButton
          size="lg"
          disabled={actionDisabled}
          onClick={() =>
            show({ type: 'claim_vrtx_staking_rewards', params: {} })
          }
        >
          Claim
        </SecondaryButton>
      </RewardsCard.LineItems>
    </div>
  );
}
