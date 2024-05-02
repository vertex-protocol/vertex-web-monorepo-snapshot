import { WithClassnames } from '@vertex-protocol/web-common';
import { Summary } from 'client/components/Summary';
import { usePerpOrderFormContext } from 'client/pages/PerpTrading/context/PerpOrderFormContext';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { PresetNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';

export function PerpTradingFormAccountInfo({ className }: WithClassnames) {
  const {
    tradingAccountMetrics: { derivedMetrics },
  } = usePerpOrderFormContext();

  return (
    <Summary.Container className={className}>
      <Summary.Item
        label="Margin Required:"
        value={formatNumber(derivedMetrics.cost, {
          formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
        })}
      />
      <Summary.Item
        label="Funds Available:"
        value={formatNumber(derivedMetrics.fundsAvailable, {
          formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
        })}
      />
    </Summary.Container>
  );
}
