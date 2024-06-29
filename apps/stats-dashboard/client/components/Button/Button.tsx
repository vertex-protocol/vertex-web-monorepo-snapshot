import { mergeClassNames } from '@vertex-protocol/web-common';
import Link from 'next/link';
import { forwardRef, Ref } from 'react';

import { Spinner } from '@vertex-protocol/web-ui';
import {
  ButtonAsDivProps,
  ButtonAsHTMLButtonProps,
  ButtonAsLinkProps,
  ButtonProps,
} from './types';

export const Button = forwardRef(function Button(
  props: ButtonProps,
  ref: Ref<any>,
) {
  const {
    as: Component,
    className: baseClassName,
    iconClassName,
    startIcon = null,
    endIcon = null,
    disabled = false,
    isLoading = false,
    children: baseChildren,
    ...rest
  } = props;
  const hasGap = startIcon || endIcon || isLoading;
  const disableInteraction = disabled || isLoading;

  const children = (
    <>
      {isLoading ? <Spinner className="w-4 text-inherit" /> : startIcon}
      {baseChildren}
      {endIcon}
    </>
  );

  const className = mergeClassNames(
    'transition-all',
    'inline-flex items-center justify-center whitespace-nowrap',
    hasGap && 'gap-x-2',
    disabled ? 'cursor-not-allowed opacity-90' : 'cursor-pointer',
    isLoading && 'cursor-wait opacity-90',
    baseClassName,
  );

  if (Component === Link) {
    const { external, ...passthroughLinkProps } = rest as Omit<
      ButtonAsLinkProps,
      'as'
    >;

    // We can't easily disable link elements, so return a div with the same styling
    if (disableInteraction) {
      return (
        <div className={className} style={rest.style} ref={ref}>
          {children}
        </div>
      );
    }

    // Passing in `external = true` will automatically add `target="_blank"` and `rel="noopener noreferrer"`
    const target = external ? '_blank' : undefined;
    const rel = external ? 'noopener noreferrer' : undefined;

    return (
      <Link
        target={target}
        rel={rel}
        className={className}
        ref={ref}
        {...passthroughLinkProps}
      >
        {children}
      </Link>
    );
  }

  if (Component === 'div') {
    const { onClick, ...passthroughDivProps } = rest as ButtonAsDivProps;
    return (
      <div
        className={className}
        onClick={disableInteraction ? undefined : onClick}
        ref={ref}
        {...passthroughDivProps}
      >
        {children}
      </div>
    );
  }

  const { onClick, type, ...passThroughButtonProps } =
    rest as ButtonAsHTMLButtonProps;

  return (
    <button
      ref={ref}
      className={className}
      onClick={disableInteraction ? undefined : onClick}
      disabled={disableInteraction}
      type={type ?? 'button'}
      {...passThroughButtonProps}
    >
      {children}
    </button>
  );
});
