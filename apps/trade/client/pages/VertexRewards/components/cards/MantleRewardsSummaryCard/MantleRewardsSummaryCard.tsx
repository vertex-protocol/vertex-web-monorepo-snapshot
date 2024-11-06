import {
  PresetNumberFormatSpecifier,
  formatNumber,
} from '@vertex-protocol/react-client';
import { Divider } from '@vertex-protocol/web-ui';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { HANDLED_BUTTON_USER_STATE_ERRORS } from 'client/components/ValidUserStatePrimaryButton/useButtonUserStateErrorProps';
import { ValidUserStatePrimaryButton } from 'client/components/ValidUserStatePrimaryButton/ValidUserStatePrimaryButton';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { useMantleRewardsSummaryCard } from 'client/pages/VertexRewards/components/cards/MantleRewardsSummaryCard/useMantleRewardsSummaryCard';
import { RewardsSummaryCard } from 'client/pages/VertexRewards/components/cards/RewardsSummaryCard';

export function MantleRewardsSummaryCard() {
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
    mantleToken,
    isCompleted,
  } = useMantleRewardsSummaryCard();

  const claimButtonLabel = (() => {
    if (isClaiming) {
      return 'Confirm Claim';
    }
    if (isClaimSuccess) {
      return <ButtonStateContent.Success message="Claim Successful" />;
    }
    return `Claim MNT Incentives`;
  })();

  const formattedCurrentWeek = formatNumber(currentWeek, {
    formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
  });

  const metricItems = (() => {
    return (
      <>
        <ValueWithLabel.Vertical
          label="Total Earned"
          tooltip={{ id: 'rewardsFoundationTotalEarned' }}
          value={totalRealizedRewards}
          valueEndElement={mantleToken.symbol}
          numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
        />
        <ValueWithLabel.Vertical
          label="Claimed"
          value={claimedRewards}
          valueEndElement={mantleToken.symbol}
          numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
        />
        {!isCompleted && (
          <ValueWithLabel.Vertical
            label="Est. New"
            tooltip={{ id: 'rewardsFoundationEstNew' }}
            value={estimatedWeekRewards}
            valueEndElement={mantleToken.symbol}
            numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
          />
        )}
      </>
    );
  })();

  return (
    <RewardsSummaryCard.Container className="to-surface-card from-surface-3 bg-gradient-to-r">
      <RewardsSummaryCard.Content
        header={
          <RewardsSummaryCard.IconHeader
            iconSrc={mantleToken.icon.asset}
            title="MNT Incentives"
            iconClassName="aspect-square w-7"
          />
        }
        metricItems={metricItems}
        actionMetric={
          <ValueWithLabel.Vertical
            label="Available to Claim"
            tooltip={{ id: 'rewardsFoundationAvailableToClaim' }}
            value={unclaimedRealizedRewards}
            valueEndElement={mantleToken.symbol}
            numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
          />
        }
        action={
          <RewardsSummaryCard.ActionWithHelperText helperText="Rewards are distributed as wMNT, the wrapped version of MNT. Rewards are claimable a few days after each week ends.">
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
            <div className="text-sm">MNT Incentives Completed</div>
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
