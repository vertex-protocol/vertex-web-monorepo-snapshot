import {
  mergeClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';

function ContentContainer({
  children,
  className,
}: WithClassnames<WithChildren>) {
  return (
    <div
      className={mergeClassNames(
        'text-text-secondary flex flex-col gap-y-5 p-3 text-xs',
        className,
      )}
    >
      {children}
    </div>
  );
}

function Section({ title, children }: WithChildren<{ title?: string }>) {
  return (
    <div className="flex flex-col gap-y-1.5">
      {!!title && <span className="text-text-primary">{title}</span>}
      <div className="flex flex-col gap-y-1.5 font-normal">{children}</div>
    </div>
  );
}

export const StakingSummary = {
  ContentContainer,
  Section,
};
