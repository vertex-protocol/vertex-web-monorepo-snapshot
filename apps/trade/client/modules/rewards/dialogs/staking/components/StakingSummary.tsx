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
    <div className={mergeClassNames('flex flex-col gap-y-5', className)}>
      {children}
    </div>
  );
}

function Section({ title, children }: WithChildren<{ title?: string }>) {
  return (
    <div className="flex flex-col gap-y-1.5 text-xs">
      {!!title && <span className="text-text-primary">{title}</span>}
      <div className="text-text-secondary flex flex-col gap-y-1.5">
        {children}
      </div>
    </div>
  );
}

export const StakingSummary = {
  ContentContainer,
  Section,
};
