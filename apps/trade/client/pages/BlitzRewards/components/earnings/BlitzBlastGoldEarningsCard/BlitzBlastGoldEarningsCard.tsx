import { imageToIconComponent } from '@vertex-protocol/web-ui';
import { BlitzBlastGoldEarningsCardContent } from 'client/pages/BlitzRewards/components/earnings/BlitzBlastGoldEarningsCard/BlitzBlastGoldEarningsCardContent';
import { BlitzEarningsCard } from 'client/pages/BlitzRewards/components/earnings/BlitzEarningsCard';
import { BlitzEarningsBulletItem } from 'client/pages/BlitzRewards/components/earnings/BlitzEarningsBulletItem';
import { BLITZ_SPECIFIC_IMAGES } from 'common/brandMetadata/images';
import Image from 'next/image';

const GoldIcon = imageToIconComponent({
  src: BLITZ_SPECIFIC_IMAGES.blastGoldIcon,
  alt: '',
});

export function BlitzBlastGoldEarningsCard() {
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
          Gold
        </>
      }
      content={<BlitzBlastGoldEarningsCardContent />}
      footer={
        <BlitzEarningsBulletItem icon={GoldIcon} iconClassName="text-accent">
          Gold is distributed proportionally to the Blitz points earned.
          Distributions occur ~24hr after each epoch.
        </BlitzEarningsBulletItem>
      }
    />
  );
}
