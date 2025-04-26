import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { Divider } from '@vertex-protocol/web-ui';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { HANDLED_BUTTON_USER_STATE_ERRORS } from 'client/components/ValidUserStatePrimaryButton/useButtonUserStateErrorProps';
import { ValidUserStatePrimaryButton } from 'client/components/ValidUserStatePrimaryButton/ValidUserStatePrimaryButton';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { RewardsSummaryCard } from 'client/pages/VertexRewards/components/cards/RewardsSummaryCard';
import { useSonicRewardsSummaryCard } from 'client/pages/VertexRewards/components/cards/SonicRewardsSummaryCard/useSonicRewardsSummaryCard';

export function SonicRewardsSummaryCard() {
  const {
    totalRealizedRewards,
    estimatedWeekRewards,
    unclaimedRealizedRewards,
    claimedRewards,
    currentWeek,
    currentWeekEndTimeMillis,
    disableClaimButton,
    onClaimClick,
    isClaimSuccess,
    isClaiming,
    foundationToken,
    isCompleted,
  } = useSonicRewardsSummaryCard();

  const claimButtonLabel = (() => {
    if (isClaiming) {
      return 'Confirm Claim';
    }
    if (isClaimSuccess) {
      return <ButtonStateContent.Success message="Claim Successful" />;
    }
    return `Claim Sonic Incentives`;
  })();

  const formattedCurrentWeek = formatNumber(currentWeek, {
    formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
  });

  const metricItems = (() => {
    return (
      <>
        <ValueWithLabel.Vertical
          sizeVariant="lg"
          label="Total Earned"
          tooltip={{ id: 'rewardsFoundationTotalEarned' }}
          value={totalRealizedRewards}
          valueEndElement={foundationToken.symbol}
          numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
        />
        <ValueWithLabel.Vertical
          sizeVariant="lg"
          label="Claimed"
          value={claimedRewards}
          valueEndElement={foundationToken.symbol}
          numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
        />
        {!isCompleted && (
          <ValueWithLabel.Vertical
            sizeVariant="lg"
            label="Est. New"
            tooltip={{ id: 'rewardsFoundationEstNew' }}
            value={estimatedWeekRewards}
            valueEndElement={foundationToken.symbol}
            numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
          />
        )}
      </>
    );
  })();

  return (
    <RewardsSummaryCard.Container className="to-surface-card from-surface-3 bg-linear-to-r">
      <RewardsSummaryCard.Content
        header={
          <RewardsSummaryCard.IconHeader
            iconSrc={foundationToken.icon.asset}
            title="Sonic Incentives"
            iconClassName="aspect-square w-7"
          />
        }
        metricItems={metricItems}
        actionMetric={
          <ValueWithLabel.Vertical
            sizeVariant="lg"
            label="Available to Claim"
            tooltip={{ id: 'rewardsFoundationAvailableToClaim' }}
            value={unclaimedRealizedRewards}
            valueEndElement={foundationToken.symbol}
            numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
          />
        }
        action={
          <RewardsSummaryCard.ActionWithHelperText helperText="Rewards are distributed as wS, the wrapped version of S. Rewards are claimable a few days after each week ends.">
            <ValidUserStatePrimaryButton
              onClick={onClaimClick}
              isLoading={isClaiming}
              disabled={disableClaimButton}
              handledErrors={
                HANDLED_BUTTON_USER_STATE_ERRORS.onlyIncorrectConnectedChain
              }
            >
              {claimButtonLabel}
            </ValidUserStatePrimaryButton>
          </RewardsSummaryCard.ActionWithHelperText>
        }
        footer={
          isCompleted ? (
            <div className="text-sm">Sonic Incentives Completed</div>
          ) : (
            <RewardsSummaryCard.FooterCountdown
              label={
                <div className="flex items-center gap-x-2.5">
                  <span className="text-text-primary font-medium">
                    Week {formattedCurrentWeek}
                  </span>
                  <Divider className="h-3" vertical />
                  <span>Week {formattedCurrentWeek} ends in:</span>
                </div>
              }
              countdownTimeMillis={currentWeekEndTimeMillis}
            />
          )
        }
      />
    </RewardsSummaryCard.Container>
  );
}
