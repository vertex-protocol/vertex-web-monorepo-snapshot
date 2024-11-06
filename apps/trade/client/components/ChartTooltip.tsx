import {
  joinClassNames,
  mergeClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import {
  Card,
  formatTimestamp,
  TimeFormatSpecifier,
} from '@vertex-protocol/web-ui';
import { ReactNode } from 'react';

function Container({ children, className }: WithChildren<WithClassnames>) {
  return (
    <Card
      className={mergeClassNames(
        'flex flex-col gap-y-2.5 p-2.5',
        'bg-surface-1 w-40 min-w-max',
        className,
      )}
    >
      {children}
    </Card>
  );
}

interface TimestampHeaderProps {
  timestampMillis: number;
}

export function TimestampHeader({ timestampMillis }: TimestampHeaderProps) {
  return (
    <p className="text-text-secondary text-xs">
      {formatTimestamp(timestampMillis, {
        formatSpecifier: TimeFormatSpecifier.E_MMM_D_HH_12H,
      })}
    </p>
  );
}

function Items({ children }: WithChildren) {
  return <div className="flex flex-col gap-y-2">{children}</div>;
}

interface ItemProps {
  title: string;
  titleClassName?: string;
  // If a legendColorClassName ('bg-[color]') is provided, a dot
  // will be rendered to the left of the title
  legendColorClassName?: string;
  content: ReactNode;
}

function Item({
  titleClassName,
  legendColorClassName,
  title,
  content,
}: ItemProps) {
  const legendColorDot = !!legendColorClassName ? (
    <span
      className={joinClassNames('h-2 w-2 rounded-full', legendColorClassName)}
    />
  ) : null;

  return (
    <div className="text-text-primary flex flex-col gap-y-1 text-sm">
      <div className="flex items-center gap-x-1">
        {legendColorDot}
        <span
          className={joinClassNames(
            'text-text-tertiary text-xs',
            titleClassName,
          )}
        >
          {title}
        </span>
      </div>
      {content}
    </div>
  );
}

export const ChartTooltip = {
  Container,
  TimestampHeader,
  Items,
  Item,
};
