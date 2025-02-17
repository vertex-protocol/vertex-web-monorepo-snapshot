import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { BigDecimal } from '@vertex-protocol/utils';
import { Icons } from '@vertex-protocol/web-ui';
import { ClaimAndStakeRadioGroup } from 'client/modules/rewards/dialogs/ClaimTradingRewardsDialog/ClaimAndStakeRadioGroup';

interface Props {
  currentAmountStaked: BigDecimal | undefined;
  estimatedAmountStaked: BigDecimal | undefined;
  protocolTokenSymbol: string;
}

export function ClaimAndStakeChangeItems({
  currentAmountStaked,
  estimatedAmountStaked,
  protocolTokenSymbol,
}: Props) {
  return (
    <div className="flex items-center gap-x-3">
      <ClaimAndStakeRadioGroup.MetricStackedItem
        label="Current Position"
        value={currentAmountStaked}
        numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
        valueEndElement={protocolTokenSymbol}
      />
      <Icons.ArrowRight size={24} className="text-positive" />
      <ClaimAndStakeRadioGroup.MetricStackedItem
        label="New Position"
        value={estimatedAmountStaked}
        numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
        valueEndElement={protocolTokenSymbol}
      />
    </div>
  );
}
