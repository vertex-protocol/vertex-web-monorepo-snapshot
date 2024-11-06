import { ROUTES } from 'client/modules/app/consts/routes';
import { BlitzRewardsMetrics } from 'client/modules/rewards/components/BlitzRewardsMetrics/BlitzRewardsMetrics';
import { OverviewInfoCardButton } from 'client/pages/Portfolio/subpages/Overview/components/OverviewInfoCardButtons/OverviewInfoCardButton';

interface Props {
  isPrivate: boolean;
}

/**
 * This is extracted from OverviewInfoCardButtons so that blitz rewards specific logic only runs when this is rendered
 */
export function OverviewInfoBlitzRewardsCardButton({ isPrivate }: Props) {
  return (
    <OverviewInfoCardButton
      href={ROUTES.rewards}
      title="Rewards"
      value={
        <BlitzRewardsMetrics
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
