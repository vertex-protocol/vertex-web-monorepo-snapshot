import {
  SelectItemProps as BaseSelectItemProps,
  SelectTriggerProps as BaseSelectTriggerProps,
  Root,
  SelectContent,
  SelectContentProps,
  SelectItem,
  SelectItemIndicator,
  SelectPortal,
  SelectTrigger,
  SelectViewport,
} from '@radix-ui/react-select';
import {
  joinClassNames,
  mergeClassNames,
  WithRef,
} from '@vertex-protocol/web-common';
import { ReactNode } from 'react';
import { Merge } from 'type-fest';
import {
  DropdownUi,
  DropdownUiItemProps,
  DropdownUiTriggerProps,
} from '../DropdownUi/DropdownUi';
import { Icons } from '../Icons';
import { ScrollShadowsContainer } from '../ScrollShadowsContainer/ScrollShadowsContainer';

export type SelectTriggerProps = Merge<
  DropdownUiTriggerProps,
  BaseSelectTriggerProps
>;

function Trigger({
  disabled,
  borderRadiusVariant,
  stateClassNameOverrides,
  endIcon,
  className,
  children,
  ...rest
}: WithRef<SelectTriggerProps, HTMLButtonElement>) {
  return (
    <SelectTrigger asChild {...rest}>
      <DropdownUi.Trigger
        className={mergeClassNames('bg-surface-1', className)}
        disabled={disabled}
        borderRadiusVariant={borderRadiusVariant}
        stateClassNameOverrides={stateClassNameOverrides}
        endIcon={endIcon}
      >
        {children}
      </DropdownUi.Trigger>
    </SelectTrigger>
  );
}

function PillTrigger({
  children,
  className,
  disabled,
  endIcon,
  stateClassNameOverrides,
  ...rest
}: WithRef<SelectTriggerProps, HTMLButtonElement>) {
  return (
    <SelectTrigger asChild {...rest}>
      <DropdownUi.PillTrigger
        className={className}
        disabled={disabled}
        stateClassNameOverrides={stateClassNameOverrides}
        endIcon={endIcon}
      >
        {children}
      </DropdownUi.PillTrigger>
    </SelectTrigger>
  );
}

export interface SelectOptionsProps extends SelectContentProps {
  header?: ReactNode;
  viewportClassName?: string;
}

function Options({
  children,
  header,
  className,
  position = 'popper',
  viewportClassName,
  ...rest
}: WithRef<SelectOptionsProps, HTMLDivElement>) {
  return (
    <SelectContent asChild position={position} sideOffset={5} {...rest}>
      <DropdownUi.Content
        header={header}
        className={joinClassNames(
          'min-w-(--radix-select-trigger-width) rounded-sm',
          className,
        )}
      >
        {/*Smaller shadow as selects are usually in smaller containers*/}
        <ScrollShadowsContainer asChild shadowSize={10}>
          <SelectViewport
            className={joinClassNames('flex flex-col', viewportClassName)}
          >
            {children}
          </SelectViewport>
        </ScrollShadowsContainer>
      </DropdownUi.Content>
    </SelectContent>
  );
}

export interface SelectOptionProps
  extends BaseSelectItemProps,
    Pick<DropdownUiItemProps, 'startIcon' | 'endIcon'> {
  selectionStartIcon?: ReactNode;
  selectionEndIcon?: ReactNode;
  withSelectedCheckmark?: boolean;
}

function Option({
  children,
  className,
  value,
  startIcon,
  endIcon,
  selectionStartIcon,
  selectionEndIcon,
  withSelectedCheckmark = true,
  ...rest
}: WithRef<SelectOptionProps, HTMLDivElement>) {
  const endIndicator = (() => {
    if (withSelectedCheckmark) {
      return <Icons.Check />;
    }
    return selectionEndIcon;
  })();

  return (
    <SelectItem asChild value={value} {...rest}>
      <DropdownUi.Item
        className={className}
        startIcon={startIcon}
        endIcon={endIcon}
      >
        {selectionStartIcon && (
          <SelectItemIndicator>{selectionStartIcon}</SelectItemIndicator>
        )}
        {children}
        {endIndicator && (
          <SelectItemIndicator className="ml-auto">
            {endIndicator}
          </SelectItemIndicator>
        )}
      </DropdownUi.Item>
    </SelectItem>
  );
}

export const Select = {
  Root,
  Trigger,
  PillTrigger,
  Options,
  Option,
  Portal: SelectPortal,
};
