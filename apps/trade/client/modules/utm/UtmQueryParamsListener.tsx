import { useEVMContext } from '@vertex-protocol/react-client';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { UtmCampaignID } from 'client/modules/utm/dialogs/UtmCampaignDialog/UtmCampaignDialog';
import { clientEnv } from 'common/environment/clientEnv';
import { BrandName } from 'common/environment/types';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const UTM_QUERY_PARAM = 'spdl';

const ENABLED_BRANDS_BY_CAMPAIGN: Record<UtmCampaignID, BrandName[]> = {
  rainbow: ['vertex'],
  cielo: ['vertex'],
  rubix: ['vertex'],
};

/**
 * Listens for UTM query params and shows the UTM campaign dialog if the user is disconnected
 * and the campaign is enabled for the current brand.
 *
 * There is an edge-case where a user has a previously stored connection when clicking a link with a UTM query param,
 * the dialog will not be shown until they disconnect. This should be rare since UTM links are targeted at new users.
 */
export function UtmQueryParamsListener() {
  const { show } = useDialog();
  const { connectionStatus } = useEVMContext();
  const searchParams = useSearchParams();

  const campaignId = searchParams.get(UTM_QUERY_PARAM) as UtmCampaignID;

  useEffect(() => {
    if (
      // Only show the dialog if the user is disconnected
      connectionStatus.type === 'disconnected' &&
      // Only show the dialog if the campaign is enabled for the current brand
      ENABLED_BRANDS_BY_CAMPAIGN[campaignId]?.includes(clientEnv.base.brandName)
    ) {
      show({ type: 'utm_campaign_connect', params: { campaignId } });
    }
  }, [show, campaignId, connectionStatus.type]);

  return null;
}
