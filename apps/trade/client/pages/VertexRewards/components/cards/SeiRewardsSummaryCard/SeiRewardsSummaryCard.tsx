import {
  PresetNumberFormatSpecifier,
  formatNumber,
} from '@vertex-protocol/react-client';
import { joinClassNames } from '@vertex-protocol/web-common';
import { Divider } from '@vertex-protocol/web-ui';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { HANDLED_BUTTON_USER_STATE_ERRORS } from 'client/components/ValidUserStatePrimaryButton/useButtonUserStateErrorProps';
import { ValidUserStatePrimaryButton } from 'client/components/ValidUserStatePrimaryButton/ValidUserStatePrimaryButton';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { RewardsSummaryCard } from 'client/pages/VertexRewards/components/cards/RewardsSummaryCard';
import { useSeiRewardsSummaryCard } from 'client/pages/VertexRewards/components/cards/SeiRewardsSummaryCard/useSeiRewardsSummaryCard';

export function SeiRewardsSummaryCard() {
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
    seiToken,
    isCompleted,
  } = useSeiRewardsSummaryCard();

  const claimButtonLabel = (() => {
    if (isClaiming) {
      return 'Confirm Claim';
    }

    if (isClaimSuccess) {
      return <ButtonStateContent.Success message="Claim Successful" />;
    }

    return 'Claim SEI Incentives';
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
          valueEndElement={seiToken.symbol}
          numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
        />
        <ValueWithLabel.Vertical
          label="Claimed"
          value={claimedRewards}
          valueEndElement={seiToken.symbol}
          numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
        />
        {!isCompleted && (
          <ValueWithLabel.Vertical
            label="Est. New"
            tooltip={{ id: 'rewardsFoundationEstNew' }}
            value={estimatedWeekRewards}
            valueEndElement={seiToken.symbol}
            numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
          />
        )}
      </>
    );
  })();

  return (
    <RewardsSummaryCard.Container
      className={joinClassNames(
        'to-surface-card from-surface-3 bg-gradient-to-r',
        'ring-stroke',
      )}
    >
      <RewardsSummaryCard.Content
        header={
          <RewardsSummaryCard.IconHeader
            iconSrc={seiToken.icon.asset}
            title="SEI Incentives"
            iconClassName="aspect-square w-7"
          />
        }
        metricItems={metricItems}
        actionMetric={
          <ValueWithLabel.Vertical
            label="Available to Claim"
            tooltip={{ id: 'rewardsFoundationAvailableToClaim' }}
            value={unclaimedRealizedRewards}
            valueEndElement={seiToken.symbol}
            numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
          />
        }
        action={
          <RewardsSummaryCard.ActionWithHelperText helperText="Rewards are distributed as wSEI, the wrapped version of SEI. Rewards are claimable a few days after each week ends.">
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
            <div className="text-sm">SEI Incentives Completed</div>
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
