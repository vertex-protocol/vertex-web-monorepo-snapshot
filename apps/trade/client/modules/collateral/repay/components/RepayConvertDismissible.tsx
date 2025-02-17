import { WithClassnames } from '@vertex-protocol/web-common';
import { UserDisclosureDismissibleCard } from 'client/components/Disclosure/UserDisclosureDismissibleCard';
import { useVertexMetadataContext } from '@vertex-protocol/react-client';

export function RepayConvertDismissible({ className }: WithClassnames) {
  const {
    primaryQuoteToken: { symbol: primaryQuoteSymbol },
  } = useVertexMetadataContext();
  return (
    <UserDisclosureDismissibleCard
      className={className}
      disclosureKey="repay_convert_info"
      title="Convert Repay"
      description={`Convert is a feature that lets you easily sell (convert) a positive balance to repay borrowed assets. This feature is only supported for markets with ${primaryQuoteSymbol} as the quote currency.`}
    />
  );
}
