import { SENSITIVE_DATA } from 'common/environment/sensitiveData';
import { BrandName } from 'common/environment/types';

export const WALLETCONNECT_PROJECT_ID_BY_BRAND_NAME: Record<BrandName, string> =
  {
    vertex: SENSITIVE_DATA.walletConnectProjectId.vertex,
    blitz: SENSITIVE_DATA.walletConnectProjectId.blitz,
  };
