import { WithChildren } from '@vertex-protocol/web-common';

export function TradingCompetitionInfoCards({ children }: WithChildren) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">{children}</div>
  );
}
