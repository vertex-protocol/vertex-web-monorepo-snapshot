import { BRAND_METADATA_BY_BRAND_NAME } from 'common/brandMetadata/brandMetadataByBrandName';
import { BrandMetadata } from 'common/brandMetadata/types';
import { baseClientEnv, BaseClientEnv } from 'common/environment/baseClientEnv';
import { FUNKIT_API_KEY_BY_BRAND_NAME } from 'common/environment/integrations/funkitApiKeyByBrandName';
import { GOOGLE_ANALYTICS_ID_BY_BRAND_NAME } from 'common/environment/integrations/googleAnalyticsIdByBrandName';
import { MICROSOFT_CLARITY_ANALYTICS_ID_BY_BRAND_NAME } from 'common/environment/integrations/microsoftClarityAnalyticsByBrandName';
import { WALLETCONNECT_PROJECT_ID_BY_BRAND_NAME } from 'common/environment/integrations/walletConnectProjectIdByBrandName';

export interface ClientEnv {
  base: BaseClientEnv;
  brandMetadata: BrandMetadata;
  isTestnetDataEnv: boolean;
  integrations: {
    walletConnectProjectId: string;
    googleAnalyticsId: string;
    microsoftClarityAnalytics: string;
    funkitApiKey: string;
  };
}

const isTestnetDataEnv = {
  local: true,
  vertexTestnet: true,
  blitzTestnet: true,
  vertexMainnet: false,
  blitzMainnet: false,
}[baseClientEnv.dataEnv];

export const clientEnv: ClientEnv = {
  base: baseClientEnv,
  isTestnetDataEnv,
  brandMetadata: BRAND_METADATA_BY_BRAND_NAME[baseClientEnv.brandName],
  integrations: {
    walletConnectProjectId:
      WALLETCONNECT_PROJECT_ID_BY_BRAND_NAME[baseClientEnv.brandName],
    googleAnalyticsId:
      GOOGLE_ANALYTICS_ID_BY_BRAND_NAME[baseClientEnv.brandName],
    microsoftClarityAnalytics:
      MICROSOFT_CLARITY_ANALYTICS_ID_BY_BRAND_NAME[baseClientEnv.brandName],
    funkitApiKey: FUNKIT_API_KEY_BY_BRAND_NAME[baseClientEnv.brandName],
  },
};
