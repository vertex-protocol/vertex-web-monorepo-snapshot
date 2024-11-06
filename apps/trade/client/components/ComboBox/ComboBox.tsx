import {
  PopoverProps,
  Popover,
  PopoverTrigger,
  PopoverContentProps,
  PopoverContent,
} from '@radix-ui/react-popover';
import {
  WithChildren,
  WithClassnames,
  mergeClassNames,
} from '@vertex-protocol/web-common';
import {
  DropdownTriggerProps,
  DropdownTrigger,
  DropdownPillTrigger,
  SearchBar,
  ScrollShadowsContainer,
  getStateOverlayClassNames,
} from '@vertex-protocol/web-ui';
import { Command } from 'cmdk';
import { forwardRef, HTMLProps, ReactNode } from 'react';

export interface ComboBoxRootProps extends PopoverProps {}

function Root({ onOpenChange, open, children }: ComboBoxRootProps) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      {children}
    </Popover>
  );
}

export interface ComboBoxTriggerProps
  extends Omit<DropdownTriggerProps, 'trigger'> {}

const Trigger = forwardRef<HTMLButtonElement, ComboBoxTriggerProps>(
  function Trigger(props, ref) {
    return <DropdownTrigger {...props} trigger={PopoverTrigger} ref={ref} />;
  },
);

const PillTrigger = forwardRef<
  HTMLButtonElement,
  Omit<ComboBoxTriggerProps, 'stateClassNameOverrides'>
>(function PillTrigger(props, ref) {
  return <DropdownPillTrigger {...props} trigger={Trigger} ref={ref} />;
});

export interface ComboBoxOptionsProps
  extends WithChildren<WithClassnames<PopoverContentProps>> {
  query: string;
  setQuery: (q: string) => void;
  searchBarPlaceholder: string;
  scrollContainerClassName?: string;
}

const Options = forwardRef<HTMLDivElement, ComboBoxOptionsProps>(
  function Options(
    {
      children,
      query,
      setQuery,
      searchBarPlaceholder,
      className,
      side,
      align,
      scrollContainerClassName,
      ...rest
    },
    ref,
  ) {
    return (
      <PopoverContent
        className={mergeClassNames(
          'flex flex-col gap-2',
          'bg-surface-2 z-10 rounded p-1',
          'border-stroke shadow-elevation border',
          className,
        )}
        sideOffset={5}
        side={side}
        align={align}
        ref={ref}
        asChild
        {...rest}
      >
        <Command loop>
          <SearchBar
            sizeVariant="xs"
            query={query}
            setQuery={setQuery}
            placeholder={searchBarPlaceholder}
          />

          <Command.List>
            <Command.Empty className="text-text-tertiary p-2 text-xs">
              No results found.
            </Command.Empty>
            <ScrollShadowsContainer className={scrollContainerClassName}>
              {children}
            </ScrollShadowsContainer>
          </Command.List>
        </Command>
      </PopoverContent>
    );
  },
);

export interface ComboBoxOptionProps
  extends WithClassnames<Omit<HTMLProps<HTMLDivElement>, 'onSelect'>> {
  selectionStartIcon?: ReactNode;
  selectionEndIcon?: ReactNode;
  children: ReactNode;
  value: string;
  disabled?: boolean;
  isSelected?: boolean;
  onValueChange: (value: string) => void;
}

const Option = forwardRef<HTMLDivElement, ComboBoxOptionProps>(function Option(
  {
    children,
    value,
    disabled,
    className,
    selectionStartIcon,
    selectionEndIcon,
    isSelected,
    onValueChange,
  },
  ref,
) {
  const hoverStateOverlayClassNames = getStateOverlayClassNames({
    borderRadiusVariant: 'base',
    // Applies overlay class when item is highlighted via keyboard nav.
    stateClassNameOverrides: 'data-[selected=true]:before:bg-overlay-hover',
  });

  return (
    <Command.Item
      className={mergeClassNames(
        'flex items-center justify-between gap-x-1',
        'select-none rounded p-1',
        'text-text-secondary text-xs',
        isSelected && 'text-text-primary',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        hoverStateOverlayClassNames,
        className,
      )}
      ref={ref}
      value={value}
      onSelect={onValueChange}
    >
      {selectionStartIcon && selectionStartIcon}
      {children}
      {selectionEndIcon && selectionEndIcon}
    </Command.Item>
  );
});

export const ComboBox = {
  Root,
  Trigger,
  PillTrigger,
  Options,
  Option,
};
