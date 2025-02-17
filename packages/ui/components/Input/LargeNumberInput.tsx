'use client';

import {
  joinClassNames,
  WithClassnames,
  WithRef,
} from '@vertex-protocol/web-common';
import { ReactNode } from 'react';
import { Label, LabelProps } from '../Label';
import { Input, InputContainerProps, InputTextAreaProps } from './Input';

interface LargeNumberInputProps extends InputTextAreaProps {
  endElement?: ReactNode;
}

function TextArea({
  endElement,
  className,
  placeholder,
  ...inputProps
}: WithRef<LargeNumberInputProps, HTMLInputElement>) {
  return (
    <div className="flex items-center gap-x-1.5">
      <Input.TextArea
        className={joinClassNames(
          'text-text-primary flex-1 text-4xl',
          className,
        )}
        placeholder={placeholder ?? '0.00'}
        type="number"
        inputMode="decimal"
        {...inputProps}
      />
      {endElement}
    </div>
  );
}

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

export const LargeNumberInput = {
  TextArea,
  Container,
  Header,
  Footer,
};
