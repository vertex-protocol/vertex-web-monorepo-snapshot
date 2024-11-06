import { useAddressBlitzPoints } from 'client/hooks/query/points/useAddressBlitzPoints';
import { BLITZ_SPECIFIC_IMAGES, IMAGES } from 'common/brandMetadata/images';
import { BlitzRewardsMetric } from 'client/modules/rewards/components/BlitzRewardsMetrics/BlitzRewardsMetric';

interface Props {
  imgClassName: string;
  metricContainerClassName: string;
}

export function BlitzRewardsMetrics({
  imgClassName,
  metricContainerClassName,
}: Props) {
  const { data: blitzPointsData } = useAddressBlitzPoints();

  return (
    <>
      <BlitzRewardsMetric
        metricValueClassName="text-accent"
        className={metricContainerClassName}
        imgClassName={imgClassName}
        img={IMAGES.brandIcon}
        amount={blitzPointsData?.blitz.totalPoints}
      />
      <BlitzRewardsMetric
        metricValueClassName="text-accent-blast"
        imgClassName={imgClassName}
        className={metricContainerClassName}
        img={BLITZ_SPECIFIC_IMAGES.blastIcon}
        amount={blitzPointsData?.blast.points}
      />
      <BlitzRewardsMetric
        metricValueClassName="text-accent-blast"
        imgClassName={imgClassName}
        className={metricContainerClassName}
        img={BLITZ_SPECIFIC_IMAGES.blastGoldIcon}
        amount={blitzPointsData?.blast.gold}
      />
    </>
  );
}
