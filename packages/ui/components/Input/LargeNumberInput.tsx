import { BigDecimal } from '@vertex-protocol/client';
import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { forwardRef, ReactNode } from 'react';
import { Label, LabelProps } from '../Label';
import { Input, InputContainerProps, InputTextAreaProps } from './Input';

interface LargeNumberInputProps extends InputTextAreaProps {
  endElement?: ReactNode;
}

const TextArea = forwardRef<HTMLInputElement, LargeNumberInputProps>(
  function Component(
    { endElement, className, placeholder, ...inputProps },
    ref,
  ) {
    return (
      <div className="flex items-center gap-x-1.5">
        <Input.TextArea
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

function Container({ className, ...rest }: InputContainerProps) {
  return (
    <Input.Container
      className={joinClassNames(
        'bg-surface-card rounded-lg px-3 py-4',
        className,
      )}
      {...rest}
    />
  );
}

interface HeaderProps extends WithClassnames<LabelProps> {
  endElement?: ReactNode;
}

function Header({ className, endElement, ...rest }: HeaderProps) {
  return (
    <div
      className={joinClassNames('flex items-center justify-between', className)}
    >
      <Label {...rest} />
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
  TextArea,
  Container,
  Header,
  Footer,
  EstimatedValueFooter,
};
