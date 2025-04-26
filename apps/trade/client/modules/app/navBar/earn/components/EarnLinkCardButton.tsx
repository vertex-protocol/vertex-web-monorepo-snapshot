import { IconComponent, NavCardButton } from '@vertex-protocol/web-ui';
import { BaseEarnLinkProps } from 'client/modules/app/navBar/earn/types';
import Link from 'next/link';
import { ReactNode } from 'react';

interface Props extends BaseEarnLinkProps {
  topOpportunityContent: ReactNode;
  pageIcon: IconComponent;
}

export function EarnLinkCardButton({
  href,
  pageLabel,
  pageIcon: PageIcon,
  topOpportunityContent,
}: Props) {
  return (
    <NavCardButton
      as={Link}
      href={href}
      // The default gap creates an inconsistency with the "Page" header.
      // We are using `gap-x-0` here to maintain a consistent layout with the header.
      titleClassName="gap-x-0"
      title={
        <>
          <div
            // Using `w-56` here to maintain a consistent layout with "Page" header.
            className="flex w-56 items-center gap-x-3"
          >
            {/* We are not using the `icon` prop here to maintain a consistent layout with the header. */}
            <PageIcon className="h-5 w-auto" />
            <span className="text-text-secondary">{pageLabel}</span>
          </div>
          <div className="flex items-center gap-x-2">
            {topOpportunityContent}
          </div>
        </>
      }
    />
  );
}
