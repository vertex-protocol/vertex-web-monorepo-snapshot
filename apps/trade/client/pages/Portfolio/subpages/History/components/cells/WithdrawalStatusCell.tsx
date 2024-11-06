import { BigDecimal } from '@vertex-protocol/client';
import { joinClassNames } from '@vertex-protocol/web-common';
import { Icons, SecondaryButton } from '@vertex-protocol/web-ui';
import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { DefinitionTooltip } from 'client/modules/tooltips/DefinitionTooltip/DefinitionTooltip';

interface Props extends TableCellProps {
  isProcessing: boolean | undefined;
  hasWithdrawPoolLiquidity: boolean;
  productId: number;
  submissionIndex: string;
  amount: BigDecimal;
}

export function WithdrawalStatusCell({
  isProcessing,
  className,
  hasWithdrawPoolLiquidity,
  productId,
  submissionIndex,
  amount,
  ...rest
}: Props) {
  const { show } = useDialog();

  const cellContent = (() => {
    // In case when is not yet loaded. We don't render anything.
    if (isProcessing == null) {
      return null;
    }

    if (isProcessing) {
      return (
        <div className="flex items-center gap-x-6">
          <div className="flex items-center gap-x-1">
            <Icons.Clock size={16} className="text-accent" />
            <DefinitionTooltip definitionId="historicalWithdrawalsProcessing">
              Processing
            </DefinitionTooltip>
          </div>
          {hasWithdrawPoolLiquidity && (
            <SecondaryButton
              size="sm"
              onClick={() =>
                show({
                  type: 'fast_withdraw',
                  params: {
                    productId,
                    submissionIndex,
                    withdrawalSize: amount.abs(),
                  },
                })
              }
            >
              Fast Withdraw
            </SecondaryButton>
          )}
        </div>
      );
    }

    return (
      <div className="flex items-center gap-x-1">
        <Icons.CheckCircle size={16} className="text-positive" />
        Confirmed
      </div>
    );
  })();

  return (
    <TableCell
      {...rest}
      className={joinClassNames(
        'text-text-primary pointer-events-auto text-xs',
        className,
      )}
    >
      {cellContent}
    </TableCell>
  );
}
