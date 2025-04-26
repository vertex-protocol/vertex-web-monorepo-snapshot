import {
  joinClassNames,
  mergeClassNames,
  WithRef,
} from '@vertex-protocol/web-common';
import { ReactNode } from 'react';
import { getStateOverlayClassNames } from '../../utils';
import { ErrorTooltip } from '../Tooltip';
import { Input, InputTextAreaProps } from './Input';

export interface CompactInputProps
  extends WithRef<InputTextAreaProps, HTMLInputElement> {
  textAreaClassName?: string;
  startElement?: ReactNode;
  endElement?: ReactNode;
  errorTooltipContent?: ReactNode;
  inputContainerClassName?: string;
}

export function CompactInput({
  endElement,
  inputContainerClassName,
  className,
  textAreaClassName,
  startElement,
  placeholder,
  errorTooltipContent,
  disabled,
  readOnly,
  ...inputProps
}: CompactInputProps) {
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
          'bg-surface-2 h-10 overflow-hidden rounded-sm px-2',
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
          readOnly={readOnly}
          disabled={disabled}
          {...inputProps}
        />
        <span className="text-text-tertiary text-xs empty:hidden">
          {endElement}
        </span>
      </Input.Container>
    </ErrorTooltip>
  );
}
