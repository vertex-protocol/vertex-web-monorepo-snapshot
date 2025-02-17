import { Header } from '@tanstack/react-table';
import { WithChildren, WithClassnames } from '@vertex-protocol/web-common';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';

interface Props<T> extends WithClassnames, WithChildren {
  header: Header<T, any>;
  isInitial: boolean;
  // Label for the Margin sub-column. Defaults to "Margin"
  marginLabel?: string;
}

export function MarginWeightHeaderCell<T>({
  header,
  isInitial,
  marginLabel = 'Margin',
}: Props<T>) {
  const weightLabel = isInitial ? 'Init. Weight' : 'Maint. Weight';

  return (
    <HeaderCell header={header}>
      <div className="flex items-center gap-x-1.5">
        {weightLabel}
        <span className="text-disabled text-base">/</span>
        {marginLabel}
      </div>
    </HeaderCell>
  );
}
