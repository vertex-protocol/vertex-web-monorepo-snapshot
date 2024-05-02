import { joinClassNames } from '@vertex-protocol/web-common';
import { PrimaryButton } from '@vertex-protocol/web-ui';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { RewardsCard } from 'client/modules/rewards/components/RewardsCard';
import { useArbRewardsSummaryCard } from 'client/pages/VertexRewards/components/cards/ArbRewardsSummaryCard/useArbRewardsSummaryCard';
import { PresetNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import { RewardsSummaryCard } from '../RewardsSummaryCard';

export function ArbRewardsSummaryCard() {
  const {
    onChainTotalRealizedRewards,
    unclaimedRealizedRewards,
    claimedRewards,
    disableClaimButton,
    onClaimClick,
    isClaimSuccess,
    isClaiming,
    arbToken,
  } = useArbRewardsSummaryCard();

  const claimButtonLabel = (() => {
    if (isClaiming) {
      return 'Confirm Claim';
    }
    if (isClaimSuccess) {
      return <ButtonStateContent.Success message="Claim Successful" />;
    }
    return `Claim ARB Incentives`;
  })();

  const metricItems = (() => {
    return (
      <>
        <RewardsCard.MetricStackedItem
          label="Total Earned"
          definitionId="rewardsArbTotalEarned"
          value={onChainTotalRealizedRewards}
          symbol={arbToken.symbol}
          formatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
        />
        <RewardsCard.MetricStackedItem
          label="Claimed"
          value={claimedRewards}
          symbol={arbToken.symbol}
          formatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
        />
      </>
    );
  })();

  return (
    <RewardsSummaryCard.Container
      className={joinClassNames(
        'to-surface-card bg-gradient-to-r from-[#3A80D2]/30',
        'ring-[#3A80D2]',
      )}
    >
      <RewardsSummaryCard.Content
        header={
          <RewardsSummaryCard.IconHeader
            iconSrc={arbToken.icon.asset}
            title={`${arbToken.symbol} Incentives`}
            iconClassName="aspect-square w-7"
          />
        }
        metricItems={metricItems}
        actionMetric={
          <RewardsCard.MetricStackedItem
            definitionId="rewardsArbAvailableToClaim"
            label="Available to Claim"
            value={unclaimedRealizedRewards}
            symbol={arbToken.symbol}
            formatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
          />
        }
        action={
          <RewardsSummaryCard.ActionWithHelperText helperText="Rewards are claimable a few days after each week ends.">
            <PrimaryButton
              size="lg"
              onClick={onClaimClick}
              isLoading={isClaiming}
              disabled={disableClaimButton}
              className={joinClassNames(
                !isClaiming && !disableClaimButton && 'bg-[#3A80D2]',
                // The default purple text during loading looks a bit odd with the blue style, so overriding to be white
                isClaiming && 'text-text-secondary',
              )}
            >
              {claimButtonLabel}
            </PrimaryButton>
          </RewardsSummaryCard.ActionWithHelperText>
        }
        footer={<div className="text-sm">Arb Incentives Completed</div>}
      />
    </RewardsSummaryCard.Container>
  );
}
