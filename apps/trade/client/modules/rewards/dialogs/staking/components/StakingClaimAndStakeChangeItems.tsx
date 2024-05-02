import { BigDecimal } from '@vertex-protocol/utils';
import { Icons } from '@vertex-protocol/web-ui';
import { PresetNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import { StakingRadioGroup } from './StakingRadioGroup';

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
        formatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
        symbol={protocolTokenSymbol}
      />
      <Icons.BsArrowRightShort size={24} className="text-positive" />
      <StakingRadioGroup.MetricStackedItem
        label="New Position"
        value={estimatedAmountStaked}
        formatSpecifier={PresetNumberFormatSpecifier.NUMBER_2DP}
        symbol={protocolTokenSymbol}
      />
    </div>
  );
}
