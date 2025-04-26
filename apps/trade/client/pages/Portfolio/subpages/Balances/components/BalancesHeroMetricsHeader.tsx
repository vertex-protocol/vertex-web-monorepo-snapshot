import { BigDecimal } from '@vertex-protocol/client';
import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { PortfolioHeroMetricsPane } from 'client/pages/Portfolio/components/PortfolioHeroMetricsPane';

interface BalancesHeroHeaderProps {
  netTotalBalanceUsd: BigDecimal | undefined;
}

export function BalancesHeroMetricsHeader({
  netTotalBalanceUsd,
}: BalancesHeroHeaderProps) {
  return (
    <PortfolioHeroMetricsPane.Header
      title="Net Balance"
      definitionTooltipId="balancesNetBalance"
      valueContent={formatNumber(netTotalBalanceUsd, {
        formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
      })}
    />
  );
}
