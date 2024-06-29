import { Header } from '@tanstack/react-table';
import { mergeClassNames } from '@vertex-protocol/web-common';
import { Icons } from '@vertex-protocol/web-ui';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { DefinitionTooltipID } from 'client/modules/tooltips/DefinitionTooltip/definitionTooltipConfig';
import { TableCell, TableCellProps } from './TableCell';

export interface HeaderCellProps<T> extends TableCellProps {
  header: Header<T, any>;
  definitionTooltipId?: DefinitionTooltipID;
}

export function HeaderCell<T>({
  className,
  children,
  header,
  definitionTooltipId,
  ...rest
}: HeaderCellProps<T>) {
  const sortingIcon = (() => {
    if (!header?.column.getCanSort()) {
      return null;
    }
    if (header?.column.getIsSorted() === 'asc') {
      return <Icons.FaSortUp size={10} />;
    }
    if (header?.column.getIsSorted() === 'desc') {
      return <Icons.FaSortDown size={10} />;
    }
    // Unsorted
    return (
      <Icons.FaSort
        size={10}
        className="text-text-tertiary group-hover:text-text-secondary"
      />
    );
  })();

  return (
    <TableCell
      className={mergeClassNames(
        'group flex items-center gap-x-1 whitespace-nowrap',
        'text-text-secondary pointer-events-auto',
        header?.column.getCanSort()
          ? 'hover:text-text-primary cursor-pointer select-none'
          : undefined,
        className,
      )}
      onClick={header?.column.getToggleSortingHandler()}
      {...rest}
    >
      <DefinitionTooltip definitionId={definitionTooltipId}>
        {children}
      </DefinitionTooltip>
      {sortingIcon}
    </TableCell>
  );
}
