'use client';

import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { joinClassNames } from '@vertex-protocol/web-common';
import { Value, SecondaryButton } from '@vertex-protocol/web-ui';
import { ROUTES } from 'client/modules/app/consts/routes';
import { useSkateVaultApyFraction } from 'client/modules/vaults/hooks/query/useSkateVaultApyFraction';
import { BLITZ_SPECIFIC_IMAGES, IMAGES } from 'common/brandMetadata/images';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  vaultAddressForApr: string;
}

export function BlitzVaultsOpportunityCardContent({
  vaultAddressForApr,
}: Props) {
  const { data: vaultApy } = useSkateVaultApyFraction({
    vaultAddress: vaultAddressForApr,
  });

  return (
    <SecondaryButton
      as={Link}
      href={ROUTES.vaults}
      className={joinClassNames(
        'bg-surface-1 p-4',
        'flex flex-col items-center gap-y-4',
      )}
    >
      <Image src={IMAGES.partners.skate} alt="" className="h-4 w-auto" />
      <Value endElement="APY" sizeVariant="lg" className="leading-none">
        {formatNumber(vaultApy, {
          formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
        })}
      </Value>
      <div className="text-text-primary text-sm">
        +Blast Gold{' '}
        <Image
          src={BLITZ_SPECIFIC_IMAGES.blastGoldIcon}
          alt=""
          className="inline h-4 w-auto"
        />
      </div>
    </SecondaryButton>
  );
}
