import { mergeClassNames } from '@vertex-protocol/web-common';
import { forwardRef } from 'react';
import { DropdownTriggerProps } from './DropdownTrigger';

export const DropdownPillTrigger = forwardRef<
  HTMLButtonElement,
  Omit<DropdownTriggerProps, 'stateClassNameOverrides'>
>(function DropdownPillTrigger({ trigger: Trigger, className, ...rest }, ref) {
  return (
    <Trigger
      className={mergeClassNames(
        'bg-surface-3 rounded-full',
        'text-text-primary text-sm',
        className,
      )}
      borderRadiusVariant="full"
      ref={ref}
      {...rest}
    />
  );
});
