import { BigDecimal } from '@vertex-protocol/utils';
import {
  WithClassnames,
  joinClassNames,
  mergeClassNames,
} from '@vertex-protocol/web-common';
import { PresetNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { getLiquidationRiskLevelClassNames } from 'client/utils/getLiquidationRiskLevelClassNames';
import { useMemo } from 'react';

interface Props extends WithClassnames {
  liquidationRiskFraction?: BigDecimal;
}

export function LiquidationRiskBar({
  className,
  liquidationRiskFraction,
}: Props) {
  const colorClassNames = getLiquidationRiskLevelClassNames(
    liquidationRiskFraction,
  );

  const liquidationRiskBarWidth = useMemo(() => {
    return formatNumber(liquidationRiskFraction, {
      formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_INT,
      defaultValue: 0,
    });
  }, [liquidationRiskFraction]);

  return (
    <div
      className={mergeClassNames(
        'relative isolate rounded-sm',
        'h-1.5 w-16',
        className,
      )}
    >
      <div
        className={joinClassNames(
          'absolute inset-0 -z-10 rounded-sm',
          'from-risk-low via-risk-medium to-risk-extreme bg-gradient-to-r opacity-30',
        )}
      />
      <div
        className={joinClassNames(
          'shadow-elevation-risk-bar absolute inset-0 origin-left rounded-sm duration-200',
          colorClassNames.bg,
          colorClassNames.shadow,
        )}
        style={{
          width: liquidationRiskBarWidth,
        }}
      />
    </div>
  );
}
