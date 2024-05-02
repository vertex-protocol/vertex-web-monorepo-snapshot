import { mergeClassNames } from '@vertex-protocol/web-common';
import { forwardRef } from 'react';
import { Button } from './Button';
import { STANDARD_BUTTON_TEXT_SIZE_CLASSNAME } from './consts';
import { ButtonProps, StandardButtonSize } from './types';

export type TabButtonProps = ButtonProps & {
  size: Exclude<StandardButtonSize, 'md'>;
  active?: boolean;
};

export const TabButton = forwardRef(function TabButton(
  { className, size, active, ...rest }: TabButtonProps,
  ref,
) {
  const horizontalPadding = {
    sm: 'px-3',
    lg: 'px-5',
  }[size];
  const verticalPadding = {
    sm: 'py-1.5',
    lg: 'py-2',
  }[size];

  const showDisabledState = rest.disabled || rest.isLoading;

  return (
    <Button
      className={mergeClassNames(
        horizontalPadding,
        verticalPadding,
        !showDisabledState &&
          'hover:bg-overlay-hover/5 hover:text-text-primary',
        active
          ? 'bg-surface-2 text-text-primary'
          : 'text-text-tertiary bg-surface-1',
        'rounded',
        STANDARD_BUTTON_TEXT_SIZE_CLASSNAME[size],
        className,
      )}
      ref={ref}
      {...rest}
    />
  );
});
