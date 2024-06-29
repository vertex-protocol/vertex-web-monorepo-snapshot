import { BigDecimal } from '@vertex-protocol/client';
import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { WithChildren, WithClassnames } from '@vertex-protocol/web-common';
import { BaseDefinitionTooltip } from '@vertex-protocol/web-ui';
import { LiquidationRiskBar } from 'client/components/LiquidationRiskBar';
import { getLiquidationRiskLevelClassNames } from 'client/utils/getLiquidationRiskLevelClassNames';

export function OverviewLiquidationRiskBar({
  liquidationRiskFraction,
}: {
  liquidationRiskFraction: BigDecimal | undefined;
}) {
  return (
    <LiquidationRiskTooltip liquidationRiskFraction={liquidationRiskFraction}>
      <LiquidationRiskBar
        liquidationRiskFraction={liquidationRiskFraction}
        className="w-24 sm:w-16"
      />
    </LiquidationRiskTooltip>
  );
}

function LiquidationRiskTooltip({
  liquidationRiskFraction,
  children,
  className,
}: WithChildren<
  WithClassnames<{ liquidationRiskFraction: BigDecimal | undefined }>
>) {
  const { title, content } = {
    title: (
      <>
        <div className="flex justify-between">
          <span>Liquidation Risk</span>
          <span
            className={
              getLiquidationRiskLevelClassNames(liquidationRiskFraction).text
            }
          >
            {formatNumber(liquidationRiskFraction, {
              formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
            })}
          </span>
        </div>
        <span className="text-text-secondary">(Maintenance Margin Usage)</span>
      </>
    ),
    content: (
      <div className="flex flex-col gap-y-2">
        <p>
          The amount of your maintenance margin being used. Your account is
          eligible for liquidation when the maintenance margin usages reaches
          100%
        </p>
        <p>
          Maintenance margin is the amount of margin you must maintain in an
          account to not risk getting liquidated.
        </p>
      </div>
    ),
  };

  return (
    <BaseDefinitionTooltip
      title={title}
      content={content}
      contentWrapperClassName={className}
    >
      {children}
    </BaseDefinitionTooltip>
  );
}
