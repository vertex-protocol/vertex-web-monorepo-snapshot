import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { Divider, PrimaryButton } from '@vertex-protocol/web-ui';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { VRTX_TOKEN_INFO } from 'common/productMetadata/vertexTokenInfo';
import { startCase } from 'lodash';
import { RewardsSummaryCard } from '../RewardsSummaryCard';
import { EpochRewardsTable } from './EpochRewardsTable/EpochRewardsTable';
import { useVrtxSummaryCard } from './useVrtxSummaryCard';
import { VrtxClaimDeadlineWarning } from './VtrxClaimDeadlineWarning';

export function VrtxCollapsibleSummaryCard() {
  const {
    isOnProtocolTokenChain,
    protocolTokenMetadata,
    unclaimedLastEpochRewards,
    disableClaimButton,
    disableSwitchChainButton,
    setPrimaryChainEnv,
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
        {/*Total earned from on-chain data is accurate only on the protocol token chain*/}
        {isOnProtocolTokenChain && (
          <ValueWithLabel.Vertical
            label="Total Earned"
            value={totalRewardsEarned}
            numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
            tooltip={{ id: 'rewardsTotalRewardsEarned' }}
            valueEndElement={vrtxToken?.symbol}
          />
        )}
        <ValueWithLabel.Vertical
          label="Est. New"
          value={estimatedNewRewards}
          numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
          tooltip={{ id: 'rewardsEstimatedNewRewards' }}
          valueEndElement={vrtxToken?.symbol}
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
      <EpochRewardsTable isOnProtocolTokenChain={isOnProtocolTokenChain} />
    </>
  );

  const actionMetric = isOnProtocolTokenChain ? (
    <ValueWithLabel.Vertical
      label={`Available to Claim (${epochLabel})`}
      value={unclaimedLastEpochRewards}
      numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
      tooltip={{ id: 'rewardsAvailableToClaim' }}
      valueEndElement={vrtxToken?.symbol}
    />
  ) : null;

  const protocolTokenChainName = startCase(protocolTokenMetadata.chain.name);
  const action = isOnProtocolTokenChain ? (
    <RewardsSummaryCard.ActionWithHelperText helperText="Rewards are claimable a few days after each epoch ends. Unclaimed rewards are burned 30 days after the epoch ends.">
      <PrimaryButton
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
  ) : (
    <RewardsSummaryCard.ActionWithHelperText
      helperText={`Earned rewards can be viewed and claimed on ${protocolTokenChainName}`}
    >
      <PrimaryButton
        onClick={() => {
          setPrimaryChainEnv(protocolTokenMetadata.chainEnv);
        }}
        disabled={disableSwitchChainButton}
      >
        Switch to {protocolTokenChainName}
      </PrimaryButton>
    </RewardsSummaryCard.ActionWithHelperText>
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
        actionMetric={actionMetric}
        action={action}
        footer={
          <RewardsSummaryCard.FooterCountdown
            label={
              <div className="flex items-center gap-x-2.5 text-xs lg:text-sm">
                <span className="text-text-primary">
                  Epoch{' '}
                  {formatNumber(currentEpochNumber, {
                    formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
                  })}
                </span>
                <Divider vertical />
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
