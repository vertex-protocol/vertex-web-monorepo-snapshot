import {
  joinClassNames,
  mergeClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { Card } from '@vertex-protocol/web-ui';
import { LinkButton, LinkButtonProps } from 'client/components/LinkButton';
import { ReactNode } from 'react';

function Container({ children, className }: WithClassnames<WithChildren>) {
  return (
    <Card
      className={mergeClassNames('flex flex-col gap-y-5 p-4 sm:p-6', className)}
    >
      {children}
    </Card>
  );
}

interface HeaderProps extends WithClassnames<WithChildren> {
  contentWrapperClassName?: string;
  endElement?: ReactNode;
}

function Header({
  children,
  className,
  contentWrapperClassName,
  endElement,
}: HeaderProps) {
  return (
    <div
      className={mergeClassNames(
        'flex items-center justify-between gap-1',
        className,
      )}
    >
      <div
        className={mergeClassNames(
          'text-text-primary text-base sm:text-xl',
          contentWrapperClassName,
        )}
      >
        {children}
      </div>
      {endElement ? endElement : null}
    </div>
  );
}

function HeaderLinkButton({ endIcon, className, ...rest }: LinkButtonProps) {
  return (
    <LinkButton
      className={mergeClassNames('gap-x-1.5 text-xs sm:text-sm', className)}
      {...rest}
    />
  );
}

function LineItems({ children, className }: WithClassnames<WithChildren>) {
  return (
    <div className={mergeClassNames('flex flex-col gap-y-3.5', className)}>
      {children}
    </div>
  );
}

function MetricsPane({ children, className }: WithClassnames<WithChildren>) {
  return (
    <div
      className={joinClassNames(
        'grid grid-cols-2 gap-x-10 gap-y-4 lg:flex lg:gap-y-6',
        className,
      )}
    >
      {children}
    </div>
  );
}

export const RewardsCard = {
  Container,
  Header,
  HeaderLinkButton,
  LineItems,
  MetricsPane,
};
