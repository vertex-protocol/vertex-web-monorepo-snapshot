import {
  WithChildren,
  WithClassnames,
  joinClassNames,
} from '@vertex-protocol/web-common';
import { LinkButton } from 'client/components/LinkButton';
import Link from 'next/link';

function WhiteText({ children, className }: WithChildren<WithClassnames>) {
  return (
    <span className={joinClassNames('text-text-primary', className)}>
      {children}
    </span>
  );
}

function PurpleLinkButton({
  children,
  ...rest
}: WithChildren<WithClassnames<{ href: string }>>) {
  return (
    <LinkButton external as={Link} colorVariant="accent" {...rest}>
      {children}
    </LinkButton>
  );
}

function Section({ children, className }: WithChildren<WithClassnames>) {
  return (
    <div className={joinClassNames('flex flex-col gap-y-1', className)}>
      {children}
    </div>
  );
}

function Container({ children, className }: WithChildren<WithClassnames>) {
  return (
    <div
      className={joinClassNames('flex flex-col items-start gap-y-4', className)}
    >
      {children}
    </div>
  );
}

export const FaqDefinition = {
  WhiteText,
  PurpleLinkButton,
  Section,
  Container,
};
