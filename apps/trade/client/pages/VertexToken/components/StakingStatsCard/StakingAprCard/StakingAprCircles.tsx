import { BigDecimal } from '@vertex-protocol/client';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { StakingAprMetricsCircle } from 'client/pages/VertexToken/components/StakingStatsCard/StakingAprCard/StakingAprMetricsCircle';
import Image from 'next/image';

import waveform from 'client/pages/VertexToken/components/StakingStatsCard/StakingAprCard/assets/staking-apr-waveform.svg';

interface Props extends WithClassnames {
  accountCurrentApr: BigDecimal | undefined;
  accountShareFraction: BigDecimal | undefined;
  estimatedAccountMaxApr: BigDecimal | undefined;
  estimatedAccountMaxShareFraction: BigDecimal | undefined;
}

export function StakingAprCircles({
  className,
  accountCurrentApr,
  accountShareFraction,
  estimatedAccountMaxApr,
  estimatedAccountMaxShareFraction,
}: Props) {
  return (
    <div
      className={joinClassNames('flex items-center justify-center', className)}
    >
      <StakingAprMetricsCircle
        className="-right-2 flex-1 lg:right-auto"
        topMetric={{
          label: 'Your Est. APR',
          value: accountCurrentApr,
          definitionId: 'stakingCurrentApr',
        }}
        bottomMetric={{
          label: 'Share of pool',
          value: accountShareFraction,
        }}
      />
      <Image src={waveform} alt="APR" className="hidden lg:block" />
      <StakingAprMetricsCircle
        // Negative margin to negate the image offset
        className="-left-2 flex-1 lg:left-auto"
        topMetric={{
          label: 'Est. Max APR',
          value: estimatedAccountMaxApr,
          definitionId: 'stakingEstMaxApr',
        }}
        bottomMetric={{
          label: 'Share of pool',
          value: estimatedAccountMaxShareFraction,
        }}
      />
    </div>
  );
}
