import { WithChildren, joinClassNames } from '@vertex-protocol/web-common';
import { ReactNode } from 'react';

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
  const legendColorDot = (() => {
    if (!legendColorClassName) {
      return null;
    }
    return (
      <span
        className={joinClassNames('h-1 w-1 rounded-full', legendColorClassName)}
      />
    );
  })();

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

function Container({ children }: WithChildren) {
  return <div className="flex flex-col gap-y-2">{children}</div>;
}

export const PortfolioChartTooltipContent = {
  Container,
  Item,
};
