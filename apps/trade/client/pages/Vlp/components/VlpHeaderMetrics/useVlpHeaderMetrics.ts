import { safeDiv } from '@vertex-protocol/web-common';
import { useMemo } from 'react';
import { useVlp7dSnapshots } from 'client/pages/Vlp/hooks/useVlp7dSnapshots';
import { BigDecimal } from '@vertex-protocol/client';

interface Data {
  tvl?: BigDecimal;
  apr?: BigDecimal;
}

export function useVlpHeaderMetrics(): Data {
  const { data: snapshots } = useVlp7dSnapshots();

  return (
    useMemo(() => {
      const latest = snapshots?.latest;
      const earliest = snapshots?.earliest;
      if (!latest || !earliest) {
        return undefined;
      }

      return {
        tvl: latest.tvl,
        apr: safeDiv(latest.oraclePrice, earliest.oraclePrice).minus(1),
      };
    }, [snapshots]) ?? {}
  );
}
