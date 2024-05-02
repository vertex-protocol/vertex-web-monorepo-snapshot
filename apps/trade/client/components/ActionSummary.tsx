import {
  WithChildren,
  WithClassnames,
  joinClassNames,
  mergeClassNames,
} from '@vertex-protocol/web-common';
import { Button } from '@vertex-protocol/web-ui';
import { useToggle } from 'ahooks';
import { ReactNode } from 'react';
import { useRunOnceOnCondition } from '../hooks/util/useRunOnceOnCondition';
import { UpDownChevronIcon } from './Icons/UpDownChevronIcon';

function Header({
  className,
  open,
  isHighlighted,
  toggleOpen,
  labelContent,
}: WithClassnames<{
  open: boolean;
  toggleOpen: () => void;
  labelContent: React.ReactNode;
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
  triggerOpen,
  isHighlighted,
}: WithClassnames<{
  labelContent: ReactNode;
  expandableContent: ReactNode;
  // When triggerOpen switches from false to true for the first time, the disclosure will be opened
  triggerOpen?: boolean;
  // Often used to increase contrast on the header to indicate that data has populated
  isHighlighted?: boolean;
}>) {
  const [open, { toggle: toggleOpen, set: setOpen }] = useToggle();
  useRunOnceOnCondition(!!triggerOpen, () => setOpen(true));
  return (
    <div className={className}>
      <Header
        labelContent={labelContent}
        open={open}
        toggleOpen={toggleOpen}
        isHighlighted={isHighlighted}
      />
      {open && expandableContent}
    </div>
  );
}

function Container({ className, children }: WithClassnames<WithChildren>) {
  return (
    <div
      className={mergeClassNames(
        'bg-surface-1 flex flex-col rounded',
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
