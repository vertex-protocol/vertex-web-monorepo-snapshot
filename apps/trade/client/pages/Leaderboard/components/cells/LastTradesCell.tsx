import { BigDecimal } from '@vertex-protocol/client';
import { joinClassNames } from '@vertex-protocol/web-common';
import { TableCell } from 'client/components/DataTable/cells/TableCell';
import { signDependentValue } from 'client/utils/signDependentValue';

export function LastTradesCell({
  lastTradesPnl,
}: {
  lastTradesPnl: BigDecimal[];
}) {
  return (
    <TableCell className="flex gap-x-0.5">
      {lastTradesPnl.map((tradePnl, index) => {
        return (
          <div
            key={index}
            className={joinClassNames(
              'size-3 rounded-full',
              signDependentValue(tradePnl, {
                positive: 'bg-positive',
                negative: 'bg-negative',
                zero: 'bg-surface-1',
              }),
            )}
          />
        );
      })}
    </TableCell>
  );
}
