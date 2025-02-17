import { BigDecimal, removeDecimals } from '@vertex-protocol/utils';
import { useAllDepositableTokenBalances } from 'client/hooks/query/subaccount/useAllDepositableTokenBalances';
import { useSpotBalances } from 'client/hooks/subaccount/useSpotBalances';
import { useShowDialogForProduct } from 'client/hooks/ui/navigation/useShowDialogForProduct';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { CollateralDialogType } from 'client/modules/app/dialogs/types';
import { signDependentValue } from '@vertex-protocol/react-client';
import {
  SpotProductMetadata,
  MarketCategory,
} from '@vertex-protocol/react-client';
import { useMemo } from 'react';

export interface BalanceTableItem {
  metadata: SpotProductMetadata;
  productId: number;
  amount: BigDecimal;
  walletAmount: BigDecimal | undefined;
  actionText: string;
  action: () => void;
  searchKey: string;
  type: 'balances';
}

interface Params {
  marketCategory: MarketCategory | undefined;
}

export const useCommandCenterBalanceItems = ({ marketCategory }: Params) => {
  const { balances: spotBalances } = useSpotBalances();
  const { data: depositableTokenBalances } = useAllDepositableTokenBalances();
  const showDialogForProduct = useShowDialogForProduct();
  const isConnected = useIsConnected();

  const mappedData: BalanceTableItem[] = useMemo(() => {
    if (!spotBalances) {
      return [];
    }

    const isDepositOrRepayDisabled = !isConnected;
    const isWithdrawOrBorrowDisabled = !isConnected;

    return spotBalances
      .filter(
        (balance) =>
          marketCategory == null ||
          balance.metadata.marketCategories.has(marketCategory),
      )
      .flatMap((balance) => {
        const walletAmount = removeDecimals(
          depositableTokenBalances?.[balance.productId],
          balance.metadata.token.tokenDecimals,
        );

        const { metadata, productId, amount } = balance;
        const balanceData = {
          metadata,
          productId,
          amount,
          walletAmount,
          type: 'balances' as const,
        };

        const balanceDataToReturn: BalanceTableItem[] = [];

        const dialogTypes: CollateralDialogType[] = signDependentValue(amount, {
          positive: ['deposit', 'borrow', 'withdraw'],
          negative: ['deposit', 'borrow', 'repay'],
          zero: ['deposit', 'borrow'],
        });

        dialogTypes.forEach((dialogType) => {
          const isDepositOrRepay = ['deposit', 'repay'].includes(dialogType);
          const isWithdrawOrBorrow = ['withdraw', 'borrow'].includes(
            dialogType,
          );

          if (
            (isDepositOrRepay && isDepositOrRepayDisabled) ||
            (isWithdrawOrBorrow && isWithdrawOrBorrowDisabled)
          ) {
            return;
          }

          balanceDataToReturn.push({
            ...balanceData,
            actionText: dialogType,
            action: () => showDialogForProduct({ dialogType, productId }),
            searchKey: `${balance.metadata.token.symbol}-${dialogType}`,
          });
        });

        return balanceDataToReturn;
      });
  }, [
    spotBalances,
    isConnected,
    marketCategory,
    depositableTokenBalances,
    showDialogForProduct,
  ]);

  return { balances: mappedData };
};
