import { NextImageSrc } from '@vertex-protocol/web-common';
import { VaultPartnerLogoPill } from 'client/modules/skateVaults/components/VaultPartnerLogoPill';

interface Props {
  vaultName: string;
  partnerImageSrc: NextImageSrc;
  partnerHref: string;
}

export function VaultHeader({
  vaultName,
  partnerHref,
  partnerImageSrc,
}: Props) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-text-secondary text-base uppercase">
        {vaultName}
      </span>
      <VaultPartnerLogoPill imageSrc={partnerImageSrc} href={partnerHref} />
    </div>
  );
}
