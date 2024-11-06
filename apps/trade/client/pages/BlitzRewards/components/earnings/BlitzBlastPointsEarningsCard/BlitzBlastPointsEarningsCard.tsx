import { Icons } from '@vertex-protocol/web-ui';
import { BlitzBlastPointsEarningsCardContent } from 'client/pages/BlitzRewards/components/earnings/BlitzBlastPointsEarningsCard/BlitzBlastPointsEarningsCardContent';
import { BlitzEarningsCard } from 'client/pages/BlitzRewards/components/earnings/BlitzEarningsCard';
import { BlitzEarningsBulletItem } from 'client/pages/BlitzRewards/components/earnings/BlitzEarningsBulletItem';
import { BLITZ_SPECIFIC_IMAGES } from 'common/brandMetadata/images';
import Image from 'next/image';

export function BlitzBlastPointsEarningsCard() {
  return (
    <BlitzEarningsCard
      colorVariant="blast"
      heading={
        <>
          <Image
            className="h-4 w-auto"
            src={BLITZ_SPECIFIC_IMAGES.blastLogo}
            alt=""
          />
          Points
        </>
      }
      content={<BlitzBlastPointsEarningsCardContent />}
      footer={
        <BlitzEarningsBulletItem
          icon={Icons.ArrowDownLeft}
          iconClassName="text-accent-blast"
        >
          Points are distributed every ~3 hours based on your net balance.
        </BlitzEarningsBulletItem>
      }
    />
  );
}
