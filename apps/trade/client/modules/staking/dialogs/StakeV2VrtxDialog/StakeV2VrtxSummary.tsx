import { BigDecimal } from '@vertex-protocol/client';
import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { WithClassnames } from '@vertex-protocol/web-common';
import { ActionSummary } from 'client/components/ActionSummary';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { useStakeV2VrtxSummary } from 'client/modules/staking/dialogs/StakeV2VrtxDialog/useStakeV2VrtxSummary';

interface Props extends WithClassnames {
  validAmount: BigDecimal | undefined;
}

export function StakeV2VrtxSummary({ className, validAmount }: Props) {
  const { currentSummary, estimatedSummary, protocolTokenSymbol, stakingApr } =
    useStakeV2VrtxSummary({
      validAmount,
    });

  const content = (
    <>
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Total Staked"
        value={currentSummary.accountBalance}
        newValue={estimatedSummary?.accountBalance}
        numberFormatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
        valueEndElement={protocolTokenSymbol}
      />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Share of Pool"
        value={currentSummary.shareOfPool}
        newValue={estimatedSummary?.shareOfPool}
        valueEndElement={protocolTokenSymbol}
        numberFormatSpecifier={PresetNumberFormatSpecifier.PERCENTAGE_UPTO_4DP}
      />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Est. APR"
        value={stakingApr}
        numberFormatSpecifier={PresetNumberFormatSpecifier.PERCENTAGE_2DP}
      />
    </>
  );

  return (
    <ActionSummary.Disclosure
      className={className}
      expandableContent={content}
      labelContent="Summary"
      isHighlighted={!!estimatedSummary}
    />
  );
}
