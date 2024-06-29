import { joinClassNames } from '@vertex-protocol/web-common';
import { forwardRef } from 'react';
import { TextButton, TextButtonProps } from './TextButton';

export type TabTextButtonProps = TextButtonProps & {
  active: boolean;
};

export const TabTextButton = forwardRef(function TabButton(
  { className, active, ...rest }: TabTextButtonProps,
  ref,
) {
  return (
    <TextButton
      className={joinClassNames(
        active
          ? 'text-text-primary'
          : 'text-text-tertiary hover:text-text-secondary',
        className,
      )}
      ref={ref}
      {...rest}
    />
  );
});
