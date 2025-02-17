import { BigDecimal } from '@vertex-protocol/client';
import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { useStakeV2VrtxSummary } from 'client/modules/staking/dialogs/StakeV2VrtxDialog/useStakeV2VrtxSummary';

interface Props {
  validAmount: BigDecimal | undefined;
}

export function StakeV2VrtxSummary({ validAmount }: Props) {
  const { currentSummary, estimatedSummary, protocolTokenSymbol, stakingApr } =
    useStakeV2VrtxSummary({
      validAmount,
    });

  return (
    <div className="flex flex-col gap-y-2.5">
      <span className="text-text-primary text-xs">Summary</span>
      <div className="flex flex-col gap-y-1.5">
        <ValueWithLabel.Horizontal
          sizeVariant="xs"
          label="Staking Balance"
          value={currentSummary.accountBalance}
          newValue={estimatedSummary?.accountBalance}
          numberFormatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
          valueEndElement={protocolTokenSymbol}
        />
        <ValueWithLabel.Horizontal
          sizeVariant="xs"
          label="Current APR"
          value={stakingApr}
          valueClassName="text-positive"
          numberFormatSpecifier={PresetNumberFormatSpecifier.PERCENTAGE_2DP}
        />
      </div>
    </div>
  );
}
