import { BigDecimal, removeDecimals } from '@vertex-protocol/client';
import { useQueryVlpSnapshots } from '@vertex-protocol/react-client';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { first, last } from 'lodash';
import {
  VLP_OVERVIEW_CARD_TIMESPAN_METADATA,
  VlpOverviewCardTimespan,
} from 'client/pages/Vlp/components/VlpOverviewCard/vlpOverviewCardTimespan';
import { useMemo } from 'react';

interface Params {
  timespan: VlpOverviewCardTimespan;
}

interface Data {
  pnl?: BigDecimal;
  volume?: BigDecimal;
  totalDepositors?: BigDecimal;
}

export function useVlpOverviewCard({ timespan }: Params): Data {
  const { data: vlpSnapshots } = useQueryVlpSnapshots({
    granularity:
      VLP_OVERVIEW_CARD_TIMESPAN_METADATA[timespan].durationInSeconds,
    limit: 2,
  });
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();

  return (
    useMemo(() => {
      const latest = first(vlpSnapshots?.snapshots);
      const earliest = last(vlpSnapshots?.snapshots);
      if (!latest || !earliest) {
        return undefined;
      }

      const pnl = removeDecimals(
        latest.cumulativePnl.minus(earliest.cumulativePnl),
      ).multipliedBy(primaryQuotePriceUsd);

      const volume = removeDecimals(
        latest.cumulativeVolume.minus(earliest.cumulativeVolume),
      ).multipliedBy(primaryQuotePriceUsd);

      const totalDepositors = latest.depositors;

      return {
        pnl,
        volume,
        totalDepositors,
      };
    }, [vlpSnapshots, primaryQuotePriceUsd]) ?? {}
  );
}
