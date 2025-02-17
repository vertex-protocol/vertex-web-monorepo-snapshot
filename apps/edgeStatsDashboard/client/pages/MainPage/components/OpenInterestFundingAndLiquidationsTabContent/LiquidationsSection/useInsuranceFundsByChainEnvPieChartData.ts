import { ChainEnv } from '@vertex-protocol/client';
import { getChainEnvName } from '@vertex-protocol/react-client';
import { nonNullFilter } from '@vertex-protocol/web-common';
import { useQueryEdgeInsuranceFunds } from 'client/hooks/query/useQueryEdgeInsuranceFunds';
import { usePrimaryQuotePriceUsd } from 'client/hooks/usePrimaryQuotePriceUsd';
import { calcDecimalAdjustedUsdValue } from 'client/utils/calcDecimalAdjustedUsdValue';
import { sumBy } from 'lodash';
import { useMemo } from 'react';

export function useInsuranceFundsByChainEnvPieChartData() {
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();
  const {
    data: edgeInsuranceFundsData,
    isLoading: isLoadingInsuranceFundsData,
  } = useQueryEdgeInsuranceFunds();

  const mappedData = useMemo(() => {
    if (!edgeInsuranceFundsData) {
      return;
    }

    const insuranceFundsByChainEnvUsd = Object.entries(edgeInsuranceFundsData)
      .map(([chainEnv, insuranceFunds]) => {
        const insuranceFundsUsd = calcDecimalAdjustedUsdValue(
          insuranceFunds,
          primaryQuotePriceUsd,
        );

        if (!insuranceFundsUsd) {
          return;
        }

        return {
          name: getChainEnvName(chainEnv as ChainEnv),
          value: insuranceFundsUsd.toNumber(),
        };
      })
      .filter(nonNullFilter);

    const edgeTotalInsuranceFundsUsd = sumBy(
      insuranceFundsByChainEnvUsd,
      ({ value }) => value,
    );

    return { edgeTotalInsuranceFundsUsd, insuranceFundsByChainEnvUsd };
  }, [edgeInsuranceFundsData, primaryQuotePriceUsd]);

  return { data: mappedData, isLoading: isLoadingInsuranceFundsData };
}
