import { BigDecimal } from '@vertex-protocol/client';
import {
  WithChildren,
  WithClassnames,
  joinClassNames,
} from '@vertex-protocol/web-common';
import { ErrorTooltip, Select } from '@vertex-protocol/web-ui';
import { UpDownChevronIcon } from 'client/components/Icons/UpDownChevronIcon';
import {
  Input as BaseInput,
  InputProps as BaseInputProps,
} from 'client/components/Input/Input';
import { EstimatedCurrencyValueItem } from 'client/modules/collateral/components/EstimatedCurrencyValueItem';
import { ReactNode, forwardRef } from 'react';

/**
 * This is largely duplicated from CollateralSelectInput. When we introduce "large" inputs, we should address
 * this tech debt by having an interface that works across all use-cases
 */

interface ContainerProps extends WithClassnames, WithChildren {
  error?: ReactNode;
}

function Container({ children, error, className }: ContainerProps) {
  return (
    <ErrorTooltip
      errorContent={error}
      contentWrapperClassName={joinClassNames(
        'h-10 relative',
        'border border-stroke rounded',
        'flex',
        !!error ? 'border-negative' : 'focus-within:border-accent',
        className,
      )}
    >
      {children}
    </ErrorTooltip>
  );
}

interface InputProps extends BaseInputProps {
  estimatedValueUsd: BigDecimal | undefined;
  isError?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, isError, estimatedValueUsd, ...rest }: InputProps,
  ref,
) {
  return (
    <div className="border-stroke flex flex-1 items-center border-l px-2 text-sm font-medium">
      <BaseInput
        ref={ref}
        className={joinClassNames(
          'placeholder:text-disabled flex-1 placeholder:font-medium',
          isError ? 'text-negative' : 'text-text-primary',
          className,
        )}
        placeholder="0.00"
        type="number"
        {...rest}
      />
      <EstimatedCurrencyValueItem
        className="mr-2 text-xs"
        estimatedValueUsd={estimatedValueUsd}
      />
    </div>
  );
});

interface SelectTriggerProps {
  open: boolean;
  selectedToken:
    | {
        iconUrl: string | undefined;
        symbol: string;
      }
    | undefined;
  disabled?: boolean;
}

function SelectTrigger({ open, selectedToken, disabled }: SelectTriggerProps) {
  const content = selectedToken ? (
    <div className="flex items-center gap-x-2">
      {selectedToken.iconUrl && (
        // Loading remote images, so can't use Image component
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={selectedToken.iconUrl}
          alt={selectedToken.symbol}
          className="h-5 w-5"
        />
      )}
      <span className="text-text-primary text-sm font-medium">
        {selectedToken.symbol}
      </span>
    </div>
  ) : (
    'Select'
  );

  return (
    <Select.Trigger
      endIcon={<UpDownChevronIcon open={open} size={16} />}
      className="w-32 min-w-fit justify-between border-none bg-transparent hover:bg-transparent"
      disabled={disabled}
    >
      {content}
    </Select.Trigger>
  );
}

interface SelectOptionsProps extends WithChildren {
  header?: ReactNode;
}

function SelectOptions({ header, children }: SelectOptionsProps) {
  return (
    <Select.Options
      // Gap for search bar, same width as collateral dropdown
      className="bg-background flex max-h-72 min-w-[288px] flex-col gap-y-2 p-2"
      header={header}
    >
      {children}
    </Select.Options>
  );
}

interface SelectOptionProps {
  symbol: string;
  iconUrl: string | undefined;
  optionValue: string;
  isSelected: boolean;
}

function SelectOption({
  isSelected,
  symbol,
  iconUrl,
  optionValue,
}: SelectOptionProps) {
  return (
    <Select.Option value={optionValue} className="p-2">
      <div className="flex items-center justify-start gap-x-2">
        {/*Loading remote images, so can't use Image component*/}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {iconUrl && <img src={iconUrl} alt={symbol} className="h-5 w-5" />}
        <span className="text-text-secondary text-sm">{symbol}</span>
      </div>
    </Select.Option>
  );
}

export const BridgeTokenInput = {
  Container,
  Input,
  SelectTrigger,
  SelectOptions,
  SelectOption,
};
