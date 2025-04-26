import {
  PopoverContent,
  PopoverContentProps,
  PopoverProps,
  Root as PopoverRoot,
  PopoverTrigger,
  PopoverTriggerProps,
} from '@radix-ui/react-popover';
import {
  joinClassNames,
  WithChildren,
  WithClassnames,
  WithRef,
} from '@vertex-protocol/web-common';
import {
  DropdownUi,
  DropdownUiTriggerProps,
  ScrollShadowsContainer,
  SearchBar,
} from '@vertex-protocol/web-ui';
import { Command } from 'cmdk';
import { HTMLProps, ReactNode } from 'react';
import { Merge } from 'type-fest';

function Root({ onOpenChange, open, children }: PopoverProps) {
  return (
    <PopoverRoot open={open} onOpenChange={onOpenChange}>
      {children}
    </PopoverRoot>
  );
}

export type ComboBoxTriggerProps = WithRef<
  Merge<DropdownUiTriggerProps, PopoverTriggerProps>,
  HTMLButtonElement
>;

function Trigger({
  className,
  children,
  disabled,
  borderRadiusVariant,
  stateClassNameOverrides,
  startIcon,
  endIcon,
  open,
  ...rest
}: ComboBoxTriggerProps) {
  return (
    <PopoverTrigger asChild {...rest}>
      <DropdownUi.Trigger
        className={className}
        open={open}
        disabled={disabled}
        stateClassNameOverrides={stateClassNameOverrides}
        startIcon={startIcon}
        endIcon={endIcon}
        borderRadiusVariant={borderRadiusVariant}
      >
        {children}
      </DropdownUi.Trigger>
    </PopoverTrigger>
  );
}

function PillTrigger({
  disabled,
  open,
  children,
  className,
  ...rest
}: WithRef<
  Omit<ComboBoxTriggerProps, 'stateClassNameOverrides' | 'borderRadiusVariant'>,
  HTMLButtonElement
>) {
  return (
    <PopoverTrigger asChild {...rest}>
      <DropdownUi.PillTrigger
        className={className}
        open={open}
        disabled={disabled}
      >
        {children}
      </DropdownUi.PillTrigger>
    </PopoverTrigger>
  );
}

export interface ComboBoxOptionsProps
  extends WithChildren<
    WithClassnames<WithRef<PopoverContentProps, HTMLDivElement>>
  > {
  query: string;
  setQuery: (q: string) => void;
  value: string | undefined;
  onValueChange: (value: string) => void;
  searchBarPlaceholder: string;
  scrollContainerClassName?: string;
}

function Options({
  children,
  query,
  setQuery,
  value,
  onValueChange,
  searchBarPlaceholder,
  className,
  scrollContainerClassName,
  sideOffset,
  ...rest
}: ComboBoxOptionsProps) {
  return (
    <PopoverContent asChild sideOffset={sideOffset ?? 5} {...rest}>
      <DropdownUi.Content
        className={joinClassNames(
          'min-w-(--radix-popover-trigger-width) rounded-sm',
          className,
        )}
      >
        <Command
          className="flex flex-col gap-y-2"
          // We just need to know the currently selected value for this case.
          // Command is being controlled via the Command.Item `onSelect` prop.
          // Using `defaultValue` here to since `value` changes whenever an item is selected via keyboard nav.
          defaultValue={value}
          onValueChange={onValueChange}
          loop
        >
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
            <ScrollShadowsContainer
              className={joinClassNames(
                'flex flex-col',
                scrollContainerClassName,
              )}
            >
              {children}
            </ScrollShadowsContainer>
          </Command.List>
        </Command>
      </DropdownUi.Content>
    </PopoverContent>
  );
}

export interface ComboBoxOptionProps
  extends WithClassnames<WithRef<Omit<HTMLProps<HTMLDivElement>, 'onSelect'>>> {
  selectionStartIcon?: ReactNode;
  selectionEndIcon?: ReactNode;
  children: ReactNode;
  value: string;
  disabled?: boolean;
  onValueChange: (value: string) => void;
}

function Option({
  children,
  disabled,
  className,
  selectionStartIcon,
  selectionEndIcon,
  onValueChange,
  ...rest
}: ComboBoxOptionProps) {
  return (
    <Command.Item asChild onSelect={onValueChange} {...rest}>
      <DropdownUi.Item disabled={disabled} className={className}>
        {selectionStartIcon && selectionStartIcon}
        {children}
        {selectionEndIcon && selectionEndIcon}
      </DropdownUi.Item>
    </Command.Item>
  );
}

export const ComboBox = {
  Root,
  Trigger,
  PillTrigger,
  Options,
  Option,
};
