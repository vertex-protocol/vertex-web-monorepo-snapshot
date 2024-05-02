import { hasClass } from '@vertex-protocol/web-common';
import classNames from 'classnames';
import { Spinner } from 'client/components/Spinner';
import Link from 'next/link';
import { ElementType } from 'react';

import { ButtonElement, ButtonProps } from './types';

function BaseButton<E extends ButtonElement>({
  as: Component,
  children,
  ref,
  ...rest
}: ButtonProps<E>) {
  // Use type hacks here to resolve props (unfortunately!)
  const RenderedComponent: ElementType = (() => {
    if (!Component) return 'button' as E;

    return Component === Link && rest.disabled
      ? ('button' as E)
      : (Component as E);
  })();

  return (
    // "rest spreading" is technically incorrect because of the RenderedComponent check
    <RenderedComponent {...rest} ref={ref}>
      {children}
    </RenderedComponent>
  );
}

export function HomePageButton<E extends ButtonElement = 'button'>(
  props: ButtonProps<E>,
) {
  const {
    className,
    iconClassName,
    startIcon = null,
    endIcon = null,
    disabled = false,
    external = false,
    isLoading = false,
    children,
    onClick,
    ...rest
  } = props;
  const hasGap = startIcon || endIcon || isLoading;

  // Conditional external props
  // These have no effect on `as="button"` elements
  // Note: Passing in `external = true` will automatically add `target="_blank"` and `rel="noopener noreferrer"`
  const target = external ? '_blank' : undefined;
  const rel = external ? 'noopener noreferrer' : undefined;

  const disableInteraction = disabled || isLoading;

  const currentEndIcon = isLoading ? (
    <Spinner className="w-5 text-inherit" />
  ) : (
    endIcon
  );

  return (
    <BaseButton
      className={classNames(
        'transition',
        !hasClass(className, 'flex', 'inline-flex', 'block', 'grid') &&
          'inline-flex items-center justify-center whitespace-nowrap',
        hasGap && !hasClass(className, 'gap-x') && 'gap-x-2',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        isLoading && 'cursor-wait opacity-90',
        className,
      )}
      target={target}
      rel={rel}
      disabled={disableInteraction}
      onClick={disableInteraction ? undefined : onClick}
      {...rest}
    >
      <>
        {/* Checking that icons exist so flex spacing is correct when they don't */}
        {/* Wrapping the icons in a `div` so they aren't compressed and so they can be styled with gap */}
        {startIcon && <div>{startIcon}</div>}
        {children}
        {(endIcon || isLoading) && <div>{currentEndIcon}</div>}
      </>
    </BaseButton>
  );
}
