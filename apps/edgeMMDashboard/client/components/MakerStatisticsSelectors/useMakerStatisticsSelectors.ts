import { ChainEnv, TimeInSeconds } from '@vertex-protocol/client';
import { useEVMContext } from '@vertex-protocol/react-client';
import { SelectOption } from '@vertex-protocol/web-ui';
import { useAllMarkets } from 'client/hooks/query/useAllMarkets';
import { useLatestEpoch } from 'client/hooks/query/useLatestEpoch';
import { first, last, range, startCase } from 'lodash';
import { useEffect, useMemo, useState } from 'react';

export const INTERVAL_OPTIONS: SelectOption<number>[] = [
  {
    label: 'Past 15 Minutes',
    value: 15 * TimeInSeconds.MINUTE,
  },
  {
    label: 'Past 1 Hour',
    value: TimeInSeconds.HOUR,
  },
  {
    label: 'Past 4 Hours',
    value: 4 * TimeInSeconds.HOUR,
  },
  {
    label: 'Past 1 Day',
    value: TimeInSeconds.DAY,
  },
  {
    label: 'Past 2 Days',
    value: 2 * TimeInSeconds.DAY,
  },
  {
    label: 'Past 1 Week',
    value: 7 * TimeInSeconds.DAY,
  },
  {
    label: 'Past 2 Weeks',
    value: 14 * TimeInSeconds.DAY,
  },
  {
    label: 'Past 1 Month',
    value: 30 * TimeInSeconds.DAY,
  },
];

export interface UseMakerStatisticsSelectors {
  chainEnvOptions: SelectOption<ChainEnv>[];
  setPrimaryChainEnv: (value: ChainEnv) => void;
  primaryChainEnv: ChainEnv;
  productOptions: SelectOption<number>[];
  productId: number | undefined;
  setProductId: (value: number) => void;
  epochOptions: SelectOption<number>[];
  epoch: number | undefined;
  setEpoch: (value: number) => void;
  intervalOptions: SelectOption<number>[];
  interval: number;
  setInterval: (value: number) => void;
}

export function useMakerStatisticsSelectors() {
  const { data: allMarketsData } = useAllMarkets();
  const { data: latestEpochData } = useLatestEpoch();
  const { setPrimaryChainEnv, primaryChainEnv, supportedChainEnvs } =
    useEVMContext();

  const [epoch, setEpoch] = useState<number>();
  const [interval, setInterval] = useState<number>(INTERVAL_OPTIONS[3].value); // Past 1 Day as default interval.
  const [productId, setProductId] = useState<number>();

  const epochOptions = useMemo(() => {
    if (!latestEpochData) {
      return [];
    }

    // Epochs always go from 1 to latest epoch.
    const epochs = range(1, latestEpochData.epoch + 1);

    return epochs.map((epoch) => ({
      value: epoch,
      label: epoch.toString(),
    }));
  }, [latestEpochData]);

  const chainEnvOptions = useMemo(() => {
    return supportedChainEnvs.map((value) => ({
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
