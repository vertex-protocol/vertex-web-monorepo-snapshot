import {
  PresetNumberFormatSpecifier,
  formatNumber,
} from '@vertex-protocol/react-client';
import { joinClassNames } from '@vertex-protocol/web-common';
import { Divider, PrimaryButton } from '@vertex-protocol/web-ui';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { RewardsSummaryCard } from '../RewardsSummaryCard';
import { useMantleRewardsSummaryCard } from './useMantleRewardsSummaryCard';

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
        <ValueWithLabel.Vertical
          label="Est. New"
          tooltip={{ id: 'rewardsFoundationEstNew' }}
          value={estimatedWeekRewards}
          valueEndElement={mantleToken.symbol}
          numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
        />
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
            <PrimaryButton
              onClick={onClaimClick}
              isLoading={isClaiming}
              disabled={disableClaimButton}
            >
              {claimButtonLabel}
            </PrimaryButton>
          </RewardsSummaryCard.ActionWithHelperText>
        }
        footer={
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
        }
      />
    </RewardsSummaryCard.Container>
  );
}
