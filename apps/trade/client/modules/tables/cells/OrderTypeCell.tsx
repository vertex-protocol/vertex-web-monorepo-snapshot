import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';
import { MarginModeType } from 'client/modules/localstorage/userSettings/types/tradingSettings';
import { OrderType } from 'client/modules/trading/types';
import { getOrderTypeLabel } from 'client/modules/trading/utils/getOrderTypeLabel';

interface Props extends TableCellProps {
  orderType: OrderType;
  marginModeType: MarginModeType;
}

export function OrderTypeCell({
  orderType,
  marginModeType,
  className,
}: WithClassnames<Props>) {
  const orderTypeColor = (() => {
    switch (orderType) {
      case 'stop_loss':
        return 'text-negative';
      case 'take_profit':
        return 'text-positive';
      default:
        return '';
    }
  })();

  return (
    <TableCell
      className={joinClassNames(
        'text-text-tertiary whitespace-normal text-xs',
        className,
      )}
    >
      <div className="flex flex-col">
        <span className="capitalize">{marginModeType}</span>
        <span className={orderTypeColor}>{getOrderTypeLabel(orderType)}</span>
      </div>
    </TableCell>
  );
}
