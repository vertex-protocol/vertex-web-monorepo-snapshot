import {
  PresetNumberFormatSpecifier,
  VLP_TOKEN_INFO,
} from '@vertex-protocol/react-client';
import { CompactInput } from '@vertex-protocol/web-ui';
import { EnableBorrowsSwitch } from 'client/components/EnableBorrowsSwitch';
import { Form } from 'client/components/Form';
import { FractionAmountButtons } from 'client/components/FractionAmountButtons';
import { InputProductSymbolWithIcon } from 'client/components/InputProductSymbolWithIcon';
import { InputSummaryItem } from 'client/components/InputSummaryItem';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { SEQUENCER_FEE_AMOUNT_USDC } from 'client/consts/sequencerFee';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useProvideVlpLiquidityAmountErrorTooltipContent } from 'client/modules/vlp/provide/hooks/useProvideVlpLiquidityAmountErrorTooltipContent';
import { useProvideVlpLiquidityDialog } from 'client/modules/vlp/provide/hooks/useProvideVlpLiquidityDialog';
import { ProvideVlpLiquiditySubmitButton } from 'client/modules/vlp/provide/ProvideVlpLiquiditySubmitButton';
import Image from 'next/image';

export function ProvideVlpLiquidityDialog() {
  const { hide } = useDialog();

  const {
    form,
    formError,
    estimatedVlpAmount,
    validPercentageAmount,
    buttonState,
    validateAmount,
    onFractionSelected,
    onEnableBorrowsChange,
    onSubmit,
    primaryQuoteToken,
    enableBorrows,
    decimalAdjustedMaxQuoteAmountWithFee,
  } = useProvideVlpLiquidityDialog();
  const amountErrorTooltipContent =
    useProvideVlpLiquidityAmountErrorTooltipContent({
      formError,
    });

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title onClose={hide}>
        Provide {VLP_TOKEN_INFO.symbol} Liquidity
      </BaseAppDialog.Title>
      <BaseAppDialog.Body asChild>
        <Form onSubmit={onSubmit}>
          <div className="flex flex-col gap-y-3.5">
            <EnableBorrowsSwitch
              enableBorrows={enableBorrows}
              onEnableBorrowsChange={onEnableBorrowsChange}
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
                    productImageSrc={primaryQuoteToken.icon.asset}
                    symbol={primaryQuoteToken.symbol}
                  />
                }
              />
              <div className="flex flex-col gap-y-0.5">
                <InputSummaryItem
                  label="Available:"
                  formatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
                  currentValue={decimalAdjustedMaxQuoteAmountWithFee}
                  onValueClick={() => onFractionSelected(1)}
                />
                <InputSummaryItem
                  label="Gas Fee:"
                  formatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
                  currentValue={SEQUENCER_FEE_AMOUNT_USDC}
                  valueEndElement={primaryQuoteToken.symbol}
                  definitionTooltipId="gasFee"
                />
              </div>
            </div>
          </div>
          <FractionAmountButtons
            onFractionSelected={onFractionSelected}
            selectedFraction={validPercentageAmount}
          />
          <ValueWithLabel.Horizontal
            fitWidth
            label="Receive:"
            sizeVariant="xs"
            value={estimatedVlpAmount}
            numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
            valueClassName="items-center"
            valueEndElement={
              <Image
                src={VLP_TOKEN_INFO.icon.asset}
                alt=""
                className="h-5 w-auto"
              />
            }
          />
          <ProvideVlpLiquiditySubmitButton state={buttonState} />
        </Form>
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}
