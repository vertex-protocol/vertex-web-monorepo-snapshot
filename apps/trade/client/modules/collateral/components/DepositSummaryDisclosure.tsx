import { SubaccountTx } from '@vertex-protocol/engine-client';
import { WithClassnames } from '@vertex-protocol/web-common';
import { ActionSummary } from 'client/components/ActionSummary';
import { LineItem } from 'client/components/LineItem/LineItem';
import { LineItemMetricWithEstimationProps } from 'client/components/LineItem/types';
import { useCollateralEstimateSubaccountInfoChange } from 'client/modules/collateral/hooks/useCollateralEstimateSubaccountInfoChange';
import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from 'client/utils/formatNumber/NumberFormatSpecifier';
import { VRTX_TOKEN_INFO } from 'common/productMetadata/vertexTokenInfo';
import { useMemo } from 'react';
import { DepositInfoCardType } from '../deposit/types';

interface Props extends WithClassnames {
  estimateStateTxs: SubaccountTx[];
  displayedInfoCardType?: DepositInfoCardType;
  productId?: number;
  triggerOpen?: boolean;
  symbol?: string;
}

export function DepositSummaryDisclosure({
  className,
  estimateStateTxs,
  displayedInfoCardType,
  productId,
  triggerOpen,
  symbol,
}: Props) {
  const { current: currentState, estimated: estimatedState } =
    useCollateralEstimateSubaccountInfoChange({
      productId,
      estimateStateTxs,
    });

  const metricItems: LineItemMetricWithEstimationProps[] = useMemo(
    () => [
      {
        label: 'Balance',
        currentValue: currentState?.vertexBalance,
        estimatedValue: estimatedState?.vertexBalance,
        renderValue: CustomNumberFormatSpecifier.NUMBER_AUTO,
        valueEndElement: symbol,
      },
      {
        label: 'Account Value',
        currentValue: currentState?.accountValueUsd,
        estimatedValue: estimatedState?.accountValueUsd,
        renderValue: PresetNumberFormatSpecifier.CURRENCY_2DP,
      },
      {
        label: 'Margin Usage',
        currentValue: currentState?.marginUsageBounded,
        estimatedValue: estimatedState?.marginUsageBounded,
        renderValue: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
      },
    ],
    [currentState, estimatedState, symbol],
  );

  const vrtxMarginInfoContent = (() => {
    if (displayedInfoCardType !== 'vrtx') {
      return null;
    }

    return (
      <span className="text-accent text-center text-xs">
        {VRTX_TOKEN_INFO.symbol} <span className="font-bold">does not</span>{' '}
        contribute to your account margin.
      </span>
    );
  })();

  const content = (
    <div className="flex flex-col gap-y-2 px-3 pb-2.5">
      {metricItems.map(
        (
          { currentValue, estimatedValue, label, renderValue, valueEndElement },
          index,
        ) => (
          <LineItem.MetricWithEstimation
            key={index}
            label={label}
            currentValue={currentValue}
            estimatedValue={estimatedValue}
            renderValue={renderValue}
            valueEndElement={valueEndElement}
            arrowClassName="text-positive"
          />
        ),
      )}
      {vrtxMarginInfoContent}
    </div>
  );

  return (
    <ActionSummary.Disclosure
      className={className}
      expandableContent={content}
      labelContent="Summary"
      triggerOpen={triggerOpen}
      isHighlighted={triggerOpen}
    />
  );
}
