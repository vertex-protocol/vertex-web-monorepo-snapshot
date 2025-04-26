import {
  joinClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';

type Props = WithClassnames & WithChildren;

export function VlpOverviewCardTabContent({ children, className }: Props) {
  return (
    <div
      className={joinClassNames(
        'flex h-full flex-col gap-y-4 text-xs',
        className,
      )}
    >
      {children}
    </div>
  );
}
