import {
  CustomNumberFormatSpecifier,
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { Divider, PrimaryButton } from '@vertex-protocol/web-ui';
import { AmountWithSymbol } from 'client/components/AmountWithSymbol';
import { BaseDialog } from 'client/components/BaseDialog/BaseDialog';
import { ButtonStateContent } from 'client/components/ButtonStateContent';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import Image from 'next/image';
import { StakingClaimAndStakeChangeItems } from '../components/StakingClaimAndStakeChangeItems';
import { StakingRadioGroup } from '../components/StakingRadioGroup';

// Assets
import camelotLogo from './assets/camelot.svg';
import { useClaimStakingRewardsDialog } from './useClaimStakingRewardsDialog';

export function ClaimStakingRewardsDialog() {
  const {
    actionButtonState,
    selectedRadioId,
    canClaimAndStake,
    claimableStakingRewards,
    currentAmountStaked,
    estimatedAmountStaked,
    conversionPrice,
    usdcSymbol,
    protocolTokenSymbol,
    disableRadioButtons,
    onSubmit,
    onClose,
    setSelectedRadioId,
  } = useClaimStakingRewardsDialog();

  const buttonStateContent = (() => {
    const isClaimAndStake = selectedRadioId === 'claim_and_stake';

    switch (actionButtonState) {
      case 'loading':
        return isClaimAndStake ? 'Confirm Compound' : 'Confirm Claim';
      case 'success':
        return (
          <ButtonStateContent.Success
            message={isClaimAndStake ? 'Rewards Compounded' : 'Rewards Claimed'}
          />
        );
      case 'disabled':
        return 'Select an Option';
      default:
        return isClaimAndStake ? 'Compound Rewards' : 'Claim Rewards';
    }
  })();

  const expandableContent = (
    <div className="flex flex-col gap-y-4">
      <StakingClaimAndStakeChangeItems
        protocolTokenSymbol={protocolTokenSymbol}
        currentAmountStaked={currentAmountStaked}
        estimatedAmountStaked={estimatedAmountStaked}
      />
      <Divider />
      <div className="flex flex-col gap-y-3.5">
        <StakingRadioGroup.LineItem
          label="Available Rewards"
          value={claimableStakingRewards}
          numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
          valueEndElement={usdcSymbol}
        />
        <StakingRadioGroup.LineItem
          label="Conversion Rate"
          tooltip={{ id: 'stakingEstConversionRate' }}
          valueContent={
            <div className="flex gap-x-1 text-xs">
              <AmountWithSymbol
                formattedSize="1"
                symbol={protocolTokenSymbol}
              />
              ≈
              <AmountWithSymbol
                formattedSize={formatNumber(conversionPrice, {
                  formatSpecifier: CustomNumberFormatSpecifier.NUMBER_AUTO,
                })}
                symbol={usdcSymbol}
              />
            </div>
          }
        />
      </div>
      <div className="flex items-center justify-center gap-x-1 text-xs">
        via
        <Image src={camelotLogo} className="h-4 w-auto" alt="Camelot" />
      </div>
    </div>
  );

  return (
    <BaseAppDialog onClose={onClose}>
      <BaseDialog.Title onClose={onClose}>
        Claim Staking Rewards
      </BaseDialog.Title>
      <BaseDialog.Body className="flex flex-col gap-y-6">
        <StakingRadioGroup.Root
          value={selectedRadioId}
          onValueChange={setSelectedRadioId}
          disabled={disableRadioButtons}
        >
          <StakingRadioGroup.Card
            value="claim_and_stake"
            active={selectedRadioId === 'claim_and_stake'}
            title="Compound Rewards"
            description={`Compound your staking rewards into more staked ${protocolTokenSymbol}. Available for amounts under ${formatNumber(
              5000,
              {
                formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
              },
            )} ${usdcSymbol}.`}
            expandableContent={expandableContent}
            disabled={disableRadioButtons || !canClaimAndStake}
          />
          <StakingRadioGroup.Card
            active={selectedRadioId === 'claim'}
            value="claim"
            title="Claim to Wallet"
            description={`You will receive ${usdcSymbol} in your wallet.`}
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
