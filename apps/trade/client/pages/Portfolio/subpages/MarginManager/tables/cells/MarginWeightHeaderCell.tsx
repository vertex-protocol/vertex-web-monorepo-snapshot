import { Header } from '@tanstack/react-table';
import { WithChildren, WithClassnames } from '@vertex-protocol/web-common';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';

interface Props<T> extends WithClassnames, WithChildren {
  header: Header<T, any>;
  isInitial: boolean;
}

export function MarginWeightHeaderCell<T>({ header, isInitial }: Props<T>) {
  const weightLabel = isInitial ? 'Init. Weight' : 'Maint. Weight';

  return (
    <HeaderCell header={header}>
      <div className="flex items-center gap-x-1.5">
        {weightLabel}
        <span className="text-disabled text-base">/</span>
        Margin
      </div>
    </HeaderCell>
  );
}
