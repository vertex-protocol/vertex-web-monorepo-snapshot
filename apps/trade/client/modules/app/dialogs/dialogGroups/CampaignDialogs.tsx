import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { UtmCampaignDialog } from 'client/modules/utm/dialogs/UtmCampaignDialog/UtmCampaignDialog';

export function CampaignDialogs() {
  const { currentDialog } = useDialog();

  return (
    <>
      {currentDialog?.type === 'utm_campaign_connect' && (
        <UtmCampaignDialog campaignId={currentDialog.params.campaignId} />
      )}
    </>
  );
}
