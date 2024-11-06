import {
  CustomNumberFormatSpecifier,
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import {
  ButtonHelperInfo,
  CompactInput,
  GradientPill,
  LinkButton,
  Value,
} from '@vertex-protocol/web-ui';
import { ActionSummary } from 'client/components/ActionSummary';
import { UserDisclosureDismissibleCard } from 'client/components/Disclosure/UserDisclosureDismissibleCard';
import { Form } from 'client/components/Form';
import { FractionAmountButtons } from 'client/components/FractionAmountButtons';
import { InputProductSymbolWithIcon } from 'client/components/InputProductSymbolWithIcon';
import { InputSummaryItem } from 'client/components/InputSummaryItem';
import { useShowDialogForProduct } from 'client/hooks/ui/navigation/useShowDialogForProduct';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { EstimatedCurrencyValueItem } from 'client/modules/collateral/components/EstimatedCurrencyValueItem';
import { useStakeVrtxAmountErrorTooltipContent } from 'client/modules/rewards/dialogs/staking/hooks/useStakeVrtxAmountErrorTooltipContent';
import { STAKING_BONUS_FRACTION } from 'client/modules/staking/dialogs/StakeV2VrtxDialog/consts';
import { StakeV2VrtxSubmitButton } from 'client/modules/staking/dialogs/StakeV2VrtxDialog/StakeV2VrtxSubmitButton';
import { StakeV2VrtxSummary } from 'client/modules/staking/dialogs/StakeV2VrtxDialog/StakeV2VrtxSummary';
import { useStakeV2VrtxDialog } from 'client/modules/staking/dialogs/StakeV2VrtxDialog/useStakeV2VrtxDialog';
import { VERTEX_SPECIFIC_LINKS } from 'common/brandMetadata/links/vertexLinks';
import Link from 'next/link';

export function StakeV2VrtxDialog() {
  const {
    form,
    formError,
    vrtxWalletBalance,
    validPercentageAmount,
    validAmount,
    estimatedStakeValueUsd,
    migrationBonusPeriodAmount,
    protocolTokenSymbol,
    protocolTokenIcon,
    protocolTokenProductId,
    buttonState,
    validateAmount,
    onFractionSelected,
    onSubmit,
    onMaxAmountSelected,
  } = useStakeV2VrtxDialog();

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
            title={`${protocolTokenSymbol} in Wallet`}
            description={
              <div>
                Staking is done from your wallet. If you have{' '}
                {protocolTokenSymbol} in your Vertex account, you&apos;ll need
                to{' '}
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
            <CompactInput
              {...form.register('amount', {
                validate: validateAmount,
              })}
              onFocus={() => {
                form.setValue('amountSource', 'absolute');
              }}
              type="number"
              min={0}
              errorTooltipContent={amountErrorTooltipContent}
              startElement={
                <InputProductSymbolWithIcon
                  productImageSrc={protocolTokenIcon}
                  symbol={protocolTokenSymbol}
                />
              }
              endElement={
                <EstimatedCurrencyValueItem
                  estimatedValueUsd={estimatedStakeValueUsd}
                />
              }
            />
            <InputSummaryItem
              label="In Wallet:"
              formatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
              currentValue={vrtxWalletBalance}
              onValueClick={onMaxAmountSelected}
              definitionTooltipId="stakingVrtxInWallet"
            />
          </div>
          <FractionAmountButtons
            onFractionSelected={onFractionSelected}
            selectedFraction={validPercentageAmount}
            className="pt-0.5"
          />
          <div className="flex items-center justify-between">
            <GradientPill className="uppercase">
              Limited time staking bonus
            </GradientPill>
            <Value
              sizeVariant="xs"
              endElement={
                !!migrationBonusPeriodAmount &&
                `${formatNumber(migrationBonusPeriodAmount, {
                  formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
                })} ${protocolTokenSymbol}`
              }
            >
              {formatNumber(STAKING_BONUS_FRACTION, {
                formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
              })}
            </Value>
          </div>
          <ActionSummary.Container>
            <StakeV2VrtxSummary validAmount={validAmount} />
            <StakeV2VrtxSubmitButton state={buttonState} />
          </ActionSummary.Container>
          {buttonState === 'approve_idle' && (
            <ButtonHelperInfo.Content>
              Approval for {protocolTokenSymbol} is required. You will need to
              stake after the approval transaction is confirmed.
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
