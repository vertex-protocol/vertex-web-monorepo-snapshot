import {
  BigDecimal,
  QUOTE_PRODUCT_ID,
  removeDecimals,
} from '@vertex-protocol/client';
import { useVertexMetadataContext } from '@vertex-protocol/react-client';
import { useSubaccountNames } from 'client/context/subaccount/hooks/useSubaccountNames';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useMaxWithdrawableAmount } from 'client/hooks/query/subaccount/useMaxWithdrawableAmount';
import { useSubaccountSummary } from 'client/hooks/query/subaccount/subaccountSummary/useSubaccountSummary';
import { AnnotatedSubaccountSummary } from 'client/hooks/query/subaccount/subaccountSummary/annotateSubaccountSummary';
import { useSavedSubaccountSigningPreference } from 'client/modules/singleSignatureSessions/hooks/useSavedSubaccountSigningPreference';
import { SUBACCOUNT_QUOTE_TRANSFER_FEE } from 'client/modules/subaccounts/consts';
import { SubaccountProfile } from 'client/modules/subaccounts/types';
import { useMemo } from 'react';

export interface QuoteTransferSubaccount {
  subaccountName: string;
  profile: SubaccountProfile;
  decimalAdjustedQuoteProductBalance: BigDecimal | undefined;
}

interface Params {
  senderSubaccountName: string;
  recipientSubaccountName: string;
  enableBorrows: boolean;
}

export function useSubaccountQuoteTransferFormData({
  senderSubaccountName,
  recipientSubaccountName,
  enableBorrows,
}: Params) {
  const { currentSubaccount, getSubaccountProfile } = useSubaccountContext();
  const { all: fetchedSubaccountNames } = useSubaccountNames();

  const { data: maxWithdrawable } = useMaxWithdrawableAmount({
    subaccountName: senderSubaccountName,
    spotLeverage: enableBorrows,
  });

  const { data: senderSubaccountSummary } = useSubaccountSummary({
    subaccountName: senderSubaccountName,
  });

  const { data: recipientSubaccountSummary } = useSubaccountSummary({
    subaccountName: recipientSubaccountName,
  });

  const subaccounts: QuoteTransferSubaccount[] = useMemo(() => {
    return Array.from(
      // If we're adding a new subaccount it will be set as the current subaccount but won't be
      // included in the fetched subaccount names, so we ensure that it's always includes here.
      new Set(fetchedSubaccountNames).add(currentSubaccount.name),
    ).map((subaccountName) => ({
      subaccountName,
      profile: getSubaccountProfile(subaccountName),
      decimalAdjustedQuoteProductBalance: undefined,
    }));
  }, [currentSubaccount.name, fetchedSubaccountNames, getSubaccountProfile]);

  const senderSubaccount: QuoteTransferSubaccount = useMemo(() => {
    return getQuoteTransferSubaccount(
      senderSubaccountName,
      senderSubaccountSummary,
      getSubaccountProfile,
    );
  }, [senderSubaccountName, senderSubaccountSummary, getSubaccountProfile]);

  const recipientSubaccount: QuoteTransferSubaccount = useMemo(() => {
    return getQuoteTransferSubaccount(
      recipientSubaccountName,
      recipientSubaccountSummary,
      getSubaccountProfile,
    );
  }, [
    recipientSubaccountName,
    recipientSubaccountSummary,
    getSubaccountProfile,
  ]);

  // BE returns max withdrawable exclusive of the transfer fee.
  // The FE input amount is inclusive of the fee, so we need to add the fee to the backend data.
  const decimalAdjustedMaxWithdrawableWithFee = (() => {
    if (!maxWithdrawable) {
      return;
    }

    if (maxWithdrawable.isZero()) {
      return maxWithdrawable;
    }

    return removeDecimals(maxWithdrawable).plus(SUBACCOUNT_QUOTE_TRANSFER_FEE);
  })();

  const { signingPreference: senderSigningPreference } =
    useSavedSubaccountSigningPreference(senderSubaccountName);

  const { primaryQuoteToken } = useVertexMetadataContext();
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();

  return {
    subaccounts,
    senderSubaccount,
    recipientSubaccount,
    decimalAdjustedMaxWithdrawableWithFee,
    senderSigningPreference,
    primaryQuoteToken,
    primaryQuotePriceUsd,
  };
}

function getQuoteTransferSubaccount(
  subaccountName: string,
  subaccountSummary: AnnotatedSubaccountSummary | undefined,
  getSubaccountProfile: (subaccount: string) => SubaccountProfile,
): QuoteTransferSubaccount {
  const quoteProductBalance = subaccountSummary?.balances.find(
    (balance) => balance.productId === QUOTE_PRODUCT_ID,
  )?.amount;

  const decimalAdjustedQuoteProductBalance =
    removeDecimals(quoteProductBalance);

  return {
    subaccountName,
    profile: getSubaccountProfile(subaccountName),
    decimalAdjustedQuoteProductBalance,
  };
}
