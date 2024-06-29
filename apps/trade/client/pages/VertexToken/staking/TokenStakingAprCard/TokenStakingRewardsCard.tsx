import { BigDecimal } from '@vertex-protocol/client';
import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { SecondaryButton } from '@vertex-protocol/web-ui';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { UserActionState } from 'client/hooks/subaccount/useUserActionState';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { RewardsCard } from 'client/modules/rewards/components/RewardsCard';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';

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
        <ValueWithLabel.Vertical
          sizeVariant="sm"
          label="Total"
          value={accountUsdcRewardsEarned}
          numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
          valueEndElement={usdcSymbol}
        />
        <ValueWithLabel.Vertical
          sizeVariant="sm"
          label="Claimed"
          value={accountRewardsClaimed}
          numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
          valueEndElement={usdcSymbol}
        />
        <ValueWithLabel.Vertical
          sizeVariant="sm"
          label="Available to Claim"
          value={accountUsdcRewardsClaimable}
          numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
          valueEndElement={usdcSymbol}
        />
        <SecondaryButton
          disabled={actionDisabled}
          size="sm"
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
