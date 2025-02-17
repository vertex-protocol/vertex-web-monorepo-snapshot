import {
  joinClassNames,
  mergeClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { Card, Spinner } from '@vertex-protocol/web-ui';
import { ReactNode } from 'react';

export interface StatsDataCardProps<TData>
  extends WithChildren,
    WithClassnames {
  title: string;
  description: string;
  contentClassName?: string;
  headerEndElement?: ReactNode;
  data: TData[] | undefined;
  isLoading: boolean;
}

export function StatsDataCard<TData>({
  className,
  description,
  headerEndElement,
  title,
  data,
  isLoading,
  contentClassName,
  children,
}: StatsDataCardProps<TData>) {
  const content = (() => {
    // Show loading spinner if loading or data not available yet.
    if (data == null || isLoading) {
      return <Spinner />;
    }

    // Show message if there is no data available
    if (data?.length === 0) {
      return <div className="text-text-tertiary">No data available</div>;
    }

    return children;
  })();

  return (
    <Card
      className={joinClassNames(
        'flex min-h-96 flex-col gap-3',
        'p-3 sm:px-5 sm:py-4',
        className,
      )}
    >
      <CardHeader
        title={title}
        description={description}
        headerEndElement={headerEndElement}
      />
      <div
        className={mergeClassNames(
          'flex flex-1 items-center justify-center',
          contentClassName,
        )}
      >
        {content}
      </div>
    </Card>
  );
}

function CardHeader({
  title,
  description,
  headerEndElement,
}: {
  title: string;
  description: string;
  headerEndElement: ReactNode;
}) {
  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex flex-col gap-y-0.5">
        <div className="text-text-primary text-sm font-semibold">{title}</div>
        <p className="text-text-secondary text-xs font-medium sm:text-sm">
          {description}
        </p>
      </div>
      {headerEndElement}
    </div>
  );
}
