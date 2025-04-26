import { SENSITIVE_DATA } from 'common/environment/sensitiveData';
import { BrandName } from 'common/environment/types';

export const GOOGLE_ANALYTICS_ID_BY_BRAND_NAME: Record<BrandName, string> = {
  vertex: SENSITIVE_DATA.googleAnalyticsId.vertex,
  blitz: SENSITIVE_DATA.googleAnalyticsId.blitz,
};
