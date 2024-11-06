import { BigDecimal } from '@vertex-protocol/client';
import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { SecondaryButton } from '@vertex-protocol/web-ui';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { RewardsCard } from 'client/modules/rewards/components/RewardsCard';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';

interface Props extends WithClassnames {
  accountUsdcRewardsEarned: BigDecimal | undefined;
  accountRewardsClaimed: BigDecimal | undefined;
  accountUsdcRewardsClaimable: BigDecimal | undefined;
  quoteSymbol: string;
}

export function StakingRewardsCard({
  className,
  accountUsdcRewardsEarned,
  accountRewardsClaimed,
  accountUsdcRewardsClaimable,
  quoteSymbol,
}: Props) {
  const { show } = useDialog();

  const isConnected = useIsConnected();

  const actionDisabled =
    !accountUsdcRewardsClaimable ||
    accountUsdcRewardsClaimable.isZero() ||
    !isConnected;

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
          valueEndElement={quoteSymbol}
        />
        <ValueWithLabel.Vertical
          sizeVariant="sm"
          label="Claimed"
          value={accountRewardsClaimed}
          numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
          valueEndElement={quoteSymbol}
        />
        <ValueWithLabel.Vertical
          sizeVariant="sm"
          label="Available to Claim"
          value={accountUsdcRewardsClaimable}
          numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
          valueEndElement={quoteSymbol}
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
