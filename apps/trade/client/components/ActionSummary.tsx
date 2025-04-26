import {
  WithChildren,
  WithClassnames,
  joinClassNames,
  mergeClassNames,
} from '@vertex-protocol/web-common';
import { Button, UpDownChevronIcon } from '@vertex-protocol/web-ui';
import { useToggle } from 'ahooks';
import { ReactNode } from 'react';

function Header({
  className,
  open,
  isHighlighted,
  toggleOpen,
  labelContent,
}: WithClassnames<{
  open: boolean;
  toggleOpen: () => void;
  labelContent: ReactNode;
  isHighlighted?: boolean;
}>) {
  return (
    <Button as="div" className="w-full px-3 py-2" onClick={toggleOpen}>
      <div
        className={joinClassNames(
          'flex w-full items-center justify-between text-xs',
          isHighlighted ? 'text-text-secondary' : 'text-text-tertiary',
          className,
        )}
      >
        <div>{labelContent}</div>
        <UpDownChevronIcon open={open} />
      </div>
    </Button>
  );
}

function Disclosure({
  className,
  labelContent,
  expandableContent,
  isHighlighted,
}: WithClassnames<{
  labelContent: ReactNode;
  expandableContent: ReactNode;
  // Often used to increase contrast on the header to indicate that data has populated
  isHighlighted?: boolean;
}>) {
  const [open, { toggle: toggleOpen }] = useToggle();
  return (
    <div className={className}>
      <Header
        labelContent={labelContent}
        open={open}
        toggleOpen={toggleOpen}
        isHighlighted={isHighlighted}
      />
      {open && (
        <div className="flex flex-col gap-y-2 px-3 pt-1 pb-3">
          {expandableContent}
        </div>
      )}
    </div>
  );
}

function Container({ className, children }: WithClassnames<WithChildren>) {
  return (
    <div
      className={mergeClassNames(
        'bg-surface-1 flex flex-col rounded-sm',
        className,
      )}
    >
      {children}
    </div>
  );
}

export const ActionSummary = {
  Disclosure,
  Container,
};
