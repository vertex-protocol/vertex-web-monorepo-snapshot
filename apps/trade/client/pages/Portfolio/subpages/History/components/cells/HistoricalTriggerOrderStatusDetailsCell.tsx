import { TriggerOrderStatus } from '@vertex-protocol/trigger-client/src/types/clientTypes';
import { joinClassNames } from '@vertex-protocol/web-common';
import { BaseDefinitionTooltip, Icons } from '@vertex-protocol/web-ui';
import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';
import { upperFirst } from 'lodash';

interface Props extends TableCellProps {
  status: TriggerOrderStatus;
}

export function HistoricalTriggerOrderStatusDetailsCell({
  status,
  className,
  ...rest
}: Props) {
  // Derive status message
  const statusMessage = (() => {
    switch (status.type) {
      case 'cancelled':
        // This is a snakecase rust enum
        return status.reason.split('_').join(' ');
      case 'triggered':
        return status.result.status;
      case 'internal_error':
        return status.error;
      case 'pending':
        // This case shouldn't ever happen
        return 'pending';
    }
  })();

  // Show a detailed tooltip with the failure message if the trigger order was sent to the matching engine, but subsequently failed
  const triggerExecuteFailureMessage = (() => {
    if (status.type !== 'triggered' || status.result.status !== 'failure') {
      return;
    }

    return `Error Code ${status.result.error_code}: ${status.result.error}`;
  })();

  return (
    <TableCell
      className={joinClassNames('pointer-events-auto', className)}
      {...rest}
    >
      <div className="flex items-center gap-x-2">
        <span>{upperFirst(statusMessage)}</span>
        {triggerExecuteFailureMessage && (
          <BaseDefinitionTooltip
            title=""
            content={triggerExecuteFailureMessage}
            tooltipOptions={{
              placement: 'auto',
            }}
          >
            <Icons.Info size={16} className="text-text-tertiary" />
          </BaseDefinitionTooltip>
        )}
      </div>
    </TableCell>
  );
}
