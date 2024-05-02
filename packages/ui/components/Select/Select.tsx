import {
  Root,
  SelectContent,
  SelectContentProps,
  SelectItem,
  SelectItemIndicator,
  SelectItemProps,
  SelectTrigger,
  SelectTriggerProps,
  SelectViewport,
} from '@radix-ui/react-select';
import {
  WithChildren,
  WithClassnames,
  mergeClassNames,
} from '@vertex-protocol/web-common';
import { forwardRef } from 'react';

export interface BaseSelectTriggerProps
  extends WithClassnames<SelectTriggerProps> {
  endIcon?: React.ReactNode;
}

const Trigger = forwardRef<HTMLButtonElement, BaseSelectTriggerProps>(
  function Trigger({ children, endIcon, disabled, className, ...rest }, ref) {
    return (
      <SelectTrigger
        className={mergeClassNames(
          'flex items-center gap-x-2 rounded text-xs',
          'bg-surface-1 transition',
          'px-2 py-1',
          disabled ? 'cursor-not-allowed opacity-80' : 'hover:bg-surface-2',
          className,
        )}
        disabled={disabled}
        ref={ref}
        {...rest}
      >
        {children}
        {endIcon}
      </SelectTrigger>
    );
  },
);

export interface SelectOptionsProps
  extends WithChildren<WithClassnames<SelectContentProps>> {
  header?: React.ReactNode;
  viewportClassName?: string;
}

const Options = forwardRef<HTMLDivElement, SelectOptionsProps>(function Options(
  {
    children,
    header,
    className,
    position = 'popper',
    viewportClassName,
    ...rest
  },
  ref,
) {
  return (
    <SelectContent
      className={mergeClassNames(
        'bg-surface-2 z-10 rounded p-1',
        'border-stroke shadow-elevation border',
        className,
      )}
      position={position}
      sideOffset={5}
      ref={ref}
      {...rest}
    >
      {header}
      <SelectViewport
        className={viewportClassName}
        ref={(ref) => {
          // Hack: https://github.com/radix-ui/primitives/issues/1658#issuecomment-1695422917
          ref?.addEventListener('touchend', (e) => e.preventDefault());
        }}
      >
        {children}
      </SelectViewport>
    </SelectContent>
  );
});

export interface SelectOptionProps extends WithClassnames<SelectItemProps> {
  selectionStartIcon?: React.ReactNode;
  selectionEndIcon?: React.ReactNode;
}

const Option = forwardRef<HTMLDivElement, SelectOptionProps>(function Option(
  {
    children,
    value,
    disabled,
    className,
    selectionStartIcon,
    selectionEndIcon,
    ...rest
  },
  ref,
) {
  return (
    <SelectItem
      className={mergeClassNames(
        'flex select-none items-center justify-between text-xs',
        'text-text-tertiary rounded p-1 transition',
        disabled
          ? 'cursor-not-allowed'
          : 'text-text-tertiary hover:bg-overlay-hover/5 data-[state=checked]:text-text-primary cursor-pointer',
        className,
      )}
      ref={ref}
      value={value}
      {...rest}
    >
      {selectionStartIcon && (
        <SelectItemIndicator>{selectionStartIcon}</SelectItemIndicator>
      )}
      {children}
      {selectionEndIcon && (
        <SelectItemIndicator>{selectionEndIcon}</SelectItemIndicator>
      )}
    </SelectItem>
  );
});

export const Select = {
  Root,
  Trigger,
  Options,
  Option,
};
