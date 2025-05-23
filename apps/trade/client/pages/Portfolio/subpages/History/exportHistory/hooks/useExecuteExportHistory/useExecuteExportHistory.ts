import { useMutation } from '@tanstack/react-query';
import { toPrintableObject } from '@vertex-protocol/utils';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { AppSubaccount } from 'client/context/subaccount/types';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import {
  useExecuteInValidContext,
  ValidExecuteContext,
} from 'client/hooks/execute/util/useExecuteInValidContext';
import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { EXPORT_HISTORY_HEADINGS_BY_TYPE } from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/consts';
import { getExportHistoryCollateralData } from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/getExportHistoryCollateralData';
import { getExportHistoryLiquidationsData } from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/getExportHistoryLiquidationsData';
import { getExportHistoryLpData } from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/getExportHistoryLpData';
import { getExportHistoryVlpData } from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/getExportHistoryVlpData';
import { getExportHistoryRealizedPnlData } from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/getExportHistoryRealizedPnlData';
import { getExportHistoryTradesData } from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/getExportHistoryTradesData';
import { getExportHistoryFundingData } from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/getExportHistoryFundingData';
import { getExportHistoryInterestData } from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/getExportHistoryInterestData';
import { GetExportHistoryDataContext } from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/types';
import { GetExportHistoryDataParams } from 'client/pages/Portfolio/subpages/History/exportHistory/types';
import {
  CsvDataItem,
  CsvFileName,
  downloadCsv,
} from 'client/utils/downloadCsv';
import { useCallback } from 'react';

/**
 * Hook to retrieve historical data and download it as a CSV
 */
export function useExecuteExportHistory(
  setProgressFrac: (frac: number) => void,
) {
  const { getSubaccountProfile } = useSubaccountContext();
  const { data: allMarketsStaticData } = useAllMarketsStaticData();
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();

  const mutationFn = useExecuteInValidContext(
    useCallback(
      async (
        params: GetExportHistoryDataParams,
        context: ValidExecuteContext,
      ) => {
        if (!allMarketsStaticData) {
          throw new Error('No market data available');
        }

        console.log('Exporting history', toPrintableObject(params));

        setProgressFrac(0);

        const getDataContext: GetExportHistoryDataContext = {
          allMarketsStaticData,
          primaryQuotePriceUsd,
          vertexClient: context.vertexClient,
          subaccount: context.subaccount,
          getSubaccountProfile,
          setProgressFrac,
        };

        const data: CsvDataItem[] = await (() => {
          switch (params.type) {
            case 'deposits':
              return getExportHistoryCollateralData(params, getDataContext);
            case 'withdrawals':
              return getExportHistoryCollateralData(params, getDataContext);
            case 'transfers':
              return getExportHistoryCollateralData(params, getDataContext);
            case 'realized_pnl':
              return getExportHistoryRealizedPnlData(params, getDataContext);
            case 'trades':
              return getExportHistoryTradesData(params, getDataContext);
            case 'lp':
              return getExportHistoryLpData(params, getDataContext);
            case 'vlp':
              return getExportHistoryVlpData(params, getDataContext);
            case 'liquidations':
              return getExportHistoryLiquidationsData(params, getDataContext);
            case 'funding':
              return getExportHistoryFundingData(params, getDataContext);
            case 'interest':
              return getExportHistoryInterestData(params, getDataContext);
          }
        })();

        setProgressFrac(1);

        downloadCsv(
          data,
          getExportHistoryCsvFileName({
            ...params,
            subaccount: context.subaccount,
          }),
          EXPORT_HISTORY_HEADINGS_BY_TYPE[params.type],
        );

        return data;
      },
      [
        allMarketsStaticData,
        getSubaccountProfile,
        primaryQuotePriceUsd,
        setProgressFrac,
      ],
    ),
  );

  return useMutation({
    mutationFn,
    onError(error, variables) {
      logExecuteError('ExportHistory', error, variables);
    },
  });
}

interface GetExportHistoryCsvFileNameParams extends GetExportHistoryDataParams {
  subaccount: AppSubaccount;
}

function getExportHistoryCsvFileName({
  subaccount: { name, address, chainEnv },
  type,
  startTimeMillis,
  endTimeMillis,
}: GetExportHistoryCsvFileNameParams): CsvFileName {
  // Last 4 chars of the address
  const addressIdentifier = address?.slice(-6);

  return `${addressIdentifier}_${name}_${chainEnv}_${type}_${startTimeMillis}_${endTimeMillis}.csv`;
}
