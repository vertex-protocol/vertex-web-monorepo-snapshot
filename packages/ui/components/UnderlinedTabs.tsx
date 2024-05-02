import {
  WithChildren,
  WithClassnames,
  joinClassNames,
} from '@vertex-protocol/web-common';
import { forwardRef } from 'react';
import { Button as BaseButton, TabButtonProps } from './Button';

const Button = forwardRef(function UnderlinedTabsButton(
  { className, active, size, disabled, ...rest }: TabButtonProps,
  ref,
) {
  const activeButtonClasses = 'text-text-primary after:scale-x-100';
  const inactiveButtonClasses =
    'text-text-tertiary after:scale-x-0 hover:text-text-primary';
  const underlineClasses =
    'after:absolute after:bottom-0.5 after:left-0 after:h-0.5 after:w-full after:rounded-t-sm after:bg-accent after:transition-transform after:duration-200';

  const buttonSizeClassNames =
    size === 'sm' ? 'text-xs py-2 px-2.5' : 'text-sm py-2.5 px-3';

  return (
    <BaseButton
      className={joinClassNames(
        'relative text-center',
        active ? activeButtonClasses : inactiveButtonClasses,
        buttonSizeClassNames,
        underlineClasses,
        className,
      )}
      ref={ref}
      {...rest}
    />
  );
});

type UnderlinedTabsContainerProps = WithChildren<WithClassnames>;

const Container = forwardRef<HTMLDivElement, UnderlinedTabsContainerProps>(
  function UnderlinedTabsContainer(
    { children, className }: UnderlinedTabsContainerProps,
    ref,
  ) {
    return (
      <div
        className={joinClassNames(
          'flex min-w-max',
          'after:bg-stroke relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:rounded-sm',
          className,
        )}
        ref={ref}
      >
        {children}
      </div>
    );
  },
);

export const UnderlinedTabs = {
  Button,
  Container,
};
