import { Divider, PrimaryButton } from '@vertex-protocol/web-ui';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { RewardsCard } from 'client/modules/rewards/components/RewardsCard';
import { PresetNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { VRTX_TOKEN_INFO } from 'common/productMetadata/vertexTokenInfo';
import { RewardsSummaryCard } from '../RewardsSummaryCard';
import { EpochRewardsTable } from './EpochRewardsTable/EpochRewardsTable';
import { VrtxClaimDeadlineWarning } from './VtrxClaimDeadlineWarning';
import { useVrtxSummaryCard } from './useVrtxSummaryCard';

export function VrtxCollapsibleSummaryCard() {
  const {
    unclaimedLastEpochRewards,
    disableClaimButton,
    epochEndTimeMillis,
    currentEpochNumber,
    estimatedNewRewards,
    totalRewardsEarned,
    vrtxToken,
    nextEpochNumber,
    lastCompletedEpoch,
    showClaimWarning,
  } = useVrtxSummaryCard();
  const { show } = useDialog();

  const epochLabel = `Epoch ${formatNumber(lastCompletedEpoch?.epochNumber, {
    formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
  })}`;

  const metricItemsContent = (() => {
    return (
      <>
        <RewardsCard.MetricStackedItem
          label="Total Earned"
          value={totalRewardsEarned}
          formatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
          definitionId="rewardsTotalRewardsEarned"
          symbol={vrtxToken?.symbol}
        />
        <RewardsCard.MetricStackedItem
          label="Est. New"
          value={estimatedNewRewards}
          formatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
          definitionId="rewardsEstimatedNewRewards"
          symbol={vrtxToken?.symbol}
        />
      </>
    );
  })();

  const collapsibleContent = (
    <>
      <RewardsSummaryCard.CollapsibleTitle>
        Summary
        <p className="text-text-secondary text-2xs lg:text-xs">
          You have 30 days to claim rewards after an epoch is complete.
        </p>
      </RewardsSummaryCard.CollapsibleTitle>
      <EpochRewardsTable />
    </>
  );

  return (
    <RewardsSummaryCard.Container
      className="to-surface-card from-overlay-accent/20 ring-accent bg-gradient-to-r"
      collapsibleTriggerClassName="bg-overlay-accent/20"
      collapsibleContent={collapsibleContent}
    >
      <RewardsSummaryCard.Content
        header={
          <div className="flex flex-col gap-y-4 lg:flex-row lg:justify-between">
            <RewardsSummaryCard.IconHeader
              iconSrc={VRTX_TOKEN_INFO.icon.asset}
              title={VRTX_TOKEN_INFO.symbol}
            />
            {showClaimWarning && (
              <VrtxClaimDeadlineWarning
                lastCompletedEpoch={lastCompletedEpoch}
              />
            )}
          </div>
        }
        metricItems={metricItemsContent}
        actionMetric={
          <RewardsCard.MetricStackedItem
            label={`Available to Claim (${epochLabel})`}
            value={unclaimedLastEpochRewards}
            formatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
            definitionId="rewardsAvailableToClaim"
            symbol={vrtxToken?.symbol}
          />
        }
        action={
          <RewardsSummaryCard.ActionWithHelperText helperText="Rewards are claimable a few days after each epoch ends. Unclaimed rewards are burned 30 days after the epoch ends.">
            <PrimaryButton
              size="lg"
              onClick={() => {
                if (!lastCompletedEpoch || !unclaimedLastEpochRewards) {
                  return;
                }
                show({
                  type: 'claim_vrtx_trading_rewards',
                  params: {
                    epochNumber: lastCompletedEpoch.epochNumber,
                    claimableRewards: unclaimedLastEpochRewards,
                  },
                });
              }}
              disabled={disableClaimButton}
            >
              Claim {epochLabel} Rewards
            </PrimaryButton>
          </RewardsSummaryCard.ActionWithHelperText>
        }
        footer={
          <RewardsSummaryCard.FooterCountdown
            label={
              <div className="flex items-center gap-x-2.5 text-xs lg:text-sm">
                <span className="text-text-primary font-medium">
                  Epoch{' '}
                  {formatNumber(currentEpochNumber, {
                    formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
                  })}
                </span>
                <Divider className="h-3" vertical />
                <span>
                  Epoch{' '}
                  {formatNumber(nextEpochNumber, {
                    formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
                  })}{' '}
                  starts in:
                </span>
              </div>
            }
            countdownTimeMillis={epochEndTimeMillis}
          />
        }
      />
    </RewardsSummaryCard.Container>
  );
}
