import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { BigDecimal } from '@vertex-protocol/utils';
import { Icons } from '@vertex-protocol/web-ui';
import { StakingRadioGroup } from 'client/modules/rewards/dialogs/staking/components/StakingRadioGroup';

interface Props {
  currentAmountStaked: BigDecimal | undefined;
  estimatedAmountStaked: BigDecimal | undefined;
  protocolTokenSymbol: string;
}

export function StakingClaimAndStakeChangeItems({
  currentAmountStaked,
  estimatedAmountStaked,
  protocolTokenSymbol,
}: Props) {
  return (
    <div className="flex items-center gap-x-3">
      <StakingRadioGroup.MetricStackedItem
        label="Current Position"
        value={currentAmountStaked}
        numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
        valueEndElement={protocolTokenSymbol}
      />
      <Icons.ArrowRight size={24} className="text-positive" />
      <StakingRadioGroup.MetricStackedItem
        label="New Position"
        value={estimatedAmountStaked}
        numberFormatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
        valueEndElement={protocolTokenSymbol}
      />
    </div>
  );
}
