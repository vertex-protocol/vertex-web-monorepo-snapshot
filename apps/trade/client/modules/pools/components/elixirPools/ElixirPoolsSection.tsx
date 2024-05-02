import { ElixirPoolsHeader } from './ElixirPoolsHeader';
import { ElixirPoolsTable } from './ElixirPoolsTable';

export function ElixirPoolsSection() {
  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex flex-col gap-y-8">
        <ElixirPoolsHeader />
        <ElixirPoolsTable />
      </div>
      <p className="text-text-tertiary text-sm">
        Fusion is enabled for every perp and spot market.
      </p>
    </div>
  );
}
