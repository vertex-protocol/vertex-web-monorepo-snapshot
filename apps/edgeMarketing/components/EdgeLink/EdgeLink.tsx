import { joinClassNames } from '@vertex-protocol/web-common';
import Link from 'next/link';
import { ComponentPropsWithRef } from 'react';

interface EdgeLinkProps extends Omit<ComponentPropsWithRef<typeof Link>, 'as'> {
  href: string;
  children: string;
  external?: boolean;
}

/**
 * @name EdgeLink
 * @description A text link with animated underline on hover.
 */
export function EdgeLink({
  children,
  href,
  className,
  external = false,
  ...rest
}: EdgeLinkProps) {
  const target = external ? '_blank' : undefined;
  const rel = external ? 'noopener noreferrer' : undefined;

  const underlineClassName = joinClassNames(
    'after:inset-x-0 after:absolute after:bg-black after:bottom-0',
    'after:h-0.5 max-w-auto lg:after:max-w-0',
    'hover:after:max-w-full',
    'after:transition-all after:duration-200',
  );

  const linkClassName = joinClassNames(
    'group relative',
    'outline-current outline-offset-4',
    underlineClassName,
    className,
  );

  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      {...rest}
      className={linkClassName}
    >
      {children}
    </Link>
  );
}
