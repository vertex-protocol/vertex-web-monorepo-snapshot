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
        'min-w-48 border-0',
        'shadow-chart-tooltip bg-background',
        'flex flex-col gap-y-2 p-3',
        className,
      )}
    >
      {children}
    </Card>
  );
}

function Header({ children }: WithChildren) {
  return (
    <span className="text-text-primary text-xs font-semibold">{children}</span>
  );
}

interface TimestampHeaderProps {
  currentTimestampMillis: number;
  earlierTimestampMillis: number;
}

export function TimestampHeader({
  currentTimestampMillis,
  earlierTimestampMillis,
}: TimestampHeaderProps) {
  return (
    <Header>
      {formatTimestamp(earlierTimestampMillis, {
        formatSpecifier: TimeFormatSpecifier.MONTH_D,
      })}
      {' - '}
      {formatTimestamp(currentTimestampMillis, {
        formatSpecifier: TimeFormatSpecifier.MONTH_D,
      })}
    </Header>
  );
}

interface RowLabelProps {
  label: ReactNode;
  labelClassName?: string;
  legendColor?: string;
}

function RowLabel({ labelClassName, legendColor, label }: RowLabelProps) {
  return (
    <div className="text-text-primary flex items-center gap-x-1">
      {legendColor && (
        <span
          style={{ backgroundColor: legendColor }}
          className="size-1.5 rounded-full"
        />
      )}
      <span className={joinClassNames('text-text-tertiary', labelClassName)}>
        {label}
      </span>
    </div>
  );
}

function Row({ children, className }: WithChildren<WithClassnames>) {
  return (
    <div
      className={joinClassNames(
        'flex items-center justify-between gap-x-2 font-medium',
        'text-text-primary text-xs',
        className,
      )}
    >
      {children}
    </div>
  );
}

export const ChartTooltip = {
  Header,
  Container,
  TimestampHeader,
  Row,
  RowLabel,
};
