'use client';

import { VRTX_TOKEN_INFO } from '@vertex-protocol/react-client';
import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import {
  COMMON_TRANSPARENCY_COLORS,
  Divider,
  PrimaryButton,
} from '@vertex-protocol/web-ui';
import { HANDLED_BUTTON_USER_STATE_ERRORS } from 'client/components/ValidUserStatePrimaryButton/useButtonUserStateErrorProps';
import { ValidUserStatePrimaryButton } from 'client/components/ValidUserStatePrimaryButton/ValidUserStatePrimaryButton';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { RewardsSummaryCard } from 'client/pages/VertexRewards/components/cards/RewardsSummaryCard';
import { EpochRewardsTable } from 'client/pages/VertexRewards/components/cards/VrtxCollapsibleSummaryCard/EpochRewardsTable/EpochRewardsTable';
import { useVrtxSummaryCard } from 'client/pages/VertexRewards/components/cards/VrtxCollapsibleSummaryCard/useVrtxSummaryCard';

export function VrtxCollapsibleSummaryCard() {
  const {
    isOnProtocolTokenChainEnv,
    protocolTokenChainName,
    protocolTokenMetadata,
    unclaimedLastEpochRewards,
    disableClaimButton,
    switchToProtocolTokenChainEnv,
    epochEndTimeMillis,
    currentEpochNumber,
    estimatedNewRewards,
    totalRewardsEarned,
    nextEpochNumber,
    lastCompletedEpoch,
  } = useVrtxSummaryCard();
  const { show } = useDialog();

  const vrtxTokenSymbol = protocolTokenMetadata.token.symbol;
  const epochLabel = `Epoch ${formatNumber(lastCompletedEpoch?.epochNumber, {
    formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
  })}`;

  const metricItemsContent = (() => {
    return (
      <>
        {/*Total earned from on-chain data is accurate only on the protocol token chain*/}
        {isOnProtocolTokenChainEnv && (
          <ValueWithLabel.Vertical
            label="Total Earned"
            value={totalRewardsEarned}
            numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
            tooltip={{ id: 'rewardsTotalRewardsEarned' }}
            valueEndElement={vrtxTokenSymbol}
          />
        )}
        <ValueWithLabel.Vertical
          label="Est. New"
          value={estimatedNewRewards}
          numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
          tooltip={{ id: 'rewardsEstimatedNewRewards' }}
          valueEndElement={vrtxTokenSymbol}
        />
      </>
    );
  })();

  const collapsibleContent = (
    <>
      <RewardsSummaryCard.CollapsibleTitle>
        Summary
      </RewardsSummaryCard.CollapsibleTitle>
      <EpochRewardsTable
        isOnProtocolTokenChainEnv={isOnProtocolTokenChainEnv}
      />
    </>
  );

  const actionMetric = isOnProtocolTokenChainEnv ? (
    <ValueWithLabel.Vertical
      label={`Available to Claim (${epochLabel})`}
      value={unclaimedLastEpochRewards}
      numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
      tooltip={{ id: 'rewardsAvailableToClaim' }}
      valueEndElement={vrtxTokenSymbol}
    />
  ) : null;

  const action = isOnProtocolTokenChainEnv ? (
    <RewardsSummaryCard.ActionWithHelperText helperText="Rewards are claimable a few days after each epoch ends. Claim rewards for past epochs in the Summary.">
      <ValidUserStatePrimaryButton
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
        handledErrors={
          HANDLED_BUTTON_USER_STATE_ERRORS.onlyIncorrectConnectedChain
        }
      >
        Claim {epochLabel} Rewards
      </ValidUserStatePrimaryButton>
    </RewardsSummaryCard.ActionWithHelperText>
  ) : (
    <RewardsSummaryCard.ActionWithHelperText
      helperText={`Earned rewards can be viewed and claimed on ${protocolTokenChainName}`}
    >
      <PrimaryButton onClick={switchToProtocolTokenChainEnv}>
        Switch to {protocolTokenChainName}
      </PrimaryButton>
    </RewardsSummaryCard.ActionWithHelperText>
  );

  return (
    <RewardsSummaryCard.Container
      className="to-surface-card from-overlay-accent/20 border-accent bg-gradient-to-r"
      collapsibleTriggerClassName={COMMON_TRANSPARENCY_COLORS.bgAccent}
      collapsibleContent={collapsibleContent}
    >
      <RewardsSummaryCard.Content
        header={
          <div className="flex flex-col gap-y-4 lg:flex-row lg:justify-between">
            <RewardsSummaryCard.IconHeader
              iconSrc={VRTX_TOKEN_INFO.icon.asset}
              title={VRTX_TOKEN_INFO.symbol}
            />
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
