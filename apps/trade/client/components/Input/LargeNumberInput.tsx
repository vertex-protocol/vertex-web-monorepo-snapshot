import { BigDecimal } from '@vertex-protocol/client';
import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { PresetNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { ReactNode, forwardRef } from 'react';
import {
  BaseInput,
  BaseInputContainerProps,
  BaseInputProps,
  InputLabelProps,
} from './BaseInput';

interface LargeNumberInputProps extends BaseInputProps {
  endElement?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, LargeNumberInputProps>(
  function Component(
    { endElement, className, placeholder, ...inputProps },
    ref,
  ) {
    return (
      <div className="flex items-center gap-x-1.5">
        <BaseInput.Input
          className={joinClassNames(
            'text-text-primary flex-1 text-4xl',
            className,
          )}
          placeholder={placeholder ?? '0.00'}
          ref={ref}
          type="number"
          inputMode="decimal"
          {...inputProps}
        />
        {endElement}
      </div>
    );
  },
);

function Container({ className, ...rest }: BaseInputContainerProps) {
  return (
    <BaseInput.Container
      className={joinClassNames(
        'bg-surface-card rounded-lg px-3 py-4',
        className,
      )}
      {...rest}
    />
  );
}

interface HeaderProps extends WithClassnames<InputLabelProps> {
  endElement?: ReactNode;
}

function Header({ className, endElement, ...rest }: HeaderProps) {
  return (
    <div
      className={joinClassNames('flex items-center justify-between', className)}
    >
      <BaseInput.Label {...rest} />
      {endElement}
    </div>
  );
}

function Footer({
  className,
  startElement,
  endElement,
}: WithClassnames<{
  startElement?: ReactNode;
  endElement?: ReactNode;
}>) {
  return (
    <div className={joinClassNames('flex items-center', className)}>
      {startElement}
      {/* Dynamic spacer */}
      <div className="flex-1" />
      {endElement}
    </div>
  );
}

function EstimatedValueFooter({
  className,
  estimatedValue,
  endElement,
}: WithClassnames<{
  estimatedValue: BigDecimal | undefined;
  endElement?: ReactNode;
}>) {
  return (
    <Footer
      startElement={formatNumber(estimatedValue, {
        formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
      })}
      endElement={endElement}
      className={joinClassNames('text-text-tertiary text-xs', className)}
    />
  );
}

export const LargeNumberInput = {
  Input,
  Container,
  Header,
  Footer,
  EstimatedValueFooter,
};
