import { mergeClassNames } from '@vertex-protocol/web-common';
import React, { InputHTMLAttributes, useId } from 'react';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(
    { id, className, type, readOnly, disabled, value, ...rest }: InputProps,
    ref,
  ) {
    const generatedId = useId();
    const inputId = React.useMemo(() => id ?? generatedId, [generatedId, id]);

    return (
      <input
        id={inputId}
        name={inputId}
        className={mergeClassNames(
          'w-full bg-transparent',
          disabled && 'cursor-not-allowed',
          readOnly && 'cursor-default',
          className,
        )}
        type={type ?? 'text'}
        autoComplete="off"
        readOnly={readOnly}
        disabled={disabled}
        step="any"
        ref={ref}
        value={value}
        {...rest}
      />
    );
  },
);
