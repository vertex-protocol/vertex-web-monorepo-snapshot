import { mergeClassNames } from '@vertex-protocol/web-common';
import { BorderRadiusVariant } from '../../types';

interface Params {
  borderRadiusVariant?: BorderRadiusVariant;
  stateClassNameOverrides?: string;
  active?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
}

/**
 * Returns a string of class names for overlay state based on the provided parameters.
 *
 * @param borderRadiusVariant - The variant of border radius to apply to the overlay.
 * e.g. `'base' | 'sm' | 'md' | 'lg' | 'full'`
 *
 * @param active - Optional param used in components with an `active` state. The overlay is set to a static "active" state, regardless of cursor position. Defaults to false. Note: Will be overridden by the `disabled` state.
 *
 * @param disabled - Optional param used in components that require a "disabled" state. Defaults to false.
 *
 * If set to true, the overlay will only have a disabled state.
 * >```ts
 * > getStateOverlayClassNames({ disabled: true })
 * >```
 *
 * @param isLoading - Optional param used in components where we want to omit the overlay when in `isLoading` state. This is typically relevant in buttons that share similar styling for `disabled` and `isLoading` states,
 * but don't require an overlay when in `isLoading` state.
 *
 * @param stateClassNameOverrides - Optional overrides to append to the overlay state class names. Typically for one-off cases where `roundedClassNames` doesn't suffice. e.g. `before:rounded-l-lg`
 */
export function getStateOverlayClassNames({
  borderRadiusVariant,
  stateClassNameOverrides,
  active,
  disabled,
  isLoading,
}: Params) {
  if (isLoading) {
    return;
  }

  const baseClassNames =
    // `before:pointer-events-none` is required to prevent the overlay from capturing pointer events.
    'relative before:absolute before:inset-0 before:pointer-events-none';

  const stateClassNames = (() => {
    if (disabled) {
      return 'before:bg-overlay-disabled';
    }

    return active ? 'before:bg-overlay-hover' : 'hover:before:bg-overlay-hover';
  })();

  const roundedClassName = (() => {
    if (!borderRadiusVariant) {
      return;
    }

    return {
      xs: 'before:rounded-xs',
      sm: 'before:rounded-sm',
      md: 'before:rounded-md',
      lg: 'before:rounded-lg',
      full: 'before:rounded-full',
    }[borderRadiusVariant];
  })();

  return mergeClassNames(
    baseClassNames,
    stateClassNames,
    roundedClassName,
    stateClassNameOverrides,
  );
}
