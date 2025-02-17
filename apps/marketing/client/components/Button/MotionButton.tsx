'use client';

import {
  WithChildren,
  WithClassnames,
  joinClassNames,
} from '@vertex-protocol/web-common';
import { Button } from '@vertex-protocol/web-ui';
import Link, { LinkProps } from 'next/link';

interface Props extends WithChildren, LinkProps, WithClassnames {
  onClick?: () => void;
}

export function MotionButton({ children, href, className, onClick }: Props) {
  const buttonClasses = joinClassNames(
    'min-w-[125px]',
    'focus:shadow-[0_0_0_3px_rgba(255,255,255,0.1)] focus:rounded-md',
    'focus-visible:shadow-[0_0_0_3px_rgba(255,255,255,0.1)] focus-visible:rounded-md',
    'transition-[outline-offset] duration-100 ease-in',
    className,
  );

  return (
    <Button
      as={href ? Link : 'button'}
      href={href}
      onClick={onClick}
      className={buttonClasses}
    >
      <MotionButtonContent>{children}</MotionButtonContent>
    </Button>
  );
}

function MotionButtonContent({ children, ...rest }: WithChildren) {
  const containerClasses = joinClassNames(
    'motion-button-gradient',
    'shadow-button',
    'bg-button-gradient',
    'relative rounded-md',
    'text-white',
    'w-full h-[36px] lg:h-[40px]',
    'cursor-pointer',
  );

  const wrapperClasses = joinClassNames(
    'motion-button-bg',
    'flex h-full w-full',
    'items-center justify-center',
    'px-6',
  );

  const textClasses = joinClassNames(
    'relative z-[1]',
    'text-body-13',
    'tracking-[-0.3px]',
  );

  const backgroundClasses = joinClassNames(
    'bg-darkest',
    'absolute inset-px',
    'rounded-md',
  );

  return (
    <div className={containerClasses} {...rest}>
      <span className={wrapperClasses}>
        <span className={textClasses}>{children}</span>
      </span>
      <div className={backgroundClasses} />
    </div>
  );
}
