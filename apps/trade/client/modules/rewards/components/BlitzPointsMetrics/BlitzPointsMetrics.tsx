import { useAddressBlitzPoints } from 'client/hooks/query/points/useAddressBlitzPoints';
import { BLITZ_SPECIFIC_IMAGES, IMAGES } from 'client/modules/brand/images';
import { BlitzPointsMetric } from 'client/modules/rewards/components/BlitzPointsMetrics/BlitzPointsMetric';

interface Props {
  imgClassName: string;
  metricContainerClassName: string;
}

export function BlitzPointsMetrics({
  imgClassName,
  metricContainerClassName,
}: Props) {
  const { data: blitzPointsData } = useAddressBlitzPoints();

  return (
    <>
      <BlitzPointsMetric
        metricValueClassName="text-accent"
        className={metricContainerClassName}
        imgClassName={imgClassName}
        img={IMAGES.brandIcon}
        amount={blitzPointsData?.blitz.totalPoints}
      />
      <BlitzPointsMetric
        metricValueClassName="text-accent-blast"
        imgClassName={imgClassName}
        className={metricContainerClassName}
        img={BLITZ_SPECIFIC_IMAGES.blastIcon}
        amount={blitzPointsData?.blast.points}
      />
      <BlitzPointsMetric
        metricValueClassName="text-accent-blast"
        imgClassName={imgClassName}
        className={metricContainerClassName}
        img={BLITZ_SPECIFIC_IMAGES.blastGoldIcon}
        amount={blitzPointsData?.blast.gold}
      />
    </>
  );
}
