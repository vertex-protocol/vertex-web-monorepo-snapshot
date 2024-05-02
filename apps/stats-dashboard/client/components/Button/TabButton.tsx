import { mergeClassNames } from '@vertex-protocol/web-common';
import { Button } from 'client/components/Button/Button';
import { STANDARD_BUTTON_TEXT_SIZE } from 'client/components/Button/consts';
import {
  ButtonProps,
  StandardButtonSize,
} from 'client/components/Button/types';
import { forwardRef } from 'react';

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
        !showDisabledState && 'hover:bg-black-200 hover:text-white',
        active ? 'bg-black-200 text-white' : 'text-white-600 bg-black-600',
        'rounded',
        STANDARD_BUTTON_TEXT_SIZE[size],
        className,
      )}
      ref={ref}
      {...rest}
    />
  );
});
