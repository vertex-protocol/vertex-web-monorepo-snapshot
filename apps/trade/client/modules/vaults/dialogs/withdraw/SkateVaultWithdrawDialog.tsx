import {
  CustomNumberFormatSpecifier,
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { CompactInput } from '@vertex-protocol/web-ui';
import { Form } from 'client/components/Form';
import { FractionAmountButtons } from 'client/components/FractionAmountButtons';
import { InputSummaryItem } from 'client/components/InputSummaryItem';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { RangeSlider } from 'client/modules/trading/components/RangeSlider';
import { VaultHeader } from 'client/modules/vaults/components/VaultHeader';
import { useVaultFormAmountErrorTooltipContent } from 'client/modules/vaults/dialogs/hooks/useVaultFormAmountErrorTooltipContent';
import { SkateVaultDialogParams } from 'client/modules/vaults/dialogs/types';
import { useSkateVaultWithdrawDialog } from 'client/modules/vaults/dialogs/withdraw/hooks/useSkateVaultWithdrawDialog';
import { SkateWithdrawSubmitButton } from 'client/modules/vaults/dialogs/withdraw/SkateWithdrawSubmitButton';
import { IMAGES } from 'common/brandMetadata/images';
import { LINKS } from 'common/brandMetadata/links/links';

export function SkateVaultWithdrawDialog({
  vaultAddress,
  vaultName,
}: SkateVaultDialogParams) {
  const { hide } = useDialog();
  const {
    form: { register, setValue },
    amountInputError,
    buttonState,
    validPercentageAmount,
    percentageAmountInput,
    decimalAdjustedUserShares,
    decimalAdjustedEstimatedQuoteReceived,
    primaryQuoteToken,
    onFractionSelected,
    onMaxAmountSelected,
    onSubmit,
    validateAmount,
  } = useSkateVaultWithdrawDialog({ vaultAddress });

  const amountErrorTooltipContent = useVaultFormAmountErrorTooltipContent({
    formError: amountInputError,
  });

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title onClose={hide}>Vault Withdraw</BaseAppDialog.Title>
      <BaseAppDialog.Body asChild>
        <Form onSubmit={onSubmit}>
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
              endElement="Shares"
              onFocus={() => {
                setValue('amountSource', 'absolute');
              }}
            />
            <InputSummaryItem
              label="Position:"
              currentValue={decimalAdjustedUserShares}
              onValueClick={onMaxAmountSelected}
              formatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
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
            value={decimalAdjustedEstimatedQuoteReceived}
            numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
            valueEndElement={primaryQuoteToken.symbol}
          />
          <SkateWithdrawSubmitButton state={buttonState} />
        </Form>
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}
