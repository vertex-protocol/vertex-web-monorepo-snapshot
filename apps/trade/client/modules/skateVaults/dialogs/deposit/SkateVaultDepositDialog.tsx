import {
  CustomNumberFormatSpecifier,
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { CompactInput } from '@vertex-protocol/web-ui';
import { Form } from 'client/components/Form';
import { FractionAmountButtons } from 'client/components/FractionAmountButtons';
import { InputProductSymbolWithIcon } from 'client/components/InputProductSymbolWithIcon';
import { InputSummaryItem } from 'client/components/InputSummaryItem';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { EstimatedCurrencyValueItem } from 'client/modules/collateral/components/EstimatedCurrencyValueItem';
import { VaultHeader } from 'client/modules/skateVaults/components/VaultHeader';
import { useSkateVaultDepositDialog } from 'client/modules/skateVaults/dialogs/deposit/hooks/useSkateVaultDepositDialog';
import { SkateDepositSubmitButton } from 'client/modules/skateVaults/dialogs/deposit/SkateDepositSubmitButton';
import { SkateVaultWithdrawalDisclosureCard } from 'client/modules/skateVaults/dialogs/deposit/SkateVaultWithdrawalDisclosureCard';
import { useVaultFormAmountErrorTooltipContent } from 'client/modules/skateVaults/dialogs/hooks/useVaultFormAmountErrorTooltipContent';
import { SkateVaultDialogParams } from 'client/modules/skateVaults/dialogs/types';
import { RangeSlider } from 'client/modules/trading/components/RangeSlider';
import { IMAGES } from 'common/brandMetadata/images';
import { LINKS } from 'common/brandMetadata/links/links';

export function SkateVaultDepositDialog({
  vaultAddress,
  vaultName,
}: SkateVaultDialogParams) {
  const { hide } = useDialog();
  const {
    form: { register, setValue },
    decimalAdjustedWalletBalance,
    buttonState,
    percentageAmountInput,
    validPercentageAmount,
    amountInputError,
    estimatedInputValueUsd,
    estimatedSharesReceived,
    validateAmount,
    onSubmit,
    onFractionSelected,
    onMaxAmountSelected,
    primaryQuoteToken,
  } = useSkateVaultDepositDialog({ vaultAddress });

  const amountErrorTooltipContent = useVaultFormAmountErrorTooltipContent({
    formError: amountInputError,
  });

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title onClose={hide}>Vault Deposit</BaseAppDialog.Title>
      <BaseAppDialog.Body asChild>
        <Form onSubmit={onSubmit}>
          <SkateVaultWithdrawalDisclosureCard />
          <VaultHeader
            vaultName={vaultName}
            partnerImageSrc={IMAGES.partners.skate}
            partnerHref={LINKS.skateFi}
          />
          <div className="flex flex-col gap-y-1.5">
            <CompactInput
              {...register('amount', {
                validate: validateAmount,
              })}
              errorTooltipContent={amountErrorTooltipContent}
              startElement={
                <InputProductSymbolWithIcon
                  productImageSrc={primaryQuoteToken.icon.asset}
                  symbol={primaryQuoteToken.symbol}
                />
              }
              endElement={
                <EstimatedCurrencyValueItem
                  estimatedValueUsd={estimatedInputValueUsd}
                />
              }
              onFocus={() => {
                setValue('amountSource', 'absolute');
              }}
            />
            <InputSummaryItem
              label="In Wallet:"
              currentValue={decimalAdjustedWalletBalance}
              onValueClick={onMaxAmountSelected}
              formatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
            />
            <div className="flex flex-col gap-y-3">
              <RangeSlider
                value={percentageAmountInput}
                renderValue={(value) =>
                  formatNumber(value, {
                    formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_INT,
                  })
                }
                min={0}
                max={1}
                step={0.05}
                onValueChange={onFractionSelected}
              />
              <FractionAmountButtons
                onFractionSelected={onFractionSelected}
                selectedFraction={validPercentageAmount}
              />
            </div>
          </div>
          <ValueWithLabel.Horizontal
            fitWidth
            sizeVariant="xs"
            label="Receive:"
            value={estimatedSharesReceived}
            numberFormatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
            valueEndElement="Shares"
          />
          <SkateDepositSubmitButton state={buttonState} />
        </Form>
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}
