import { SelectContentProps } from '@radix-ui/react-select';
import {
  joinClassNames,
  mergeClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { ReactNode } from 'react';
import { Z_INDEX } from '../../consts';
import { BorderRadiusVariant } from '../../types';
import { getStateOverlayClassNames } from '../../utils';
import { Button, ButtonProps } from '../Button';
import { Card } from '../Card';

export type DropdownUiTriggerProps = Pick<
  ButtonProps,
  'endIcon' | 'disabled' | 'startIcon' | 'className' | 'children'
> & {
  borderRadiusVariant?: BorderRadiusVariant;
  stateClassNameOverrides?: string;
  open?: boolean;
};

function Trigger({
  borderRadiusVariant = 'base',
  stateClassNameOverrides,
  disabled,
  className,
  open,
  ...rest
}: DropdownUiTriggerProps) {
  // Since we want to handle the disabled trigger state differently and without the
  // disabled state overlay, consumers are responsible for the disabled overlay if needed
  // ex. `CollateralInputSelect` has a disabled trigger state, but the disabled overlay
  // is managed by its container.
  const hoverStateOverlayClassNames = getStateOverlayClassNames({
    borderRadiusVariant,
    stateClassNameOverrides,
    active: open,
  });

  const roundedClassName = {
    base: 'rounded',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  }[borderRadiusVariant];

  return (
    <Button
      className={mergeClassNames(
        'flex items-center justify-between gap-x-2',
        'rounded px-2 py-1 text-xs',
        !disabled && hoverStateOverlayClassNames,
        roundedClassName,
        className,
      )}
      disabled={disabled}
      {...rest}
    />
  );
}

function PillTrigger({
  className,
  ...rest
}: Omit<DropdownUiTriggerProps, 'borderRadiusVariant'>) {
  return (
    <Trigger
      className={mergeClassNames(
        'bg-surface-3 relative justify-between rounded-full',
        'text-text-primary px-3 py-1 text-xs',
        className,
      )}
      borderRadiusVariant="full"
      {...rest}
    />
  );
}

export interface ContentProps
  extends WithChildren<WithClassnames<SelectContentProps>> {
  header?: ReactNode;
}

function Content({ className, children, header, ...rest }: ContentProps) {
  return (
    <Card
      className={mergeClassNames(
        'flex flex-col gap-y-1',
        'bg-surface-2 p-1',
        Z_INDEX.popover,
        className,
      )}
      {...rest}
    >
      {header}
      {children}
    </Card>
  );
}

export type DropdownUiItemProps = Exclude<ButtonProps, 'value'> & {
  active?: boolean;
};

function Item({ className, disabled, active, ...rest }: DropdownUiItemProps) {
  const hoverStateOverlayClassNames = getStateOverlayClassNames({
    borderRadiusVariant: 'base',
    stateClassNameOverrides: joinClassNames(
      // Apply hover state overlay when item is highlighted via keyboard nav. ie. DropdownMenu/Select
      'data-[highlighted]:before:bg-overlay-hover',
      // Apply hover state overlay when item is selected via `Combobox` component.
      'data-[selected=true]:before:bg-overlay-hover',
    ),
    disabled,
    active,
  });

  return (
    <Button
      className={mergeClassNames(
        'flex items-center justify-stretch gap-x-2',
        'select-none rounded px-2 py-1.5',
        'text-text-secondary text-xs',
        // Apply active color via inherent `state` attribute.
        // This is relevant in `Select` & `DropdownMenu` components.
        'data-[state=checked]:text-text-primary',
        hoverStateOverlayClassNames,
        className,
      )}
      {...rest}
    />
  );
}

export const DropdownUi = {
  Trigger,
  PillTrigger,
  Content,
  Item,
};
