import { joinClassNames } from '@vertex-protocol/web-common';
import { ErrorTooltip } from '@vertex-protocol/web-ui';
import { forwardRef, ReactNode } from 'react';
import { BaseInput, BaseInputProps } from './BaseInput';

export interface CompactInputProps extends BaseInputProps {
  inputClassName?: string;
  startElement?: ReactNode;
  endElement?: ReactNode;
  error?: ReactNode;
  inputContainerClassName?: string;
}

export const CompactInput = forwardRef<HTMLInputElement, CompactInputProps>(
  function Component(
    {
      endElement,
      inputContainerClassName,
      className,
      inputClassName,
      startElement,
      placeholder,
      id,
      error,
      disabled,
      ...inputProps
    },
    ref,
  ) {
    return (
      <ErrorTooltip contentWrapperClassName={className} errorContent={error}>
        <BaseInput.Container
          className={joinClassNames(
            'bg-surface-2 rounded',
            'px-3 py-1.5',
            'flex items-center gap-x-1.5',
            inputContainerClassName,
          )}
          isError={!!error}
          disabled={disabled}
        >
          {startElement}
          <BaseInput.Input
            ref={ref}
            className={joinClassNames(
              'flex-1 text-sm',
              !!error ? 'text-negative' : 'text-text-primary',
              inputClassName,
            )}
            placeholder={placeholder ?? '0.00'}
            id={id}
            disabled={disabled}
            {...inputProps}
          />
          {endElement}
        </BaseInput.Container>
      </ErrorTooltip>
    );
  },
);
