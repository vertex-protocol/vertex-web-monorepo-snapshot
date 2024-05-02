import { Pill } from '@vertex-protocol/web-ui';
import { AppPage } from 'client/modules/app/AppPage';
import { useStakingPoolAprs } from 'client/modules/rewards/hooks/useStakingPoolAprs';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { PresetNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import { VRTX_TOKEN_INFO } from 'common/productMetadata/vertexTokenInfo';
import Image from 'next/image';

export function TokenPageTitle() {
  return (
    <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4">
      <div className="flex items-center gap-x-1.5 lg:gap-x-3">
        <Image
          src={VRTX_TOKEN_INFO.icon.asset}
          alt={VRTX_TOKEN_INFO.symbol}
          className="h-auto w-7 lg:w-9"
        />
        <AppPage.Header title="VRTX Token" />
      </div>
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
    <Pill color="accent">
      Avg. Staking Rewards:{' '}
      <span className="font-medium">
        {formatNumber(stakingAprs.avg, {
          formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
        })}
      </span>
    </Pill>
  );
}
