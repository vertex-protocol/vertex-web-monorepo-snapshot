import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { Divider, PrimaryButton } from '@vertex-protocol/web-ui';
import { BaseDialog } from 'client/components/BaseDialog/BaseDialog';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { ClaimTradingRewardsDialogParams } from 'client/modules/rewards/dialogs/staking/ClaimTradingRewardsDialog/types';
import { StakingClaimAndStakeChangeItems } from '../components/StakingClaimAndStakeChangeItems';
import { StakingRadioGroup } from '../components/StakingRadioGroup';
import { useClaimTradingRewardsDialog } from './useClaimTradingRewardsDialog';

export function ClaimTradingRewardsDialog(
  params: ClaimTradingRewardsDialogParams,
) {
  const {
    actionButtonState,
    selectedRadioId,
    currentAmountStaked,
    estimatedAmountStaked,
    protocolTokenSymbol,
    disableRadioButtons,
    onSubmit,
    onClose,
    setSelectedRadioId,
  } = useClaimTradingRewardsDialog(params);

  const buttonStateContent = (() => {
    const isClaimAndStake = selectedRadioId === 'claim_and_stake';

    switch (actionButtonState) {
      case 'loading':
        return isClaimAndStake ? 'Confirm Claim & Stake' : 'Confirm Claim';
      case 'success':
        return (
          <ButtonStateContent.Success
            message={
              isClaimAndStake ? 'Claim & Stake Successful' : 'Rewards Claimed'
            }
          />
        );
      case 'disabled':
        return 'Select an Option';
      default:
        return isClaimAndStake ? 'Claim & Stake' : 'Claim to Wallet';
    }
  })();

  const expandableContent = (
    <div className="flex flex-col gap-y-4">
      <StakingClaimAndStakeChangeItems
        currentAmountStaked={currentAmountStaked}
        estimatedAmountStaked={estimatedAmountStaked}
        protocolTokenSymbol={protocolTokenSymbol}
      />
      <Divider />
      <StakingRadioGroup.LineItem
        label="Available Rewards"
        value={params.claimableRewards}
        numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
        valueEndElement={protocolTokenSymbol}
      />
    </div>
  );

  return (
    <BaseAppDialog onClose={onClose}>
      <BaseDialog.Title onClose={onClose}>
        Claim Trading Rewards
      </BaseDialog.Title>
      <BaseDialog.Body className="flex flex-col gap-y-6">
        <StakingRadioGroup.Root
          value={selectedRadioId}
          onValueChange={setSelectedRadioId}
          disabled={disableRadioButtons}
        >
          <StakingRadioGroup.Card
            active={selectedRadioId === 'claim_and_stake'}
            value="claim_and_stake"
            title="Claim & Stake Rewards"
            description={`Your ${protocolTokenSymbol} rewards will be staked for you.`}
            expandableContent={expandableContent}
            disabled={disableRadioButtons}
          />
          <StakingRadioGroup.Card
            active={selectedRadioId === 'claim'}
            value="claim"
            title="Claim to Wallet"
            description={`You will receive ${protocolTokenSymbol} in your wallet.`}
            disabled={disableRadioButtons}
          />
        </StakingRadioGroup.Root>
        <PrimaryButton
          isLoading={actionButtonState === 'loading'}
          disabled={actionButtonState === 'disabled'}
          onClick={onSubmit}
        >
          {buttonStateContent}
        </PrimaryButton>
      </BaseDialog.Body>
    </BaseAppDialog>
  );
}
