import { BRAND_METADATA_BY_BRAND_NAME } from 'common/brandMetadata/brandMetadataByBrandName';
import { BrandMetadata } from 'common/brandMetadata/types';
import { baseClientEnv, BaseClientEnv } from 'common/environment/baseClientEnv';
import { GOOGLE_ANALYTICS_ID_BY_BRAND_NAME } from 'common/environment/integrations/googleAnalyticsIdByBrandName';
import { WALLETCONNECT_PROJECT_ID_BY_BRAND_NAME } from 'common/environment/integrations/walletConnectProjectIdByBrandName';

export interface ClientEnv {
  base: BaseClientEnv;
  brandMetadata: BrandMetadata;
  integrations: {
    walletConnectProjectId: string;
    googleAnalyticsId: string;
  };
}

export const clientEnv: ClientEnv = {
  base: baseClientEnv,
  brandMetadata: BRAND_METADATA_BY_BRAND_NAME[baseClientEnv.brandName],
  integrations: {
    walletConnectProjectId:
      WALLETCONNECT_PROJECT_ID_BY_BRAND_NAME[baseClientEnv.brandName],
    googleAnalyticsId:
      GOOGLE_ANALYTICS_ID_BY_BRAND_NAME[baseClientEnv.brandName],
  },
};
