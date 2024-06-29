import { BigDecimal } from '@vertex-protocol/client';
import { joinClassNames } from '@vertex-protocol/web-common';
import { SecondaryButton } from '@vertex-protocol/web-ui';
import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { useUserActionState } from 'client/hooks/subaccount/useUserActionState';
import { useShowDialogForProduct } from 'client/hooks/ui/navigation/useShowDialogForProduct';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { ARB_CHAIN_IDS } from 'client/modules/envSpecificContent/consts/chainIds';
import { useIsEnabledForChainIds } from 'client/modules/envSpecificContent/hooks/useIsEnabledForChainIds';
import { useMemo } from 'react';
import { getTableButtonOnClickHandler } from '../utils/getTableButtonOnClickHandler';

interface ButtonConfig {
  label: string;
  onClick: () => void;
  disabled: boolean;
}

interface SpotActionButtonCellProps extends TableCellProps {
  productId: number;
  balanceAmount: BigDecimal;
}

export function SpotActionButtonCell({
  productId,
  balanceAmount,
  className,
  ...rest
}: SpotActionButtonCellProps) {
  const userActionState = useUserActionState();
  const showDialogForProduct = useShowDialogForProduct();
  const { show } = useDialog();
  const { protocolTokenMetadata } = useVertexMetadataContext();
  const canShowStakeAction = useIsEnabledForChainIds(ARB_CHAIN_IDS);

  const isNegativeBalance = balanceAmount.isNegative();
  const isDepositRepayStakeDisabled = userActionState === 'block_all';
  const isWithdrawOrBorrowDisabled = userActionState !== 'allow_all';

  const buttonConfigs: ButtonConfig[] = useMemo(() => {
    const showStake =
      canShowStakeAction && productId === protocolTokenMetadata.productId;

    const configs = [
      {
        label: isNegativeBalance ? 'Repay' : 'Deposit',
        onClick: () => {
          showDialogForProduct({
            dialogType: isNegativeBalance ? 'repay' : 'deposit',
            productId,
          });
        },
        disabled: isDepositRepayStakeDisabled,
      },
      {
        label: 'Withdraw',
        onClick: () =>
          showDialogForProduct({ dialogType: 'withdraw', productId }),
        disabled: isWithdrawOrBorrowDisabled,
      },
      {
        label: 'Borrow',
        onClick: () =>
          showDialogForProduct({ dialogType: 'borrow', productId }),
        disabled: isWithdrawOrBorrowDisabled,
      },
    ];

    if (showStake) {
      configs.unshift({
        label: 'Stake',
        onClick: () => show({ type: 'stake_vrtx', params: {} }),
        disabled: isDepositRepayStakeDisabled,
      });
    }

    return configs;
  }, [
    canShowStakeAction,
    productId,
    protocolTokenMetadata.productId,
    isNegativeBalance,
    isDepositRepayStakeDisabled,
    isWithdrawOrBorrowDisabled,
    showDialogForProduct,
    show,
  ]);

  return (
    <TableCell
      className={joinClassNames(
        'pointer-events-auto flex items-center gap-x-3 px-2',
        className,
      )}
      {...rest}
    >
      {buttonConfigs.map(({ label, disabled, onClick }) => (
        <SecondaryButton
          key={label}
          size="sm"
          className="w-24"
          onClick={getTableButtonOnClickHandler(onClick)}
          disabled={disabled}
        >
          {label}
        </SecondaryButton>
      ))}
    </TableCell>
  );
}
