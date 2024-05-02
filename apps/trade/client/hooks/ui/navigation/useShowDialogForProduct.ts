import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { DialogType } from 'client/modules/app/dialogs/types';
import {
  depositProductIdAtom,
  provideLiquidityProductIdAtom,
  withdrawLiquidityProductIdAtom,
  withdrawProductIdAtom,
} from 'client/store/collateralStore';
import { useAtom } from 'jotai';
import { useCallback } from 'react';

interface Params {
  dialogType: Extract<
    DialogType,
    | 'deposit'
    | 'withdraw'
    | 'repay'
    | 'borrow'
    | 'provide_liquidity'
    | 'withdraw_liquidity'
  >;
  productId: number;
}

export function useShowDialogForProduct() {
  const { show } = useDialog();
  const [, setDepositProductId] = useAtom(depositProductIdAtom);
  const [, setWithdrawProductId] = useAtom(withdrawProductIdAtom);
  const [, setProvideLpProductId] = useAtom(provideLiquidityProductIdAtom);
  const [, setWithdrawLpProductId] = useAtom(withdrawLiquidityProductIdAtom);

  return useCallback(
    ({ dialogType, productId }: Params) => {
      const setAtomFn: (val: number) => void = (() => {
        switch (dialogType) {
          case 'deposit':
            return setDepositProductId;
          case 'repay':
            return setDepositProductId;
          case 'withdraw':
            return setWithdrawProductId;
          case 'borrow':
            return setWithdrawProductId;
          case 'provide_liquidity':
            return setProvideLpProductId;
          case 'withdraw_liquidity':
            return setWithdrawLpProductId;
        }
      })();
      setAtomFn(productId);
      show({
        type: dialogType,
        params: {},
      });
    },
    [
      setDepositProductId,
      setWithdrawProductId,
      setProvideLpProductId,
      setWithdrawLpProductId,
      show,
    ],
  );
}
