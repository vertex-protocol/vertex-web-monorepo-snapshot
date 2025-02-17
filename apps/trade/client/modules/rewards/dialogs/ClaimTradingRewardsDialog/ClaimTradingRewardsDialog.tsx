import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { Divider } from '@vertex-protocol/web-ui';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { HANDLED_BUTTON_USER_STATE_ERRORS } from 'client/components/ValidUserStatePrimaryButton/useButtonUserStateErrorProps';
import { ValidUserStatePrimaryButton } from 'client/components/ValidUserStatePrimaryButton/ValidUserStatePrimaryButton';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { ClaimAndStakeChangeItems } from 'client/modules/rewards/dialogs/ClaimTradingRewardsDialog/ClaimAndStakeChangeItems';
import { ClaimAndStakeRadioGroup } from 'client/modules/rewards/dialogs/ClaimTradingRewardsDialog/ClaimAndStakeRadioGroup';
import { ClaimTradingRewardsDialogParams } from 'client/modules/rewards/dialogs/ClaimTradingRewardsDialog/types';
import { useClaimTradingRewardsDialog } from 'client/modules/rewards/dialogs/ClaimTradingRewardsDialog/useClaimTradingRewardsDialog';

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
      <ClaimAndStakeChangeItems
        currentAmountStaked={currentAmountStaked}
        estimatedAmountStaked={estimatedAmountStaked}
        protocolTokenSymbol={protocolTokenSymbol}
      />
      <Divider />
      <ClaimAndStakeRadioGroup.LineItem
        label="Available Rewards"
        value={params.claimableRewards}
        numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
        valueEndElement={protocolTokenSymbol}
      />
    </div>
  );

  return (
    <BaseAppDialog.Container onClose={onClose}>
      <BaseAppDialog.Title onClose={onClose}>
        Claim Trading Rewards
      </BaseAppDialog.Title>
      <BaseAppDialog.Body>
        <ClaimAndStakeRadioGroup.Root
          value={selectedRadioId}
          onValueChange={setSelectedRadioId}
          disabled={disableRadioButtons}
        >
          <ClaimAndStakeRadioGroup.Card
            active={selectedRadioId === 'claim_and_stake'}
            value="claim_and_stake"
            title="Claim & Stake Rewards"
            description={`Your ${protocolTokenSymbol} rewards will be staked for you.`}
            expandableContent={expandableContent}
            disabled={disableRadioButtons}
          />
          <ClaimAndStakeRadioGroup.Card
            active={selectedRadioId === 'claim'}
            value="claim"
            title="Claim to Wallet"
            description={`You will receive ${protocolTokenSymbol} in your wallet.`}
            disabled={disableRadioButtons}
          />
        </ClaimAndStakeRadioGroup.Root>
        <ValidUserStatePrimaryButton
          isLoading={actionButtonState === 'loading'}
          disabled={actionButtonState === 'disabled'}
          onClick={onSubmit}
          handledErrors={
            HANDLED_BUTTON_USER_STATE_ERRORS.onlyIncorrectConnectedChain
          }
        >
          {buttonStateContent}
        </ValidUserStatePrimaryButton>
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}
