import { SENSITIVE_DATA } from 'common/environment/sensitiveData';
import { BrandName } from 'common/environment/types';

export const FUNKIT_API_KEY_BY_BRAND_NAME: Record<BrandName, string> = {
  vertex: SENSITIVE_DATA.funkitApiKey.vertex,
  blitz: SENSITIVE_DATA.funkitApiKey.blitz,
};
