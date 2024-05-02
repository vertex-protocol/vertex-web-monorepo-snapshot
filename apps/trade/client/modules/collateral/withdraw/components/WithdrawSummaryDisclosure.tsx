import { SubaccountTx } from '@vertex-protocol/engine-client';
import { WithClassnames } from '@vertex-protocol/web-common';
import { ActionSummary } from 'client/components/ActionSummary';
import { LineItem } from 'client/components/LineItem/LineItem';

import { BigDecimal } from '@vertex-protocol/client';
import { LineItemMetricWithEstimationProps } from 'client/components/LineItem/types';
import { useCollateralEstimateSubaccountInfoChange } from 'client/modules/collateral/hooks/useCollateralEstimateSubaccountInfoChange';
import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from 'client/utils/formatNumber/NumberFormatSpecifier';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { useMemo } from 'react';

interface Props extends WithClassnames {
  estimateStateTxs: SubaccountTx[];
  productId?: number;
  feeAmount: BigDecimal | undefined;
  triggerOpen?: boolean;
  enableBorrows?: boolean;
  symbol?: string;
}

export function WithdrawSummaryDisclosure({
  className,
  estimateStateTxs,
  productId,
  triggerOpen,
  enableBorrows,
  feeAmount,
  symbol,
}: Props) {
  const { current: currentState, estimated: estimatedState } =
    useCollateralEstimateSubaccountInfoChange({
      productId,
      estimateStateTxs,
    });

  const metricItems = useMemo(() => {
    const borrowingAmount = estimatedState?.borrowedAmount?.minus(
      currentState?.borrowedAmount ?? 0,
    );
    const borrowingAmountUsd = estimatedState?.borrowedValueUsd?.minus(
      currentState?.borrowedValueUsd ?? 0,
    );
    const items: LineItemMetricWithEstimationProps[] = [
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
      {
        label: 'Fee',
        currentValue: feeAmount,
        renderValue: CustomNumberFormatSpecifier.NUMBER_PRECISE,
        valueEndElement: symbol,
      },
    ];
    if (enableBorrows) {
      items.unshift({
        label: 'Amount to Borrow',
        currentValue: borrowingAmount,
        renderValue: (val) => {
          return (
            <div className="flex items-center gap-x-1">
              {formatNumber(val, {
                formatSpecifier: CustomNumberFormatSpecifier.NUMBER_AUTO,
                defaultValue: 0,
              })}
              <span className="text-text-tertiary">
                {symbol} (
                {formatNumber(borrowingAmountUsd, {
                  formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
                  defaultValue: 0,
                })}
                )
              </span>
            </div>
          );
        },
      });
    }
    return items;
  }, [currentState, estimatedState, feeAmount, symbol, enableBorrows]);

  const content = (
    <div className="flex w-full flex-col gap-y-2 px-3 pb-3">
      {metricItems.map(
        (
          {
            label,
            renderValue,
            currentValue,
            estimatedValue,
            tooltip,
            valueEndElement,
          },
          index,
        ) => (
          <LineItem.MetricWithEstimation
            key={index}
            label={label}
            currentValue={currentValue}
            estimatedValue={estimatedValue}
            renderValue={renderValue}
            tooltip={tooltip}
            valueEndElement={valueEndElement}
          />
        ),
      )}
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
