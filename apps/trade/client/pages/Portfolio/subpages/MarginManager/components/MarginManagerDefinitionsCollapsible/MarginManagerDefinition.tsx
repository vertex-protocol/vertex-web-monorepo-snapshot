import {
  WithChildren,
  WithClassnames,
  joinClassNames,
} from '@vertex-protocol/web-common';
import NextImage, { ImageProps } from 'next/image';

export function GradientText({
  children,
  className,
}: WithClassnames<WithChildren>) {
  return (
    <span className={joinClassNames('text-accent font-medium', className)}>
      {children}
    </span>
  );
}

function Title({ children, className }: WithClassnames<WithChildren>) {
  return (
    <div className={joinClassNames('text-text-primary font-medium', className)}>
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
      className={joinClassNames(
        'bg-overlay-accent/5 rounded-xl p-3',
        className,
      )}
    >
      <div className="text-accent">{children}</div>
    </div>
  );
}

function Pill({ children, className }: WithChildren<WithClassnames>) {
  return (
    <div
      className={joinClassNames(
        'text-text-primary bg-overlay-accent/20 whitespace-nowrap rounded-3xl px-4 py-1 text-xs',
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

function Image({ className, ...rest }: WithClassnames<ImageProps>) {
  return (
    <div
      className={joinClassNames(
        'bg-surface-card ring-stroke shrink-0 overflow-hidden rounded-lg ring-2',
        className,
      )}
    >
      <NextImage {...rest} className={className} />
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
  Pill,
  Image,
  GradientText,
};
