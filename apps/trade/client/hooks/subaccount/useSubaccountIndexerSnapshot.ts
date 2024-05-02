import { useMemo } from 'react';
import { useSubaccountIndexerSnapshots } from 'client/hooks/query/subaccount/useSubaccountIndexerSnapshots';
import { IndexerSubaccountSnapshot } from '@vertex-protocol/indexer-client';
import { first } from 'lodash';

function select(
  data: IndexerSubaccountSnapshot[],
): IndexerSubaccountSnapshot | undefined {
  return first(data);
}

// useSubaccountIndexerSnapshots but for a single snapshot timestamp
export function useSubaccountIndexerSnapshot(secondsBeforeNow: number = 0) {
  const multiSecondsBeforeNow = useMemo(
    () => [secondsBeforeNow],
    [secondsBeforeNow],
  );

  return useSubaccountIndexerSnapshots({
    secondsBeforeNow: multiSecondsBeforeNow,
    select,
  });
}
