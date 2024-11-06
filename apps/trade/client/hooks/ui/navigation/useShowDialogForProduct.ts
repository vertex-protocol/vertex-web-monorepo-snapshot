import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { DialogType } from 'client/modules/app/dialogs/types';
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
  navBehavior?: 'show' | 'push';
}

export function useShowDialogForProduct() {
  const { show, push } = useDialog();

  return useCallback(
    ({ dialogType, productId, navBehavior = 'show' }: Params) => {
      const navFn = navBehavior === 'push' ? push : show;

      switch (dialogType) {
        case 'provide_liquidity':
        case 'withdraw_liquidity':
          navFn({
            type: dialogType,
            params: {
              productId,
            },
          });
          break;
        case 'borrow':
        case 'deposit':
        case 'repay':
        case 'withdraw':
          navFn({
            type: dialogType,
            params: {
              initialProductId: productId,
            },
          });
      }
    },
    [push, show],
  );
}
