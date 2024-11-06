import { joinClassNames } from '@vertex-protocol/web-common';
import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';
import { EpochRewardsTableData } from 'client/pages/VertexRewards/components/cards/VrtxCollapsibleSummaryCard/EpochRewardsTable/useEpochRewardsTable';

type Props = TableCellProps &
  Pick<EpochRewardsTableData, 'epochNumber' | 'isCurrent' | 'isInitialPhase'>;

export function EpochNameCell({
  isCurrent,
  epochNumber,
  isInitialPhase,
  className,
  ...rest
}: Props) {
  const { name, phase } = (() => {
    if (isCurrent) {
      return { name: `Epoch ${epochNumber}`, phase: 'Current' };
    }
    return {
      name: `Epoch ${epochNumber}`,
      phase: isInitialPhase ? 'Initial' : 'Emissions',
    };
  })();

  return (
    <TableCell
      className={joinClassNames(
        'flex flex-col items-start justify-center gap-y-1',
        className,
      )}
      {...rest}
    >
      <span>{name}</span>
      <span
        className={joinClassNames(
          isCurrent ? 'text-accent' : 'text-text-tertiary',
        )}
      >
        {phase}
      </span>
    </TableCell>
  );
}
