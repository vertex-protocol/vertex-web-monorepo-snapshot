import { useMutation } from '@tanstack/react-query';
import { toPrintableObject } from '@vertex-protocol/utils';
import { logExecuteError } from 'client/hooks/execute/util/logExecuteError';
import {
  useExecuteInValidContext,
  ValidExecuteContext,
} from 'client/hooks/execute/util/useExecuteInValidContext';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { EXPORT_HISTORY_HEADINGS_BY_TYPE } from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/consts';
import { getExportHistoryCollateralData } from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/getExportHistoryCollateralData';
import { getExportHistoryLiquidationsData } from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/getExportHistoryLiquidationsData';
import { getExportHistoryLpData } from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/getExportHistoryLpData';
import { getExportHistoryRealizedPnlData } from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/getExportHistoryRealizedPnlData';
import { getExportHistoryTradesData } from 'client/pages/Portfolio/subpages/History/exportHistory/hooks/useExecuteExportHistory/getExportHistoryTradesData';
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
export function useExecuteExportHistory() {
  const { data: allMarketsStaticData } = useAllMarketsStaticData();
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();

  const mutationFn = useExecuteInValidContext(
    useCallback(
      async (
        params: GetExportHistoryDataParams,
        context: ValidExecuteContext,
      ) => {
        if (!allMarketsStaticData) {
          throw Error('No market data available');
        }

        console.log('Exporting history', toPrintableObject(params));

        const getDataContext: GetExportHistoryDataContext = {
          allMarketsStaticData,
          primaryQuotePriceUsd,
          vertexClient: context.vertexClient,
          subaccount: context.subaccount,
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
            case 'liquidations':
              return getExportHistoryLiquidationsData(params, getDataContext);
          }
        })();

        downloadCsv(
          data,
          getExportHistoryCsvFileName(params),
          EXPORT_HISTORY_HEADINGS_BY_TYPE[params.type],
        );

        return data;
      },
      [allMarketsStaticData, primaryQuotePriceUsd],
    ),
  );

  return useMutation({
    mutationFn,
    onError(error, variables) {
      logExecuteError('ExportHistory', error, variables);
    },
  });
}

function getExportHistoryCsvFileName({
  type,
  startTimeMillis,
  endTimeMillis,
}: GetExportHistoryDataParams): CsvFileName {
  return `${type}_${startTimeMillis}_${endTimeMillis}.csv`;
}
