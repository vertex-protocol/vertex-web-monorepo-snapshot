import { BlitzEarningsCard } from 'client/pages/BlitzRewards/components/earnings/BlitzEarningsCard';
import { BlitzPointsEarningsCardContent } from 'client/pages/BlitzRewards/components/earnings/BlitzPointsEarningsCard/BlitzPointsEarningsCardContent';
import { BlitzPointsEarningsCardFooter } from 'client/pages/BlitzRewards/components/earnings/BlitzPointsEarningsCard/BlitzPointsEarningsCardFooter';
import { IMAGES } from 'common/brandMetadata/images';
import Image from 'next/image';

export function BlitzPointsEarningsCard() {
  return (
    <BlitzEarningsCard
      colorVariant="blitz"
      heading={
        <>
          <Image className="h-4 w-auto" src={IMAGES.brandLogo} alt="" />
          Points
        </>
      }
      content={<BlitzPointsEarningsCardContent />}
      footer={<BlitzPointsEarningsCardFooter />}
    />
  );
}
