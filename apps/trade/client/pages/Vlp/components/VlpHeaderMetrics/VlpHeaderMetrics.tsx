import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { getSignDependentColorClassName } from 'client/utils/ui/getSignDependentColorClassName';
import { useVlpHeaderMetrics } from 'client/pages/Vlp/components/VlpHeaderMetrics/useVlpHeaderMetrics';
import { removeDecimals } from '@vertex-protocol/client';

export function VlpHeaderMetrics() {
  const { tvl, apr } = useVlpHeaderMetrics();

  return (
    <>
      <ValueWithLabel.Vertical
        sizeVariant="xl"
        label="TVL"
        value={removeDecimals(tvl)}
        numberFormatSpecifier={PresetNumberFormatSpecifier.CURRENCY_INT}
      />
      <ValueWithLabel.Vertical
        sizeVariant="xl"
        label="APR"
        value={apr}
        valueClassName={getSignDependentColorClassName(apr)}
        numberFormatSpecifier={PresetNumberFormatSpecifier.PERCENTAGE_2DP}
      />
    </>
  );
}
