import { BigDecimal } from '@vertex-protocol/client';

import { ValidExecuteContext } from 'client/hooks/execute/util/useExecuteInValidContext';
import { AllMarketsStaticDataForChainEnv } from 'client/hooks/markets/marketsStaticData/types';

import { SubaccountProfile } from 'client/modules/subaccounts/types';

/**
 * Context for export history util functions. Provides any necessary data to map historical events to expected export format.
 */
export interface GetExportHistoryDataContext
  extends Pick<ValidExecuteContext, 'vertexClient' | 'subaccount'> {
  allMarketsStaticData: AllMarketsStaticDataForChainEnv;
  primaryQuotePriceUsd: BigDecimal;
  getSubaccountProfile: (subaccountName: string) => SubaccountProfile;
  setProgressFrac: (frac: number) => void;
}
