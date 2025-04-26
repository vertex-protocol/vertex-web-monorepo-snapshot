import { useMemo } from 'react';
import { useQueryVlpSnapshots } from '@vertex-protocol/react-client';
import { first, last } from 'lodash';
import { TimeInSeconds } from '@vertex-protocol/client';

/**
 * This queries latest/earliest snapshots for 7d period.
 * This is the period currently used for APR calculation.
 */
export function useVlp7dSnapshots() {
  const { data, ...rest } = useQueryVlpSnapshots({
    granularity: 7 * TimeInSeconds.DAY,
    limit: 2,
  });

  const mappedData = useMemo(() => {
    if (!data) {
      return;
    }

    const latest = first(data.snapshots);
    const earliest = last(data.snapshots);
    if (!latest || !earliest) {
      return undefined;
    }

    return {
      latest,
      earliest,
    };
  }, [data]);

  return {
    data: mappedData,
    ...rest,
  };
}
