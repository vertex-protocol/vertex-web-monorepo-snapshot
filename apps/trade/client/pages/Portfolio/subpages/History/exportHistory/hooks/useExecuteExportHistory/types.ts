import BigDecimal from 'bignumber.js';
import { ValidExecuteContext } from 'client/hooks/execute/util/useExecuteInValidContext';
import { AllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';

/**
 * Context for export history util functions. Provides any necessary data to map historical events to expected export format.
 */
export interface GetExportHistoryDataContext
  extends Pick<ValidExecuteContext, 'vertexClient' | 'subaccount'> {
  allMarketsStaticData: AllMarketsStaticData;
  primaryQuotePriceUsd: BigDecimal;
}
