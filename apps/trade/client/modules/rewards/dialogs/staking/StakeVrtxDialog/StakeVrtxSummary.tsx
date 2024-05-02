import { BigDecimal } from '@vertex-protocol/client';
import { WithClassnames } from '@vertex-protocol/web-common';
import { ActionSummary } from 'client/components/ActionSummary';
import { LineItem } from 'client/components/LineItem/LineItem';
import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from 'client/utils/formatNumber/NumberFormatSpecifier';
import {
  formatTimestamp,
  TimeFormatSpecifier,
} from 'client/utils/formatTimestamp';
import {
  VOVRTX_INFO,
  VRTX_TOKEN_INFO,
} from 'common/productMetadata/vertexTokenInfo';
import { StakingScoreLineItemLabel } from '../components/StakingScoreLineItemLabel';
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
        <LineItem.Metric
          label="Date"
          value={nowInMillis}
          renderValue={(val) =>
            formatTimestamp(val, {
              formatSpecifier: TimeFormatSpecifier.MMM_D_HH_12H_O,
            })
          }
        />
        <LineItem.Metric
          label="Stake"
          value={validAmount}
          valueEndElement={VRTX_TOKEN_INFO.symbol}
          renderValue={CustomNumberFormatSpecifier.NUMBER_AUTO}
        />
        <LineItem.MetricWithEstimation
          label="Total Staked"
          currentValue={currentSummary.accountAmountStaked}
          estimatedValue={estimatedSummary?.accountAmountStaked}
          renderValue={CustomNumberFormatSpecifier.NUMBER_AUTO}
          valueEndElement={VRTX_TOKEN_INFO.symbol}
        />
      </StakingSummary.Section>
      <StakingSummary.Section title="Today">
        <LineItem.MetricWithEstimation
          label={<StakingScoreLineItemLabel />}
          currentValue={currentSummary.accountStakingScore}
          estimatedValue={estimatedSummary?.accountStakingScore}
          renderValue={CustomNumberFormatSpecifier.NUMBER_AUTO}
          valueEndElement={VOVRTX_INFO.symbol}
        />
        <LineItem.MetricWithEstimation
          label="Current APR"
          currentValue={currentSummary.accountApr}
          estimatedValue={estimatedSummary?.accountApr}
          renderValue={PresetNumberFormatSpecifier.PERCENTAGE_2DP}
        />
      </StakingSummary.Section>
      <StakingSummary.Section title="Potential Earnings">
        <LineItem.MetricWithEstimation
          label={<StakingScoreLineItemLabel />}
          currentValue={currentSummary.accountMaxScore}
          estimatedValue={estimatedSummary?.accountMaxScore}
          renderValue={CustomNumberFormatSpecifier.NUMBER_AUTO}
          valueEndElement={VOVRTX_INFO.symbol}
        />
        <LineItem.MetricWithEstimation
          label="Est. Max APR"
          currentValue={currentSummary.accountMaxApr}
          estimatedValue={estimatedSummary?.accountMaxApr}
          renderValue={PresetNumberFormatSpecifier.PERCENTAGE_2DP}
        />
        <LineItem.Metric
          label="Max Score date"
          value={maxScoreTimeMillis}
          renderValue={(val) =>
            formatTimestamp(val, {
              formatSpecifier: TimeFormatSpecifier.MMM_D_HH_12H_O,
            })
          }
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
