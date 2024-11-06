import { joinClassNames, mergeClassNames } from '@vertex-protocol/web-common';
import { Button, Icons, LinkButton } from '@vertex-protocol/web-ui';
import { TOAST_HEADER_ICON_SIZE } from 'client/components/Toast/consts';
import {
  ToastBodyProps,
  ToastContainerProps,
  ToastFooterLinkProps,
  ToastHeaderProps,
  ToastSeparatorProps,
} from 'client/components/Toast/types';
import Link from 'next/link';

/**
 * Base Toast container component.
 * Horizontal padding is applied by default to pad the divider.
 */
function Container({ visible, children, className }: ToastContainerProps) {
  return (
    <div
      className={mergeClassNames(
        'flex flex-col rounded px-2 transition-opacity',
        'bg-background border-stroke group cursor-default overflow-clip border',
        // Apply a min-width to fit content without overflow with w-[360px] as the ideal width
        'max-w-screen w-[360px] min-w-min',
        'max-h-[50vh] sm:max-h-72',
        visible ? 'opacity-100' : 'opacity-0',
        className,
      )}
    >
      {children}
    </div>
  );
}

function Header({ className, children, onDismiss }: ToastHeaderProps) {
  return (
    <div className="flex w-full items-center p-2 pr-0">
      <div
        className={mergeClassNames(
          'text-text-primary text-sm',
          'flex flex-1',
          className,
        )}
      >
        {children}
      </div>
      <Button
        endIcon={<Icons.XCircle size={TOAST_HEADER_ICON_SIZE} />}
        className="text-text-tertiary"
        onClick={onDismiss}
      />
    </div>
  );
}

/**
 * An optionally animated divider that serves as a timer for the toast.
 */
function Separator({ ttl, className }: ToastSeparatorProps) {
  const animationStyles = (() => {
    if (!ttl || ttl === Infinity) {
      return {};
    }
    return {
      className:
        'animate-toast-timer group-hover:[animation-play-state:paused]',
      style: { animationDuration: `${ttl}ms` },
    };
  })();

  return (
    <div
      className={mergeClassNames(
        'bg-surface-2 h-px origin-left',
        animationStyles.className,
        className,
      )}
      style={animationStyles.style}
    />
  );
}

function Body({ children, className }: ToastBodyProps) {
  return (
    <div
      className={mergeClassNames(
        'text-text-secondary text-xs',
        'w-full p-2',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function FooterLink({
  className,
  children,
  ...rest
}: ToastFooterLinkProps) {
  return (
    <LinkButton
      as={Link}
      colorVariant="primary"
      // w-max keeps the text content left-aligned, hence we don't need items-start from parent usages
      className={joinClassNames('text-2xs w-max', className)}
      {...rest}
    >
      {children}
    </LinkButton>
  );
}

export const Toast = {
  Container,
  Header,
  FooterLink,
  Separator,
  Body,
};
