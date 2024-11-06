import { VOVRTX_INFO, VRTX_TOKEN_INFO } from '@vertex-protocol/metadata';
import { CustomNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { ButtonHelperInfo, LinkButton } from '@vertex-protocol/web-ui';
import { ActionSummary } from 'client/components/ActionSummary';
import { UserDisclosureDismissibleCard } from 'client/components/Disclosure/UserDisclosureDismissibleCard';
import { Form } from 'client/components/Form';
import { FractionAmountButtons } from 'client/components/FractionAmountButtons';
import { useShowDialogForProduct } from 'client/hooks/ui/navigation/useShowDialogForProduct';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { StakingDialogInput } from 'client/modules/rewards/dialogs/staking/components/StakingDialogInput';
import { useStakeVrtxAmountErrorTooltipContent } from 'client/modules/rewards/dialogs/staking/hooks/useStakeVrtxAmountErrorTooltipContent';
import { StakeVrtxSubmitButton } from 'client/modules/rewards/dialogs/staking/StakeVrtxDialog/StakeVrtxSubmitButton';
import { StakeVrtxSummary } from 'client/modules/rewards/dialogs/staking/StakeVrtxDialog/StakeVrtxSummary';
import { useStakeVrtxForm } from 'client/modules/rewards/dialogs/staking/StakeVrtxDialog/useStakeVrtxForm';
import { VERTEX_SPECIFIC_LINKS } from 'common/brandMetadata/links/vertexLinks';
import Link from 'next/link';
import { InputSummaryItem } from 'client/components/InputSummaryItem';

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
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title
        onClose={hide}
        endElement={
          <LinkButton
            as={Link}
            colorVariant="primary"
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
      </BaseAppDialog.Title>
      <BaseAppDialog.Body asChild>
        <Form onSubmit={onSubmit}>
          <UserDisclosureDismissibleCard
            disclosureKey="stake_vrtx"
            title={`${VRTX_TOKEN_INFO.symbol} in Wallet`}
            description={
              <div>
                Staking is done from your wallet. If you have{' '}
                {VRTX_TOKEN_INFO.symbol} in your Vertex account, you&apos;ll
                need to{' '}
                <LinkButton
                  colorVariant="primary"
                  onClick={() =>
                    showDialogForProduct({
                      dialogType: 'withdraw',
                      productId: protocolTokenProductId,
                      navBehavior: 'push',
                    })
                  }
                >
                  withdraw
                </LinkButton>{' '}
                before staking.
              </div>
            }
          />
          <div className="flex flex-col gap-y-1.5">
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
            <InputSummaryItem
              label="In Wallet:"
              currentValue={vrtxWalletBalance}
              definitionTooltipId="stakingVrtxInWallet"
              formatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
              onValueClick={onMaxAmountSelected}
            />
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
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}
