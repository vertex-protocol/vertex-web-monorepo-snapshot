import { BigDecimal } from '@vertex-protocol/client';
import { PortfolioHeroMetricsPane } from 'client/pages/Portfolio/components/PortfolioHeroMetricsPane';
import { PresetNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';

interface PoolsHeroHeaderProps {
  totalLpValueUsd: BigDecimal | undefined;
}

export function PoolsHeroMetricsHeader({
  totalLpValueUsd,
}: PoolsHeroHeaderProps) {
  return (
    <PortfolioHeroMetricsPane.Header
      title="Total Provided"
      definitionTooltipId="lpTotalProvided"
      valueContent={formatNumber(totalLpValueUsd, {
        formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
      })}
    />
  );
}
