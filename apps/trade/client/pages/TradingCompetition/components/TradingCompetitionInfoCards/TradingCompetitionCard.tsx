import {
  WithChildren,
  WithClassnames,
  joinClassNames,
} from '@vertex-protocol/web-common';
import { Card } from '@vertex-protocol/web-ui';

export function TradingCompetitionCard({
  children,
  className,
}: WithChildren<WithClassnames>) {
  return (
    <Card className={joinClassNames('flex p-4', className)}>{children}</Card>
  );
}
