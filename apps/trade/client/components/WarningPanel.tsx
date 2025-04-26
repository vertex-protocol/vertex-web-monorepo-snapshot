import {
  mergeClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { Icons } from '@vertex-protocol/web-ui';

interface Props extends WithChildren<WithClassnames> {
  /** Optional title for panel */
  title?: string;
}

export function WarningPanel({ title, children, className }: Props) {
  const warningTitle = (
    <span className="text-text-primary flex items-center gap-x-1.5">
      <Icons.WarningCircle className="bg-surface-2 size-4 rounded-full" />
      {title}
    </span>
  );

  return (
    <div
      className={mergeClassNames(
        'flex flex-col items-start gap-y-1.5',
        'rounded-sm px-3 py-2',
        'text-text-secondary text-xs',
        'bg-surface-1',
        className,
      )}
    >
      {!!title && warningTitle}
      {children}
    </div>
  );
}
