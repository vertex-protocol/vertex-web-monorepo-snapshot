import { joinClassNames } from '@vertex-protocol/web-common';
import { Card, CardProps } from '@vertex-protocol/web-ui';
import { forwardRef } from 'react';

export const TradingCard = forwardRef<HTMLDivElement, CardProps>(
  function TradingCard({ className, children, ...cardProps }, ref) {
    return (
      <Card
        className={joinClassNames('bg-surface-card', className)}
        ref={ref}
        {...cardProps}
      >
        {children}
      </Card>
    );
  },
);
