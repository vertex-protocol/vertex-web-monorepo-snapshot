import { SubaccountTx } from '@vertex-protocol/engine-client';
import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
  VRTX_TOKEN_INFO,
} from '@vertex-protocol/react-client';
import { WithClassnames } from '@vertex-protocol/web-common';
import { ActionSummary } from 'client/components/ActionSummary';
import { ValueWithLabelProps } from 'client/components/ValueWithLabel/types';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { DepositInfoCardType } from 'client/modules/collateral/deposit/types';
import { useCollateralEstimateSubaccountInfoChange } from 'client/modules/collateral/hooks/useCollateralEstimateSubaccountInfoChange';
import { useMemo } from 'react';

interface Props extends WithClassnames {
  estimateStateTxs: SubaccountTx[];
  displayedInfoCardType?: DepositInfoCardType;
  productId?: number;
  isHighlighted?: boolean;
  symbol?: string;
}

export function DepositSummaryDisclosure({
  className,
  estimateStateTxs,
  displayedInfoCardType,
  productId,
  isHighlighted,
  symbol,
}: Props) {
  const { current: currentState, estimated: estimatedState } =
    useCollateralEstimateSubaccountInfoChange({
      productId,
      estimateStateTxs,
    });

  const metricItems = useMemo(
    () =>
      [
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
      ] satisfies ValueWithLabelProps[],
    [currentState, estimatedState, symbol],
  );

  const vrtxMarginInfoContent = (() => {
    if (displayedInfoCardType !== 'vrtx_margin') {
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
    <>
      {metricItems.map(
        (
          { numberFormatSpecifier, label, value, newValue, valueEndElement },
          index,
        ) => (
          <ValueWithLabel.Horizontal
            key={index}
            sizeVariant="xs"
            label={label}
            value={value}
            newValue={newValue}
            numberFormatSpecifier={numberFormatSpecifier}
            valueEndElement={valueEndElement}
            changeArrowClassName="text-positive"
          />
        ),
      )}
      {vrtxMarginInfoContent}
    </>
  );

  return (
    <ActionSummary.Disclosure
      className={className}
      expandableContent={content}
      labelContent="Summary"
      isHighlighted={isHighlighted}
    />
  );
}
