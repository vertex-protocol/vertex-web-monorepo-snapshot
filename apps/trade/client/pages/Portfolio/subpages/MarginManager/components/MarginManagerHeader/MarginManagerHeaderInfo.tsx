import {
  WithChildren,
  WithClassnames,
  joinClassNames,
} from '@vertex-protocol/web-common';
import { Card } from '@vertex-protocol/web-ui';
import { ReactNode } from 'react';

function HeaderInfoCard({ className, children }: WithChildren<WithClassnames>) {
  return (
    <Card
      className={joinClassNames(
        'flex flex-col gap-y-6 py-4 lg:gap-y-4 lg:py-6',
        className,
      )}
      insetRing
    >
      {children}
    </Card>
  );
}

function HeaderInfoMetric({
  label,
  content,
}: {
  content: ReactNode;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-y-1 px-4 lg:gap-y-2 lg:px-6">
      <div className="text-text-secondary text-xs lg:text-sm">{label}</div>
      <div className="text-text-primary text-xl lg:text-2xl">{content}</div>
    </div>
  );
}

function HeaderInfoTitle({
  className,
  title,
}: WithClassnames<{ title: string }>) {
  return (
    <div
      className={joinClassNames(
        'text-text-primary flex items-center gap-x-1.5 px-4 text-sm lg:px-6 lg:text-base',
        className,
      )}
    >
      {title}
    </div>
  );
}

const MarginManagerHeaderInfo = {
  Card: HeaderInfoCard,
  Title: HeaderInfoTitle,
  Metric: HeaderInfoMetric,
};

export { MarginManagerHeaderInfo };
