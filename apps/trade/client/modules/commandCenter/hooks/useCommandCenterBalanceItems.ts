import { ProductEngineType } from '@vertex-protocol/client';
import { BigDecimal, removeDecimals } from '@vertex-protocol/utils';
import { useAllDepositableTokenBalances } from 'client/hooks/query/subaccount/useAllDepositableTokenBalances';
import { useSpotBalances } from 'client/hooks/subaccount/useSpotBalances';
import { useUserActionState } from 'client/hooks/subaccount/useUserActionState';
import { useShowDialogForProduct } from 'client/hooks/ui/navigation/useShowDialogForProduct';
import { CollateralDialogType } from 'client/modules/app/dialogs/types';
import { signDependentValue } from 'client/utils/signDependentValue';
import { SpotProductMetadata } from 'common/productMetadata/types';
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
  marketType: ProductEngineType | undefined;
}

export const useCommandCenterBalanceItems = ({ marketType }: Params) => {
  const { balances: spotBalances } = useSpotBalances();
  const { data: depositableTokenBalances } = useAllDepositableTokenBalances();
  const userActionState = useUserActionState();
  const showDialogForProduct = useShowDialogForProduct();

  const mappedData: BalanceTableItem[] = useMemo(() => {
    if (!spotBalances || marketType === ProductEngineType.PERP) {
      return [];
    }

    const isDepositOrRepayDisabled = userActionState === 'block_all';
    const isWithdrawOrBorrowDisabled = userActionState !== 'allow_all';

    return spotBalances.flatMap((balance) => {
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
        const isWithdrawOrBorrow = ['withdraw', 'borrow'].includes(dialogType);

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
    depositableTokenBalances,
    userActionState,
    marketType,
    showDialogForProduct,
  ]);

  return { balances: mappedData };
};
