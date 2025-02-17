import { BigDecimal } from '@vertex-protocol/client';
import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { Divider } from '@vertex-protocol/web-ui';
import { ActionSummary } from 'client/components/ActionSummary';
import { ValueWithLabelProps } from 'client/components/ValueWithLabel/types';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { useIsolatedAdjustMarginSummary } from 'client/modules/trading/hooks/useIsolatedAdjustMarginForm/useIsolatedAdjustMarginDialogSummary';
import { ReactNode } from 'react';

interface Props {
  isAddMargin: boolean;
  isoSubaccountName: string;
  validAmount: BigDecimal | undefined;
  primaryQuoteTokenSymbol: string;
}

export function IsolatedAdjustMarginDialogSummaryDisclosure({
  isAddMargin,
  isoSubaccountName,
  validAmount,
  primaryQuoteTokenSymbol,
}: Props) {
  return (
    <ActionSummary.Disclosure
      expandableContent={
        <Content
          validAmount={validAmount}
          isAddMargin={isAddMargin}
          isoSubaccountName={isoSubaccountName}
          primaryQuoteTokenSymbol={primaryQuoteTokenSymbol}
        />
      }
      isHighlighted={!!validAmount}
      labelContent="Summary"
    />
  );
}

interface ContentProps {
  validAmount: BigDecimal | undefined;
  isoSubaccountName: string;
  isAddMargin: boolean;
  primaryQuoteTokenSymbol: string;
}

function Content({
  validAmount,
  isAddMargin,
  isoSubaccountName,
  primaryQuoteTokenSymbol,
}: ContentProps) {
  const {
    currentSummary,
    estimatedSummary,
    oraclePrice,
    metadata,
    side,
    marketPriceFormatSpecifier,
  } = useIsolatedAdjustMarginSummary({
    validAmount,
    isoSubaccountName,
    isAddMargin,
  });

  const positionItems = [
    {
      label: 'Position Margin',
      value: currentSummary.isoNetMarginUsd,
      newValue: estimatedSummary?.isoNetMarginUsd,
      numberFormatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
    },
    {
      label: 'Position Leverage',
      value: currentSummary.isoPositionLeverage,
      newValue: estimatedSummary?.isoPositionLeverage,
      numberFormatSpecifier: PresetNumberFormatSpecifier.NUMBER_1DP,
      valueClassName: 'gap-x-0',
      valueEndElement: 'x',
    },
    {
      label: 'Estimated Liq. Price',
      value: currentSummary.isoLiquidationPrice,
      newValue: estimatedSummary?.isoLiquidationPrice,
      numberFormatSpecifier: marketPriceFormatSpecifier,
    },
    {
      label: 'Oracle Price',
      value: oraclePrice,
      numberFormatSpecifier: marketPriceFormatSpecifier,
    },
  ] satisfies ValueWithLabelProps[];

  const accountItems = [
    {
      label: `${primaryQuoteTokenSymbol} Balance`,
      value: currentSummary.crossAccountQuoteBalance,
      newValue: estimatedSummary?.crossAccountQuoteBalance,
      numberFormatSpecifier: PresetNumberFormatSpecifier.NUMBER_2DP,
      valueEndElement: primaryQuoteTokenSymbol,
    },
    {
      label: 'Funds Available',
      value: currentSummary.fundsAvailable,
      newValue: estimatedSummary?.fundsAvailable,
      numberFormatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
    },
    {
      label: 'Margin Usage',
      value: currentSummary.crossMarginUsageFrac,
      newValue: estimatedSummary?.crossMarginUsageFrac,
      numberFormatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
    },
  ] satisfies ValueWithLabelProps[];

  return (
    <>
      <Section
        headerContent={
          <div className="flex items-center gap-x-1">
            {metadata?.marketName}
            <span
              className={side === 'long' ? 'text-positive' : 'text-negative'}
            >
              {side === 'long' ? 'LONG' : 'SHORT'}
            </span>
          </div>
        }
        items={positionItems}
      />
      <Divider />
      <Section
        headerContent={<span className="text-xs">Account Details</span>}
        items={accountItems}
      />
    </>
  );
}

interface SectionProps {
  items: ValueWithLabelProps[];
  headerContent: ReactNode;
}

function Section({ items, headerContent }: SectionProps) {
  return (
    <>
      {headerContent}
      <div className="flex flex-col gap-y-1.5">
        {items.map((item, index) => (
          <ValueWithLabel.Horizontal sizeVariant="xs" key={index} {...item} />
        ))}
      </div>
    </>
  );
}
