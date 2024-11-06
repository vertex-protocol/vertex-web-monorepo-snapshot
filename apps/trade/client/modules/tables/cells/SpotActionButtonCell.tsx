import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { BigDecimal } from '@vertex-protocol/client';
import { useVertexMetadataContext } from '@vertex-protocol/metadata';
import { joinClassNames } from '@vertex-protocol/web-common';
import {
  ButtonAsHTMLButtonProps,
  getStateOverlayClassNames,
  IconButton,
  IconComponent,
  Icons,
  PrimaryButton,
  SecondaryButton,
  TextButton,
} from '@vertex-protocol/web-ui';
import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';
import { useShowDialogForProduct } from 'client/hooks/ui/navigation/useShowDialogForProduct';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useEnabledFeatures } from 'client/modules/envSpecificContent/hooks/useEnabledFeatures';
import { getTableButtonOnClickHandler } from 'client/modules/tables/utils/getTableButtonOnClickHandler';
import { useState } from 'react';

interface SpotActionButtonCellProps extends TableCellProps {
  productId: number;
  balanceAmount: BigDecimal;
  symbol: string;
}

export function SpotActionButtonCell({
  productId,
  balanceAmount,
  className,
  symbol,
  ...rest
}: SpotActionButtonCellProps) {
  const isConnected = useIsConnected();
  const showDialogForProduct = useShowDialogForProduct();
  const { show } = useDialog();
  const { protocolTokenMetadata } = useVertexMetadataContext();
  const { isStakeActionEnabled } = useEnabledFeatures();

  const isDepositRepayStakeDisabled = !isConnected;
  const isWithdrawOrBorrowDisabled = !isConnected;
  const isRepayDisabled = isDepositRepayStakeDisabled || balanceAmount.gte(0);
  const showStake =
    isStakeActionEnabled && productId === protocolTokenMetadata.productId;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMenuDisabled = isWithdrawOrBorrowDisabled && isRepayDisabled;
  const hoverStateOverlayClassNames = getStateOverlayClassNames({
    borderRadiusVariant: 'base',
  });
  const activeStateOverlayClassNames = getStateOverlayClassNames({
    borderRadiusVariant: 'base',
    active: true,
  });

  return (
    <TableCell
      className={joinClassNames('pointer-events-auto flex', className)}
      {...rest}
    >
      <div className="flex gap-x-2 px-2">
        {showStake && (
          <PrimaryButton
            size="xs"
            className="w-24"
            onClick={getTableButtonOnClickHandler(() =>
              show({ type: 'stake_vrtx', params: {} }),
            )}
            disabled={isDepositRepayStakeDisabled}
          >
            Stake
          </PrimaryButton>
        )}
        <ResponsiveActionButton
          label="Deposit"
          symbol={symbol}
          icon={Icons.ArrowDownLeft}
          onClick={getTableButtonOnClickHandler(() => {
            showDialogForProduct({
              dialogType: 'deposit',
              productId,
            });
          })}
          disabled={isDepositRepayStakeDisabled}
        />
        <ResponsiveActionButton
          label="Withdraw"
          symbol={symbol}
          icon={Icons.ArrowUpRight}
          onClick={getTableButtonOnClickHandler(() => {
            showDialogForProduct({
              dialogType: 'withdraw',
              productId,
            });
          })}
          disabled={isWithdrawOrBorrowDisabled}
        />
        {/* we capture isMenuOpen to handle highlight of More button */}
        <DropdownMenu.Root onOpenChange={setIsMenuOpen}>
          <DropdownMenu.Trigger asChild>
            <IconButton
              size="sm"
              icon={Icons.DotsThreeVertical}
              disabled={isMenuDisabled}
              onClick={(event) => {
                event.stopPropagation();
              }}
              className={joinClassNames(
                isMenuOpen && 'text-text-primary',
                isMenuOpen && activeStateOverlayClassNames,
              )}
            />
          </DropdownMenu.Trigger>
          {/* we use Portal to avoid z-fighting with other table rows and overflow issues with the parent table */}
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              side="bottom"
              align="end"
              sideOffset={4}
              className={joinClassNames(
                'flex flex-col',
                'min-w-24 p-1',
                'bg-surface-2 rounded',
                'text-xs',
              )}
              onClick={(event) => {
                /* any click in popover should not trigger row's onClick */
                event.stopPropagation();
              }}
            >
              <DropdownMenu.Item asChild>
                <TextButton
                  disabled={isWithdrawOrBorrowDisabled}
                  className={joinClassNames(
                    'justify-start p-1.5',
                    !isWithdrawOrBorrowDisabled && hoverStateOverlayClassNames,
                  )}
                  onClick={() => {
                    showDialogForProduct({
                      dialogType: 'borrow',
                      productId,
                    });
                  }}
                >
                  Borrow
                </TextButton>
              </DropdownMenu.Item>
              <DropdownMenu.Item asChild>
                <TextButton
                  disabled={isRepayDisabled}
                  className={joinClassNames(
                    'justify-start p-1.5',
                    !isRepayDisabled && hoverStateOverlayClassNames,
                  )}
                  onClick={() => {
                    showDialogForProduct({
                      dialogType: 'repay',
                      productId,
                    });
                  }}
                >
                  Repay
                </TextButton>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </TableCell>
  );
}

/**
 * Renders an IconButton on mobile and SecondaryButton on desktop
 */
function ResponsiveActionButton({
  onClick,
  label,
  symbol,
  icon,
  disabled,
}: Pick<ButtonAsHTMLButtonProps, 'onClick' | 'disabled'> & {
  label: string;
  icon: IconComponent;
  symbol: string;
}) {
  return (
    <>
      <IconButton
        tooltipLabel={`${label} ${symbol}`}
        size="sm"
        icon={icon}
        disabled={disabled}
        onClick={onClick}
        className="lg:hidden"
      />
      <SecondaryButton
        size="sm"
        onClick={onClick}
        disabled={disabled}
        className="hidden lg:flex"
      >
        {label}
      </SecondaryButton>
    </>
  );
}
