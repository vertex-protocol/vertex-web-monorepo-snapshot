import {
  BigDecimal,
  QUOTE_PRODUCT_ID,
  SubaccountTx,
} from '@vertex-protocol/client';
import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { WithClassnames } from '@vertex-protocol/web-common';
import { Divider } from '@vertex-protocol/web-ui';
import { ActionSummary } from 'client/components/ActionSummary';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { ValueWithLabelProps } from 'client/components/ValueWithLabel/types';
import { useCollateralEstimateSubaccountInfoChange } from 'client/modules/collateral/hooks/useCollateralEstimateSubaccountInfoChange';
import { QuoteTransferSubaccount } from 'client/modules/subaccounts/hooks/useSubaccountQuoteTransferForm/useSubaccountQuoteTransferFormData';
import { useMemo } from 'react';

interface Props extends WithClassnames {
  senderSubaccount: QuoteTransferSubaccount;
  recipientSubaccount: QuoteTransferSubaccount;
  senderEstimateStateTxs: SubaccountTx[];
  recipientEstimateStateTxs: SubaccountTx[];
  senderQuoteBalanceDelta: BigDecimal | undefined;
  recipientQuoteBalanceDelta: BigDecimal | undefined;
  symbol: string;
}

export function SubaccountQuoteTransferSummaryDisclosure({
  className,
  senderSubaccount,
  recipientSubaccount,
  senderEstimateStateTxs,
  recipientEstimateStateTxs,
  senderQuoteBalanceDelta,
  recipientQuoteBalanceDelta,
  symbol,
}: Props) {
  const content = (
    <>
      <SummarySection
        subaccount={senderSubaccount}
        estimateStateTxs={senderEstimateStateTxs}
        quoteBalanceDelta={senderQuoteBalanceDelta}
        symbol={symbol}
      />
      <Divider />
      <SummarySection
        subaccount={recipientSubaccount}
        estimateStateTxs={recipientEstimateStateTxs}
        quoteBalanceDelta={recipientQuoteBalanceDelta}
        symbol={symbol}
      />
    </>
  );

  return (
    <ActionSummary.Disclosure
      className={className}
      expandableContent={content}
      labelContent="Summary"
    />
  );
}

interface SummarySectionParams {
  subaccount: QuoteTransferSubaccount;
  estimateStateTxs: SubaccountTx[];
  quoteBalanceDelta: BigDecimal | undefined;
  symbol: string;
}

function SummarySection({
  subaccount,
  estimateStateTxs,
  quoteBalanceDelta,
  symbol,
}: SummarySectionParams) {
  const { subaccountName, profile } = subaccount;

  const { current, estimated } = useCollateralEstimateSubaccountInfoChange({
    productId: QUOTE_PRODUCT_ID,
    estimateStateTxs,
    subaccountName,
  });

  const metricItems: ValueWithLabelProps[] = useMemo(() => {
    return [
      {
        label: 'Margin Usage',
        value: current?.marginUsageBounded,
        newValue: estimated?.marginUsageBounded,
        numberFormatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
      },
      {
        label: 'Liq. Risk',
        value: current?.liquidationRiskBounded,
        newValue: estimated?.liquidationRiskBounded,
        numberFormatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
      },
    ];
  }, [current, estimated]);

  return (
    <>
      <p className="text-xs">{profile.username}</p>
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Balance Change"
        value={quoteBalanceDelta}
        numberFormatSpecifier={CustomNumberFormatSpecifier.SIGNED_NUMBER_AUTO}
        valueEndElement={symbol}
      />
      {metricItems.map((props, index) => (
        <ValueWithLabel.Horizontal key={index} sizeVariant="xs" {...props} />
      ))}
    </>
  );
}
