import { joinClassNames } from '@vertex-protocol/web-common';
import { CARD_ROUNDED_CLASSNAMES, Divider } from '@vertex-protocol/web-ui';
import { ReactNode } from 'react';

interface Props {
  colorVariant: 'blast' | 'blitz';
  heading: ReactNode;
  content: ReactNode;
  footer: ReactNode;
}

export function BlitzEarningsCard({
  colorVariant,
  heading,
  content,
  footer,
}: Props) {
  return (
    <div
      className={joinClassNames(
        'from-stroke via-stroke overflow-hidden bg-linear-to-br',
        CARD_ROUNDED_CLASSNAMES,
        colorVariant === 'blast' ? 'to-accent-blast' : 'to-accent',
        'p-px',
      )}
    >
      <div
        className={joinClassNames(
          'bg-surface-card h-full w-full',
          CARD_ROUNDED_CLASSNAMES,
          'flex flex-col gap-y-4 p-6',
        )}
      >
        <div className="flex items-center justify-center gap-x-1">
          {heading}
        </div>
        {content}
        {/* Push divider to bottom. */}
        <Divider className="mt-auto" />
        {/* Hardcode footer height on desktop to keep things aligned between cards. */}
        <div className="lg:h-14">{footer}</div>
      </div>
    </div>
  );
}
