import {
  PresetNumberFormatSpecifier,
  formatNumber,
} from '@vertex-protocol/react-client';
import { BigDecimal } from '@vertex-protocol/utils';
import {
  WithClassnames,
  joinClassNames,
  mergeClassNames,
} from '@vertex-protocol/web-common';
import { getLiquidationRiskLevelClassNames } from 'client/utils/getLiquidationRiskLevelClassNames';
import { useMemo } from 'react';

interface Props extends WithClassnames {
  liquidationRiskFraction?: BigDecimal;
}

export function LiquidationRiskBar({
  className,
  liquidationRiskFraction,
}: Props) {
  const hasShadow = !liquidationRiskFraction?.isZero();

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
        'relative isolate rounded-xs',
        'h-1.5 w-16',
        className,
      )}
    >
      <div
        className={joinClassNames(
          'absolute inset-0 -z-10 rounded-xs',
          'from-risk-low via-risk-medium to-risk-extreme bg-linear-to-r opacity-30',
        )}
      />
      <div
        className={joinClassNames(
          'absolute inset-0 origin-left rounded-xs',
          colorClassNames.bg,
          hasShadow && ['shadow-elevation-risk-bar', colorClassNames.shadow],
        )}
        style={{
          width: liquidationRiskBarWidth,
        }}
      />
    </div>
  );
}
