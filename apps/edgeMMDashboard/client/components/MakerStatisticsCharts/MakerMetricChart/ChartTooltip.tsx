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
  return <div className="flex flex-col gap-y-1.5">{children}</div>;
}

interface ItemProps {
  title: string;
  titleClassName?: string;
  legendColor?: string;
  content: ReactNode;
}

function Item({ titleClassName, legendColor, title, content }: ItemProps) {
  return (
    <div className="text-text-primary flex justify-between gap-x-2.5 text-xs">
      <div className="flex items-center gap-x-1">
        {legendColor && (
          <span
            style={{ backgroundColor: legendColor }}
            className="size-2 rounded-full"
          />
        )}
        <span className={joinClassNames('text-text-tertiary', titleClassName)}>
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
