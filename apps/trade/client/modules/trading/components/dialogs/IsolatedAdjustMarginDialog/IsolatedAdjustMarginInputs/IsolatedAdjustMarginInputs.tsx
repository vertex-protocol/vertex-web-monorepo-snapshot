import { BigDecimal } from '@vertex-protocol/client';
import { InputValidatorFn, NextImageSrc } from '@vertex-protocol/web-common';
import { CompactInput } from '@vertex-protocol/web-ui';
import { EnableBorrowsSwitch } from 'client/components/EnableBorrowsSwitch';
import { InputProductSymbolWithIcon } from 'client/components/InputProductSymbolWithIcon';
import { EstimatedCurrencyValueItem } from 'client/modules/collateral/components/EstimatedCurrencyValueItem';
import { IsolatedAdjustMarginInputsSummary } from 'client/modules/trading/components/dialogs/IsolatedAdjustMarginDialog/IsolatedAdjustMarginInputs/IsolatedAdjustMarginInputsSummary';
import {
  IsolatedAdjustMarginFormErrorType,
  IsolatedAdjustMarginFormValues,
} from 'client/modules/trading/hooks/useIsolatedAdjustMarginForm/types';
import { useIsolatedAdjustMarginAmountErrorTooltipContent } from 'client/modules/trading/hooks/useIsolatedAdjustMarginForm/useIsolatedAdjustMarginAmountErrorTooltipContent';
import { UseFormReturn } from 'react-hook-form';

interface Props {
  maxWithdrawable: BigDecimal | undefined;
  estimatedAdjustmentValueUsd: BigDecimal | undefined;
  enableBorrows: boolean;
  isAddMargin: boolean;
  primaryQuoteTokenIconSrc: NextImageSrc;
  primaryQuoteTokenSymbol: string;
  form: UseFormReturn<IsolatedAdjustMarginFormValues>;
  formError: IsolatedAdjustMarginFormErrorType | undefined;
  validateAmount: InputValidatorFn<string, IsolatedAdjustMarginFormErrorType>;
  onEnableBorrowsChange(enabled: boolean): void;
  onMaxAmountClicked(): void;
}

export function IsolatedAdjustMarginInputs({
  maxWithdrawable,
  estimatedAdjustmentValueUsd,
  enableBorrows,
  isAddMargin,
  primaryQuoteTokenIconSrc,
  primaryQuoteTokenSymbol,
  form,
  formError,
  validateAmount,
  onEnableBorrowsChange,
  onMaxAmountClicked,
}: Props) {
  const amountErrorTooltipContent =
    useIsolatedAdjustMarginAmountErrorTooltipContent({
      formError,
    });

  return (
    <div className="flex flex-col gap-y-1.5">
      {isAddMargin && (
        <EnableBorrowsSwitch
          className="text-xs"
          enableBorrows={enableBorrows}
          onEnableBorrowsChange={onEnableBorrowsChange}
        />
      )}
      <CompactInput
        {...form.register('amount', {
          validate: validateAmount,
        })}
        type="number"
        min={0}
        errorTooltipContent={amountErrorTooltipContent}
        startElement={
          <InputProductSymbolWithIcon
            productImageSrc={primaryQuoteTokenIconSrc}
            symbol={primaryQuoteTokenSymbol}
          />
        }
        endElement={
          <EstimatedCurrencyValueItem
            estimatedValueUsd={estimatedAdjustmentValueUsd}
          />
        }
      />
      <IsolatedAdjustMarginInputsSummary
        enableBorrows={enableBorrows}
        isAddMargin={isAddMargin}
        maxWithdrawable={maxWithdrawable}
        onMaxAmountClicked={onMaxAmountClicked}
        primaryQuoteSymbol={primaryQuoteTokenSymbol}
      />
    </div>
  );
}
