import { BigDecimal } from '@vertex-protocol/client';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';
import { DefinitionTooltipID } from 'client/modules/tooltips/DefinitionTooltip/definitionTooltipConfig';
import { formatNumber } from '@vertex-protocol/react-client';

import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import Image from 'next/image';
import aprCircleBg from './assets/staking-apr-circle-bg.svg';

interface AprMetric {
  label: string;
  value: BigDecimal | undefined;
  definitionId?: DefinitionTooltipID;
}

export function AprMetricsCircle({
  className,
  topMetric,
  bottomMetric,
}: WithClassnames<{
  topMetric: AprMetric;
  bottomMetric: AprMetric;
}>) {
  return (
    <div
      className={joinClassNames(
        'relative z-0 flex items-center justify-center',
        className,
      )}
    >
      <Image
        className="pointer-events-none absolute -z-10 sm:scale-110 lg:scale-125"
        src={aprCircleBg}
        alt="APR circle background"
      />
      <div className="flex flex-col gap-y-4">
        {/* Top Metric */}
        <div className="flex flex-col items-center justify-center">
          <DefinitionTooltip
            definitionId={topMetric.definitionId}
            contentWrapperClassName="text-sm"
            portal
          >
            {topMetric.label}
          </DefinitionTooltip>
          <span className="text-accent text-lg sm:text-4xl">
            {formatNumber(topMetric.value, {
              formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
            })}
          </span>
        </div>
        {/* Bottom Metric */}
        <div className="text-text-secondary flex flex-col items-center text-xs">
          {bottomMetric.label}
          <span className="text-text-primary text-sm">
            {formatNumber(bottomMetric.value, {
              formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
