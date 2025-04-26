'use client';

import {
  joinClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { Button } from '@vertex-protocol/web-ui';
import {
  AnalyticsSource,
  useAnalyticsContext,
} from 'client/analytics/AnalyticsContext';
import Link, { LinkProps } from 'next/link';

interface Props extends WithChildren, LinkProps, WithClassnames {
  trackingKey: AnalyticsSource;
  onClick?: () => void;
}

export function LaunchAppButton({
  children,
  href,
  className,
  trackingKey,
  onClick,
}: Props) {
  const { trackEvent } = useAnalyticsContext();

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
      className={buttonClasses}
      onClick={() => {
        trackEvent({
          type: 'new_marketing_cta_clicked',
          data: { source: trackingKey },
        });
        onClick?.();
      }}
      href={href}
    >
      <LaunchAppButtonContent>{children}</LaunchAppButtonContent>
    </Button>
  );
}

function LaunchAppButtonContent({ children, ...rest }: WithChildren) {
  const containerClasses = joinClassNames(
    'launch-button-gradient',
    'shadow-button',
    'bg-button-gradient',
    'relative',
    'w-full h-9 lg:h-10',
    'rounded-md',
  );

  const wrapperClasses = joinClassNames(
    'launch-button-bg',
    'flex h-full w-full',
    'items-center justify-center',
    'px-6',
  );

  const textClasses = joinClassNames(
    'relative z-1',
    'leading-normal text-body-13',
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
