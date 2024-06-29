import {
  SelectTriggerProps as BaseSelectTriggerProps,
  Root,
  SelectContent,
  SelectContentProps,
  SelectItem,
  SelectItemIndicator,
  SelectItemProps,
  SelectTrigger,
  SelectViewport,
} from '@radix-ui/react-select';
import {
  WithChildren,
  WithClassnames,
  mergeClassNames,
} from '@vertex-protocol/web-common';
import { ReactNode, forwardRef } from 'react';
import { getStateOverlayClassNames } from '../../utils';

export interface SelectTriggerProps
  extends WithClassnames<BaseSelectTriggerProps> {
  endIcon?: ReactNode;
  stateClassNameOverrides?: string;
}

const Trigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  function Trigger(
    {
      children,
      endIcon,
      disabled,
      className,
      stateClassNameOverrides,
      ...rest
    },
    ref,
  ) {
    // Since we want to handle the disabled trigger state differently and without the
    // disabled state overlay, consumers are responsible for the disabled overlay if needed
    // ex. `CollateralInputSelect` has a disabled trigger state, but the disabled overlay
    // is managed by its container.
    const hoverStateOverlayClassNames = getStateOverlayClassNames({
      borderRadiusVariant: 'base',
      stateClassNameOverrides,
    });

    return (
      <SelectTrigger
        className={mergeClassNames(
          'flex items-center gap-x-2',
          'rounded px-2 py-1 text-xs',
          disabled ? 'cursor-not-allowed' : hoverStateOverlayClassNames,
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

const PillTrigger = forwardRef<
  HTMLButtonElement,
  Omit<SelectTriggerProps, 'stateClassNameOverrides'>
>(function PillTrigger({ className, ...rest }, ref) {
  return (
    <Trigger
      className={mergeClassNames(
        'bg-surface-2 rounded-full',
        'text-text-primary text-sm',
        className,
      )}
      stateClassNameOverrides="before:rounded-full"
      ref={ref}
      {...rest}
    />
  );
});

export interface SelectOptionsProps
  extends WithChildren<WithClassnames<SelectContentProps>> {
  header?: ReactNode;
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
  selectionStartIcon?: ReactNode;
  selectionEndIcon?: ReactNode;
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
  const hoverStateOverlayClassNames = getStateOverlayClassNames({
    borderRadiusVariant: 'base',
  });

  return (
    <SelectItem
      className={mergeClassNames(
        'flex items-center justify-between gap-x-1',
        'select-none rounded p-1',
        'text-text-secondary text-xs',
        'data-[state=checked]:text-text-primary',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        hoverStateOverlayClassNames,
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
  PillTrigger,
  Options,
  Option,
};
