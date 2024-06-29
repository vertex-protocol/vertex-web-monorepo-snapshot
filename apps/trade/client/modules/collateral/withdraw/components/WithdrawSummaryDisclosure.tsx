import { SubaccountTx } from '@vertex-protocol/engine-client';
import { WithClassnames } from '@vertex-protocol/web-common';
import { ActionSummary } from 'client/components/ActionSummary';

import { BigDecimal } from '@vertex-protocol/client';
import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
  formatNumber,
} from '@vertex-protocol/react-client';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { ValueWithLabelProps } from 'client/components/ValueWithLabel/types';
import { useCollateralEstimateSubaccountInfoChange } from 'client/modules/collateral/hooks/useCollateralEstimateSubaccountInfoChange';
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
    const items: ValueWithLabelProps[] = [
      {
        label: 'Balance',
        value: currentState?.vertexBalance,
        newValue: estimatedState?.vertexBalance,
        numberFormatSpecifier: CustomNumberFormatSpecifier.NUMBER_AUTO,
        valueEndElement: symbol,
      },
      {
        label: 'Account Value',
        value: currentState?.accountValueUsd,
        newValue: estimatedState?.accountValueUsd,
        numberFormatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
      },
      {
        label: 'Margin Usage',
        value: currentState?.marginUsageBounded,
        newValue: estimatedState?.marginUsageBounded,
        numberFormatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
      },
      {
        label: 'Fee',
        value: feeAmount,
        numberFormatSpecifier: CustomNumberFormatSpecifier.NUMBER_PRECISE,
        valueEndElement: symbol,
      },
    ];
    if (enableBorrows) {
      items.unshift({
        label: 'Amount to Borrow',
        valueContent: (
          <>
            {formatNumber(borrowingAmount, {
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
          </>
        ),
      });
    }
    return items;
  }, [currentState, estimatedState, feeAmount, symbol, enableBorrows]);

  const content = (
    <div className="flex w-full flex-col gap-y-2 px-3 pb-3">
      {metricItems.map((itemProps, index) => (
        <ValueWithLabel.Horizontal
          sizeVariant="xs"
          key={index}
          {...itemProps}
        />
      ))}
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
