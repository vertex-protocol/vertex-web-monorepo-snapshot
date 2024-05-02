import { ROUTES } from 'client/modules/app/consts/routes';
import { BlitzPointsMetrics } from 'client/modules/rewards/components/BlitzPointsMetrics/BlitzPointsMetrics';
import { OverviewInfoCardButton } from 'client/pages/Portfolio/subpages/Overview/components/OverviewInfoCardButtons/OverviewInfoCardButton';

interface Props {
  isPrivate: boolean;
}

/**
 * This is extracted from OverviewInfoCardButtons so that points specific logic only runs when this is rendered
 */
export function OverviewInfoPointsCardButton({ isPrivate }: Props) {
  return (
    <OverviewInfoCardButton
      href={ROUTES.points}
      title="Points"
      value={
        <BlitzPointsMetrics
          metricContainerClassName="gap-x-1.5"
          imgClassName="h-4 w-auto"
        />
      }
      valueClassName="gap-x-4"
      // There is known overflow with the blast gold component, ignore for now
      className="overflow-hidden"
      pill={null}
      isPrivate={isPrivate}
    />
  );
}
