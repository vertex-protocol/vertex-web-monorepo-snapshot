import * as RadixCollapsible from '@radix-ui/react-collapsible';
import {
  joinClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { Button, ButtonAsLinkProps, IconType } from '@vertex-protocol/web-ui';
import Link from 'next/link';
import { ReactNode } from 'react';

interface CollapsibleProps extends WithClassnames {
  triggerContent: ReactNode;
  collapsibleContent: ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}

function Collapsible({
  triggerContent,
  collapsibleContent,
  className,
  open,
  setOpen,
}: CollapsibleProps) {
  return (
    <RadixCollapsible.Root
      className={className}
      open={open}
      onOpenChange={setOpen}
    >
      {/*w-full here allows the collapsible to take up the full width of the collapsible root*/}
      <RadixCollapsible.Trigger asChild className="w-full">
        {triggerContent}
      </RadixCollapsible.Trigger>
      <RadixCollapsible.Content className="pl-6 pt-2">
        {collapsibleContent}
      </RadixCollapsible.Content>
    </RadixCollapsible.Root>
  );
}

function CollapsibleLinksContainer({
  children,
  className,
}: WithChildren<WithClassnames>) {
  return (
    <div
      className={joinClassNames(
        'border-stroke flex flex-col border-l px-2',
        className,
      )}
    >
      {children}
    </div>
  );
}

interface CollapsibleLinkButtonProps extends Omit<ButtonAsLinkProps, 'as'> {
  icon?: IconType;
  active?: boolean;
}

function CollapsibleLinkButton({
  active,
  icon: Icon,
  children,
  className,
  ...rest
}: CollapsibleLinkButtonProps) {
  return (
    <Button
      as={Link}
      className={joinClassNames(
        active
          ? 'text-text-primary'
          : 'hover:text-text-primary text-text-secondary',
        'title-text flex items-center justify-start',
        'px-3 py-2',
        className,
      )}
      startIcon={
        Icon ? <Icon className="text-text-primary" size={24} /> : undefined
      }
      {...rest}
    >
      {children}
    </Button>
  );
}

export const MobileNavCustomCollapsible = {
  Root: Collapsible,
  LinksContainer: CollapsibleLinksContainer,
  LinkButton: CollapsibleLinkButton,
};
