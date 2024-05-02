import { Header } from '@tanstack/react-table';
import { WithChildren, WithClassnames } from '@vertex-protocol/web-common';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';

interface Props<T> extends WithClassnames, WithChildren {
  header: Header<T, any>;
}

export function TitleHeaderCell<T>({ header, children }: Props<T>) {
  return (
    <HeaderCell header={header}>
      <div className="text-text-primary text-sm">{children}</div>
    </HeaderCell>
  );
}
