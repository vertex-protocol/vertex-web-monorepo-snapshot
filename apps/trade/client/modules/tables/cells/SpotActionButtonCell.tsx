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
import { clientEnv } from 'common/environment/clientEnv';
import { useMemo } from 'react';
import { getTableButtonOnClickHandler } from '../utils/getTableButtonOnClickHandler';
import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';

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
  const { trackEvent } = useAnalyticsContext();
  const userActionState = useUserActionState();
  const showDialogForProduct = useShowDialogForProduct();
  const { show } = useDialog();
  const { protocolTokenProductId } = useVertexMetadataContext();

  const isNegativeBalance = balanceAmount.isNegative();
  const isDepositRepayStakeDisabled = userActionState === 'block_all';
  const isWithdrawOrBorrowDisabled = userActionState !== 'allow_all';

  const buttonConfigs: ButtonConfig[] = useMemo(() => {
    const isVrtx =
      productId === protocolTokenProductId &&
      clientEnv.base.brandName === 'vertex';

    const configs = [
      {
        label: isNegativeBalance ? 'Repay' : 'Deposit',
        onClick: () => {
          showDialogForProduct({
            dialogType: isNegativeBalance ? 'repay' : 'deposit',
            productId,
          });
          trackEvent({
            type: 'deposit_clicked',
            data: { fromLocation: 'balance_table' },
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

    if (isVrtx) {
      configs.unshift({
        label: 'Stake',
        onClick: () => show({ type: 'stake_vrtx', params: {} }),
        disabled: isDepositRepayStakeDisabled,
      });
    }

    return configs;
  }, [
    isNegativeBalance,
    isDepositRepayStakeDisabled,
    isWithdrawOrBorrowDisabled,
    productId,
    protocolTokenProductId,
    showDialogForProduct,
    show,
    trackEvent,
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
          size="md"
          className="w-24 font-medium"
          onClick={getTableButtonOnClickHandler(onClick)}
          disabled={disabled}
        >
          {label}
        </SecondaryButton>
      ))}
    </TableCell>
  );
}
