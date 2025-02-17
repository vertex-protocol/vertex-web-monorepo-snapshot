import { Divider, LinkButton, PrimaryButton } from '@vertex-protocol/web-ui';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { VERTEX_SPECIFIC_LINKS } from 'common/brandMetadata/links/vertexLinks';
import Image from 'next/image';

import cardImage from 'client/modules/utm/dialogs/UtmCampaignDialog/assets/sonic_banner.webp';
import Link from 'next/link';

export type UtmCampaignID = 'rainbow' | 'cielo' | 'rubix';

export interface UtmCampaignDialogParams {
  campaignId: UtmCampaignID;
}

export function UtmCampaignDialog({ campaignId }: UtmCampaignDialogParams) {
  const { hide, push } = useDialog();

  const sonicSeriesContent = {
    title: 'Vertex Edge on Sonic',
    imageSrc: cardImage,
    bodyContent: (
      <>
        <p className="text-text-primary">
          Unlock Exclusive Rewards: Sonic Points &amp; Gems.
        </p>
        <Divider />
        <div className="text-text-tertiary">
          <p>Trade 60+ Perpetual &amp; Spot Markets on Vertex.</p>
          <LinkButton
            as={Link}
            colorVariant="primary"
            href={VERTEX_SPECIFIC_LINKS.sonicGemsDocs}
            external
            withExternalIcon
          >
            Learn More About Rewards on Sonic
          </LinkButton>
        </div>
      </>
    ),
  };

  const dialogContent = {
    rainbow: sonicSeriesContent,
    cielo: sonicSeriesContent,
    rubix: sonicSeriesContent,
  }[campaignId];

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title onClose={hide}>
        {dialogContent.title}
      </BaseAppDialog.Title>
      <BaseAppDialog.Body>
        <Image
          quality={100}
          src={dialogContent.imageSrc}
          className="h-auto w-full rounded-lg"
          alt=""
        />
        {dialogContent.bodyContent}
        <PrimaryButton onClick={() => push({ type: 'connect', params: {} })}>
          Connect Wallet
        </PrimaryButton>
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}
