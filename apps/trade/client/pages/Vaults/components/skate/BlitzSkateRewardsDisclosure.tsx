'use client';

import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { Card, Icons, TextButton } from '@vertex-protocol/web-ui';
import { NewPill } from 'client/components/NewPill';
import { useIsEnabledForBrand } from 'client/modules/envSpecificContent/hooks/useIsEnabledForBrand';
import { useShowUserDisclosure } from 'client/modules/localstorage/userState/useShowUserDisclosure';
import { BLITZ_SPECIFIC_IMAGES } from 'common/brandMetadata/images';
import Image from 'next/image';

export function BlitzSkateRewardsDisclosure({ className }: WithClassnames) {
  const isBlitz = useIsEnabledForBrand(['blitz']);
  const { shouldShow, dismiss } = useShowUserDisclosure('blitz_vaults_rewards');

  if (!isBlitz || !shouldShow) {
    return null;
  }

  return (
    <Card
      className={joinClassNames(
        'bg-overlay-accent border-overlay-accent relative',
        'flex flex-col items-start gap-y-3',
        'p-4 text-xs lg:text-sm',
        className,
      )}
    >
      <NewPill />
      <div className="flex flex-col gap-y-1.5">
        <div className="text-text-primary">
          Skate Vault deposits earn Blast Gold{' '}
          <Image
            src={BLITZ_SPECIFIC_IMAGES.blastGoldIcon}
            className="inline h-3 w-auto"
            alt=""
          />
        </div>
        <p className="text-text-tertiary">
          Skate will distribute gold to depositors shortly after each Blitz
          Epoch, which ends on the 15th of every month.
        </p>
      </div>
      <TextButton
        colorVariant="secondary"
        startIcon={<Icons.X />}
        onClick={dismiss}
        className="absolute top-3 right-3 p-1"
      />
    </Card>
  );
}
