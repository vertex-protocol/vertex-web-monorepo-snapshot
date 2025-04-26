import {
  PresetNumberFormatSpecifier,
  VLP_TOKEN_INFO,
} from '@vertex-protocol/react-client';
import { CompactInput } from '@vertex-protocol/web-ui';
import { Form } from 'client/components/Form';
import { FractionAmountButtons } from 'client/components/FractionAmountButtons';
import { InputProductSymbolWithIcon } from 'client/components/InputProductSymbolWithIcon';
import { InputSummaryItem } from 'client/components/InputSummaryItem';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useRedeemVlpLiquidityAmountErrorTooltipContent } from 'client/modules/vlp/redeem/hooks/useRedeemVlpLiquidityAmountErrorTooltipContent';
import { useRedeemVlpLiquidityDialog } from 'client/modules/vlp/redeem/hooks/useRedeemVlpLiquidityDialog';
import { RedeemVlpLiquiditySubmitButton } from 'client/modules/vlp/redeem/RedeemVlpLiquiditySubmitButton';
import Image from 'next/image';

export function RedeemVlpLiquidityDialog() {
  const { hide } = useDialog();

  const {
    form,
    formError,
    primaryQuoteFeeAmount,
    estimatedPrimaryQuoteAmount,
    validPercentageAmount,
    buttonState,
    validateAmount,
    onFractionSelected,
    onSubmit,
    primaryQuoteToken,
    vlpBalanceAmount,
  } = useRedeemVlpLiquidityDialog();
  const amountErrorTooltipContent =
    useRedeemVlpLiquidityAmountErrorTooltipContent({
      formError,
    });

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title onClose={hide}>
        Redeem {VLP_TOKEN_INFO.symbol} Liquidity
      </BaseAppDialog.Title>
      <BaseAppDialog.Body asChild>
        <Form onSubmit={onSubmit}>
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
                  productImageSrc={VLP_TOKEN_INFO.icon.asset}
                  symbol={VLP_TOKEN_INFO.symbol}
                />
              }
            />
            <div className="flex flex-col gap-y-0.5">
              <InputSummaryItem
                label="Available:"
                formatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
                currentValue={vlpBalanceAmount}
                onValueClick={() => onFractionSelected(1)}
              />
              <InputSummaryItem
                label="Fee:"
                formatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
                currentValue={primaryQuoteFeeAmount}
                valueEndElement={primaryQuoteToken.symbol}
                definitionTooltipId="vlpRedeemFee"
              />
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
            value={estimatedPrimaryQuoteAmount}
            numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
            valueClassName="items-center"
            valueEndElement={
              <Image
                src={primaryQuoteToken.icon.asset}
                alt=""
                className="h-5 w-auto"
              />
            }
          />
          <RedeemVlpLiquiditySubmitButton state={buttonState} />
        </Form>
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}
