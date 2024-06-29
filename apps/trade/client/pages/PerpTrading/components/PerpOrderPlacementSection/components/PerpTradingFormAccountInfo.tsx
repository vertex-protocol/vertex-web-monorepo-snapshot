import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { WithClassnames } from '@vertex-protocol/web-common';
import { Summary } from 'client/components/Summary';
import { usePerpOrderFormContext } from 'client/pages/PerpTrading/context/PerpOrderFormContext';

export function PerpTradingFormAccountInfo({ className }: WithClassnames) {
  const {
    tradingAccountMetrics: { derivedMetrics },
  } = usePerpOrderFormContext();

  return (
    <Summary.Container className={className}>
      <Summary.Item
        label="Margin Required:"
        value={derivedMetrics.cost}
        numberFormatSpecifier={PresetNumberFormatSpecifier.CURRENCY_2DP}
      />
      <Summary.Item
        label="Funds Available:"
        value={derivedMetrics.fundsAvailable}
        numberFormatSpecifier={PresetNumberFormatSpecifier.CURRENCY_2DP}
      />
    </Summary.Container>
  );
}
