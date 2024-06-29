import { Pill } from '@vertex-protocol/web-ui';
import { AppPage } from 'client/modules/app/AppPage';
import { useStakingPoolAprs } from 'client/modules/rewards/hooks/useStakingPoolAprs';
import { formatNumber } from '@vertex-protocol/react-client';
import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';

export function TokenPageTitle() {
  return (
    <div className="flex flex-col items-start gap-y-2 sm:flex-row sm:items-end sm:justify-between">
      <AppPage.EarnHeader title="VRTX Token" />
      <AverageAprPill />
    </div>
  );
}

function AverageAprPill() {
  const stakingAprs = useStakingPoolAprs();

  if (!stakingAprs) {
    return null;
  }

  return (
    <Pill colorVariant="accent" sizeVariant="sm">
      Avg. Staking Rewards:{' '}
      <span>
        {formatNumber(stakingAprs.avg, {
          formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
        })}
      </span>
    </Pill>
  );
}
