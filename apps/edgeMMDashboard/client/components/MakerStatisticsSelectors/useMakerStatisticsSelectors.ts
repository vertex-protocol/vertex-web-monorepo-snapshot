import { ChainEnv, TimeInSeconds } from '@vertex-protocol/client';
import { useEVMContext } from '@vertex-protocol/react-client';
import { SelectOption } from '@vertex-protocol/web-ui';
import { useAllMarkets } from 'client/hooks/query/useAllMarkets';
import { useEpochs } from 'client/hooks/query/useEpochs';
import { first, last, sortBy, startCase } from 'lodash';
import { useEffect, useMemo, useState } from 'react';

export const INTERVAL_OPTIONS = [
  {
    id: 'past_15_minutes',
    label: 'Past 15 Minutes',
    value: 15 * TimeInSeconds.MINUTE,
  },
  {
    id: 'past_1_hour',
    label: 'Past 1 Hour',
    value: TimeInSeconds.HOUR,
  },
  {
    id: 'past_4_hours',
    label: 'Past 4 Hours',
    value: 4 * TimeInSeconds.HOUR,
  },
  {
    id: 'past_1_day',
    label: 'Past 1 Day',
    value: TimeInSeconds.DAY,
  },
  {
    id: 'past_2_days',
    label: 'Past 2 Days',
    value: 2 * TimeInSeconds.DAY,
  },
  {
    id: 'past_1_week',
    label: 'Past 1 Week',
    value: 7 * TimeInSeconds.DAY,
  },
  {
    id: 'past_2_weeks',
    label: 'Past 2 Weeks',
    value: 14 * TimeInSeconds.DAY,
  },
  {
    id: 'past_1_month',
    label: 'Past 1 Month',
    value: 30 * TimeInSeconds.DAY,
  },
];

export interface UseMakerStatisticsSelectors {
  chainEnvOptions: SelectOption<string, ChainEnv>[];
  setPrimaryChainEnv: (value: ChainEnv) => void;
  primaryChainEnv: ChainEnv;
  productOptions: SelectOption<string, number>[];
  productId: number | undefined;
  setProductId: (value: number) => void;
  epochOptions: SelectOption<string, number>[];
  epoch: number | undefined;
  setEpoch: (value: number) => void;
  intervalOptions: SelectOption<string, number>[];
  interval: number;
  setInterval: (value: number) => void;
}

export function useMakerStatisticsSelectors() {
  const { data: allMarketsData } = useAllMarkets();
  const { data: epochsData } = useEpochs();
  const { setPrimaryChainEnv, primaryChainEnv, supportedChainEnvs } =
    useEVMContext();

  const [epoch, setEpoch] = useState<number>();
  const [interval, setInterval] = useState<number>(INTERVAL_OPTIONS[0].value);
  const [productId, setProductId] = useState<number>();

  const epochOptions = useMemo(() => {
    if (!epochsData) {
      return [];
    }
    return sortBy(
      epochsData?.map(({ epoch }) => ({
        id: epoch.toString(),
        value: epoch,
        label: epoch.toString(),
      })),
      ({ value }) => value,
    );
  }, [epochsData]);

  const chainEnvOptions = useMemo(() => {
    return supportedChainEnvs.map((value) => ({
      id: value,
      value,
      label: startCase(value),
    }));
  }, [supportedChainEnvs]);

  const productOptions = useMemo(() => {
    if (!allMarketsData) {
      return [];
    }
    return Object.entries(allMarketsData.allMarkets).map(
      ([productId, market]) => ({
        id: productId,
        value: Number(productId),
        label: market.metadata.marketName,
      }),
    );
  }, [allMarketsData]);

  // Set default values for epoch and product
  useEffect(() => {
    setEpoch((prevEpoch) =>
      // If epoch is already set, keep it, otherwise set to the last epoch
      prevEpoch ? prevEpoch : last(epochOptions)?.value,
    );

    setProductId((prevProductId) =>
      // If product is already set, keep it, otherwise set to the first product
      prevProductId != null ? prevProductId : first(productOptions)?.value,
    );
  }, [epochOptions, productOptions]);

  // Reset epoch and product when chain env changes, which above effect to set default values
  useEffect(() => {
    setEpoch(undefined);
    setProductId(undefined);
  }, [primaryChainEnv]);

  return {
    epochOptions,
    epoch,
    setEpoch,
    intervalOptions: INTERVAL_OPTIONS,
    interval,
    setInterval,
    productOptions,
    productId,
    setProductId,
    chainEnvOptions,
    setPrimaryChainEnv,
    primaryChainEnv,
  };
}
