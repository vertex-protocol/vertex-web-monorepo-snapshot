import { VERTEX_SPECIFIC_LINKS } from '@vertex-protocol/web-common';
import { ButtonHelperInfo } from '@vertex-protocol/web-ui';
import { ActionSummary } from 'client/components/ActionSummary';
import { BaseDialog } from 'client/components/BaseDialog/BaseDialog';
import { UserDisclosureDismissibleCard } from 'client/components/Disclosure/UserDisclosureDismissibleCard';
import { Form } from 'client/components/Form';
import { FractionAmountButtons } from 'client/components/FractionAmountButtons';
import { InputSummary } from 'client/components/InputSummary';
import { LinkButton } from 'client/components/LinkButton';
import { useShowDialogForProduct } from 'client/hooks/ui/navigation/useShowDialogForProduct';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { CustomNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import {
  VOVRTX_INFO,
  VRTX_TOKEN_INFO,
} from 'common/productMetadata/vertexTokenInfo';
import Link from 'next/link';
import { StakingDialogInput } from '../components/StakingDialogInput';
import { StakeVrtxSubmitButton } from './StakeVrtxSubmitButton';
import { StakeVrtxSummary } from './StakeVrtxSummary';
import { useStakeVrtxAmountErrorTooltipContent } from './useStakeVrtxAmountErrorTooltipContent';
import { useStakeVrtxForm } from './useStakeVrtxForm';

export function StakeVrtxDialog() {
  const {
    form,
    formError,
    validPercentageAmount,
    validAmount,
    estimatedStakeValueUsd,
    vrtxWalletBalance,
    protocolTokenProductId,
    buttonState,
    validateAmount,
    onFractionSelected,
    onSubmit,
    onMaxAmountSelected,
  } = useStakeVrtxForm();

  const amountErrorTooltipContent = useStakeVrtxAmountErrorTooltipContent({
    formError,
  });

  const { hide } = useDialog();
  const showDialogForProduct = useShowDialogForProduct();

  return (
    <BaseAppDialog onClose={hide}>
      <BaseDialog.Title
        onClose={hide}
        endElement={
          <LinkButton
            as={Link}
            color="white"
            className="text-xs"
            href={VERTEX_SPECIFIC_LINKS.stakeVrtxDocs}
            external
            withExternalIcon
          >
            Staking Guide
          </LinkButton>
        }
      >
        Stake
      </BaseDialog.Title>
      <BaseDialog.Body>
        <Form onSubmit={onSubmit} className="flex flex-col gap-y-4">
          <UserDisclosureDismissibleCard
            disclosureKey="stake_vrtx"
            title={`${VRTX_TOKEN_INFO.symbol} in Wallet`}
            description={
              <div>
                Staking is done from your wallet. If you have{' '}
                {VRTX_TOKEN_INFO.symbol} in your Vertex account, you&apos;ll
                need to{' '}
                <LinkButton
                  color="accent"
                  onClick={() =>
                    showDialogForProduct({
                      dialogType: 'withdraw',
                      productId: protocolTokenProductId,
                    })
                  }
                >
                  withdraw
                </LinkButton>{' '}
                before staking.
              </div>
            }
          />
          <div className="flex flex-col">
            <StakingDialogInput
              {...form.register('amount', {
                validate: validateAmount,
              })}
              onFocus={() => {
                form.setValue('amountSource', 'absolute');
              }}
              estimatedStakeValueUsd={estimatedStakeValueUsd}
              error={amountErrorTooltipContent}
            />
            <InputSummary.Container>
              <InputSummary.Item
                label="In Wallet:"
                currentValue={vrtxWalletBalance}
                definitionTooltipId="stakingVrtxInWallet"
                formatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
                onValueClick={onMaxAmountSelected}
              />
            </InputSummary.Container>
          </div>
          <FractionAmountButtons
            onFractionSelected={onFractionSelected}
            selectedFraction={validPercentageAmount}
            className="pt-0.5"
          />
          <ActionSummary.Container>
            <StakeVrtxSummary validAmount={validAmount} />
            <StakeVrtxSubmitButton state={buttonState} />
          </ActionSummary.Container>
          {buttonState === 'approve_idle' && (
            <ButtonHelperInfo.Content>
              Approval for {VRTX_TOKEN_INFO.symbol} is required. You will need
              to stake after the approval transaction is confirmed.
            </ButtonHelperInfo.Content>
          )}
          {buttonState === 'idle' && (
            <ButtonHelperInfo.Content>
              Newly staked {VRTX_TOKEN_INFO.symbol} starts at a multiplier of
              1x, therefore it decreases your average {VOVRTX_INFO.symbol}{' '}
              multiplier but increases your share of rewards.
            </ButtonHelperInfo.Content>
          )}
          {buttonState === 'approve_success' && (
            <ButtonHelperInfo.Content>
              You can now stake. The modal should automatically update.
            </ButtonHelperInfo.Content>
          )}
        </Form>
      </BaseDialog.Body>
    </BaseAppDialog>
  );
}
