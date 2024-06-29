import { joinClassNames, mergeClassNames } from '@vertex-protocol/web-common';
import {
  ErrorTooltip,
  getStateOverlayClassNames,
} from '@vertex-protocol/web-ui';
import { ReactNode, forwardRef } from 'react';
import { Input, InputTextAreaProps } from './Input';

export interface CompactInputProps extends InputTextAreaProps {
  textAreaClassName?: string;
  startElement?: ReactNode;
  endElement?: ReactNode;
  errorTooltipContent?: ReactNode;
  inputContainerClassName?: string;
}

export const CompactInput = forwardRef<HTMLInputElement, CompactInputProps>(
  function CompactInput(
    {
      endElement,
      inputContainerClassName,
      className,
      textAreaClassName,
      startElement,
      placeholder,
      id,
      errorTooltipContent,
      disabled,
      readOnly,
      ...inputProps
    },
    ref,
  ) {
    const disabledStateOverlayClassNames = getStateOverlayClassNames({
      disabled: true,
    });

    return (
      <ErrorTooltip
        contentWrapperClassName={className}
        errorContent={errorTooltipContent}
      >
        <Input.Container
          className={mergeClassNames(
            'flex items-center gap-x-1.5 transition-colors',
            'bg-surface-2 h-10 overflow-hidden rounded px-2',
            disabled && disabledStateOverlayClassNames,
            inputContainerClassName,
          )}
          isError={!!errorTooltipContent}
          readOnly={readOnly}
          disabled={disabled}
        >
          {startElement}
          <Input.TextArea
            className={joinClassNames(
              'flex-1 text-sm',
              !!errorTooltipContent && !disabled
                ? 'text-negative'
                : 'text-text-primary',
              textAreaClassName,
            )}
            placeholder={placeholder ?? '0.00'}
            id={id}
            readOnly={readOnly}
            disabled={disabled}
            ref={ref}
            {...inputProps}
          />
          <span className="text-text-tertiary text-xs empty:hidden">
            {endElement}
          </span>
        </Input.Container>
      </ErrorTooltip>
    );
  },
);
