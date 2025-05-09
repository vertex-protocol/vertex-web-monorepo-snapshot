import {
  WithChildren,
  WithClassnames,
  joinClassNames,
} from '@vertex-protocol/web-common';

function AccentText({ children, className }: WithClassnames<WithChildren>) {
  return (
    <span className={joinClassNames('text-accent', className)}>{children}</span>
  );
}

function Title({ children, className }: WithClassnames<WithChildren>) {
  return (
    <div className={joinClassNames('text-text-primary', className)}>
      {children}
    </div>
  );
}

function Description({ children, className }: WithClassnames<WithChildren>) {
  return <div className={className}>{children}</div>;
}

function InfoCard({ children, className }: WithChildren<WithClassnames>) {
  return (
    <div
      className={joinClassNames('bg-overlay-accent rounded-xl p-3', className)}
    >
      <div className="text-accent">{children}</div>
    </div>
  );
}

function InfoPill({ children, className }: WithChildren<WithClassnames>) {
  return (
    <div
      className={joinClassNames(
        'rounded-3xl px-4 py-1 text-xs whitespace-nowrap',
        'text-text-primary bg-overlay-accent',
        className,
      )}
    >
      {children}
    </div>
  );
}

function ContentContainer({
  children,
  className,
}: WithChildren<WithClassnames>) {
  return (
    <div
      className={joinClassNames(
        'text-text-secondary flex flex-col gap-y-6 pb-2 text-sm lg:gap-y-8',
        className,
      )}
    >
      {children}
    </div>
  );
}

function Section({ children, className }: WithChildren<WithClassnames>) {
  return (
    <div className={joinClassNames('flex flex-col gap-y-3', className)}>
      {children}
    </div>
  );
}

export const MarginManagerDefinition = {
  ContentContainer,
  Section,
  Title,
  Description,
  InfoCard,
  InfoPill,
  AccentText,
};
