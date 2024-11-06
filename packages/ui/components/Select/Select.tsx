import {
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
import {
  DropdownPillTrigger,
  DropdownTrigger,
  DropdownTriggerProps,
} from '../DropdownTrigger';
import { ScrollShadowsContainer } from '../ScrollShadowsContainer';
import { Icons } from '../Icons';

export interface SelectTriggerProps
  extends Omit<DropdownTriggerProps, 'trigger'> {}

const Trigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  function Trigger(props, ref) {
    return <DropdownTrigger {...props} trigger={SelectTrigger} ref={ref} />;
  },
);

const PillTrigger = forwardRef<
  HTMLButtonElement,
  Omit<SelectTriggerProps, 'stateClassNameOverrides'>
>(function PillTrigger(props, ref) {
  return <DropdownPillTrigger {...props} trigger={Trigger} ref={ref} />;
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
      <ScrollShadowsContainer
        asChild
        ref={(ref) => {
          // Hack: https://github.com/radix-ui/primitives/issues/1658#issuecomment-1695422917
          ref?.addEventListener('touchend', (e) => e.preventDefault());
        }}
      >
        <SelectViewport className={viewportClassName}>
          {children}
        </SelectViewport>
      </ScrollShadowsContainer>
    </SelectContent>
  );
});

export interface SelectOptionProps extends WithClassnames<SelectItemProps> {
  selectionStartIcon?: ReactNode;
  selectionEndIcon?: ReactNode;
  withSelectedCheckmark?: boolean;
}

const Option = forwardRef<HTMLDivElement, SelectOptionProps>(function Option(
  {
    children,
    value,
    disabled,
    className,
    selectionStartIcon,
    selectionEndIcon,
    withSelectedCheckmark = true,
    ...rest
  },
  ref,
) {
  const hoverStateOverlayClassNames = getStateOverlayClassNames({
    borderRadiusVariant: 'base',
    // Applies overlay class when item is highlighted via keyboard nav.
    stateClassNameOverrides: 'data-[highlighted]:before:bg-overlay-hover',
  });

  const endIndicator = (() => {
    if (withSelectedCheckmark) {
      return <Icons.Check />;
    }
    return selectionEndIcon;
  })();

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
      {endIndicator && (
        <SelectItemIndicator>{endIndicator}</SelectItemIndicator>
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
