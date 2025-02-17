import { Header } from '@tanstack/react-table';
import { CloseAllPositionsButton } from 'client/components/ActionButtons/CloseAllPositionsButton';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';

export function CloseAllPositionsHeaderCell<T>({
  header,
}: {
  header: Header<T, any>;
}) {
  return (
    <HeaderCell header={header} className="flex justify-end px-4">
      <CloseAllPositionsButton />
    </HeaderCell>
  );
}
