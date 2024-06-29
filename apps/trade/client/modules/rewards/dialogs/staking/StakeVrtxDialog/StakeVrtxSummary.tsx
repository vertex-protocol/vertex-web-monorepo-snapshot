import { BigDecimal } from '@vertex-protocol/client';
import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { WithClassnames } from '@vertex-protocol/web-common';
import { ActionSummary } from 'client/components/ActionSummary';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import {
  TimeFormatSpecifier,
  formatTimestamp,
} from 'client/utils/formatTimestamp';
import {
  VOVRTX_INFO,
  VRTX_TOKEN_INFO,
} from 'common/productMetadata/vertexTokenInfo';
import Image from 'next/image';
import { StakingSummary } from '../components/StakingSummary';
import { useStakingSummary } from '../useStakingSummary';

interface Props extends WithClassnames {
  validAmount: BigDecimal | undefined;
}

export function StakeVrtxSummary({ className, validAmount }: Props) {
  const { currentSummary, estimatedSummary, maxScoreTimeMillis, nowInMillis } =
    useStakingSummary({
      validAmount,
      isUnstake: false,
    });

  const content = (
    <StakingSummary.ContentContainer>
      <StakingSummary.Section>
        <ValueWithLabel.Horizontal
          sizeVariant="xs"
          label="Date"
          valueContent={formatTimestamp(nowInMillis, {
            formatSpecifier: TimeFormatSpecifier.MMM_D_HH_12H_O,
          })}
        />
        <ValueWithLabel.Horizontal
          sizeVariant="xs"
          label="Stake"
          value={validAmount}
          valueEndElement={VRTX_TOKEN_INFO.symbol}
          numberFormatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
        />
        <ValueWithLabel.Horizontal
          sizeVariant="xs"
          label="Total Staked"
          value={currentSummary.accountAmountStaked}
          newValue={estimatedSummary?.accountAmountStaked}
          numberFormatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
          valueEndElement={VRTX_TOKEN_INFO.symbol}
        />
      </StakingSummary.Section>
      <StakingSummary.Section title="Today">
        <ValueWithLabel.Horizontal
          sizeVariant="xs"
          labelClassName="gap-x-1"
          label={
            <>
              <Image
                src={VOVRTX_INFO.icon.asset}
                alt={VOVRTX_INFO.symbol}
                className="size-5"
              />
              Score
            </>
          }
          value={currentSummary.accountStakingScore}
          newValue={estimatedSummary?.accountStakingScore}
          numberFormatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
          valueEndElement={VOVRTX_INFO.symbol}
        />
        <ValueWithLabel.Horizontal
          sizeVariant="xs"
          label="Current APR"
          value={currentSummary.accountApr}
          newValue={estimatedSummary?.accountApr}
          numberFormatSpecifier={PresetNumberFormatSpecifier.PERCENTAGE_2DP}
        />
      </StakingSummary.Section>
      <StakingSummary.Section title="Potential Earnings">
        <ValueWithLabel.Horizontal
          sizeVariant="xs"
          labelClassName="gap-x-1"
          label={
            <>
              <Image
                src={VOVRTX_INFO.icon.asset}
                alt={VOVRTX_INFO.symbol}
                className="size-5"
              />
              Score
            </>
          }
          value={currentSummary.accountMaxScore}
          newValue={estimatedSummary?.accountMaxScore}
          numberFormatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
          valueEndElement={VOVRTX_INFO.symbol}
        />
        <ValueWithLabel.Horizontal
          sizeVariant="xs"
          label="Est. Max APR"
          value={currentSummary.accountMaxApr}
          newValue={estimatedSummary?.accountMaxApr}
          numberFormatSpecifier={PresetNumberFormatSpecifier.PERCENTAGE_2DP}
        />
        <ValueWithLabel.Horizontal
          sizeVariant="xs"
          label="Max Score date"
          valueContent={formatTimestamp(maxScoreTimeMillis, {
            formatSpecifier: TimeFormatSpecifier.MMM_D_HH_12H_O,
          })}
        />
      </StakingSummary.Section>
    </StakingSummary.ContentContainer>
  );

  return (
    <ActionSummary.Disclosure
      className={className}
      expandableContent={content}
      labelContent="Summary"
      triggerOpen={!!estimatedSummary}
    />
  );
}
