import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { VlpOverviewCardTabContent } from 'client/pages/Vlp/components/VlpOverviewCard/components/VlpOverviewCardTabContent';
import { useVlpOverviewCard } from 'client/pages/Vlp/components/VlpOverviewCard/useVlpOverviewCard';
import {
  VLP_OVERVIEW_CARD_TIMESPAN_METADATA,
  VlpOverviewCardTimespan,
} from 'client/pages/Vlp/components/VlpOverviewCard/vlpOverviewCardTimespan';
import { getSignDependentColorClassName } from 'client/utils/ui/getSignDependentColorClassName';

interface Props {
  selectedTimespan: VlpOverviewCardTimespan;
}

export function VlpOverviewPerformanceTabContent({ selectedTimespan }: Props) {
  const selectedTimespanMetadata =
    VLP_OVERVIEW_CARD_TIMESPAN_METADATA[selectedTimespan];
  const { pnl, volume, totalDepositors } = useVlpOverviewCard({
    timespan: selectedTimespan,
  });

  return (
    <VlpOverviewCardTabContent>
      <span className="text-text-primary text-sm">
        Performance ({selectedTimespanMetadata.label})
      </span>
      <div className="flex flex-col gap-y-1">
        <ValueWithLabel.Horizontal
          sizeVariant="sm"
          label="PnL"
          value={pnl}
          numberFormatSpecifier={PresetNumberFormatSpecifier.CURRENCY_INT}
          valueClassName={getSignDependentColorClassName(pnl)}
        />
        <ValueWithLabel.Horizontal
          sizeVariant="sm"
          label="Volume"
          value={volume}
          numberFormatSpecifier={PresetNumberFormatSpecifier.CURRENCY_INT}
        />
        <ValueWithLabel.Horizontal
          sizeVariant="sm"
          label="Total Depositors"
          value={totalDepositors}
          numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_INT}
        />
      </div>
    </VlpOverviewCardTabContent>
  );
}
