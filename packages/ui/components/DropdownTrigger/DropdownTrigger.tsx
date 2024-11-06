import { SelectTriggerProps } from '@radix-ui/react-select';
import { mergeClassNames, WithClassnames } from '@vertex-protocol/web-common';
import {
  forwardRef,
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
} from 'react';
import { BorderRadiusVariant } from '../../types';
import { getStateOverlayClassNames } from '../../utils';

// Uses `SelectTriggerProps` because at the time of writing Radix's `SelectTriggerProps` and
// `PopoverTriggerProps` are the same. If that changes we'll need to revisit our approach.
export interface DropdownTriggerProps
  extends WithClassnames<SelectTriggerProps> {
  endIcon?: ReactNode;
  borderRadiusVariant?: Extract<BorderRadiusVariant, 'base' | 'full'>;
  stateClassNameOverrides?: string;
  trigger: ForwardRefExoticComponent<
    SelectTriggerProps & RefAttributes<HTMLButtonElement>
  >;
}

/**
 * A button trigger that can be shared across `Select` and `ComboBox`.
 */
export const DropdownTrigger = forwardRef<
  HTMLButtonElement,
  DropdownTriggerProps
>(function DropdownTrigger(
  {
    borderRadiusVariant = 'base',
    stateClassNameOverrides,
    disabled,
    className,
    children,
    endIcon,
    trigger: Trigger,
    ...rest
  },
  ref,
) {
  // Since we want to handle the disabled trigger state differently and without the
  // disabled state overlay, consumers are responsible for the disabled overlay if needed
  // ex. `CollateralInputSelect` has a disabled trigger state, but the disabled overlay
  // is managed by its container.
  const hoverStateOverlayClassNames = getStateOverlayClassNames({
    borderRadiusVariant,
    stateClassNameOverrides,
  });

  return (
    <Trigger
      className={mergeClassNames(
        'flex items-center justify-between gap-x-2',
        'rounded px-2 py-1 text-xs',
        'bg-surface-1',
        disabled ? 'cursor-not-allowed' : hoverStateOverlayClassNames,
        className,
      )}
      disabled={disabled}
      ref={ref}
      {...rest}
    >
      {children}
      {endIcon}
    </Trigger>
  );
});
