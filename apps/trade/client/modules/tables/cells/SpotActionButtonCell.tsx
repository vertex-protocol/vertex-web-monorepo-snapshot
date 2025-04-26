import { BigDecimal, VLP_PRODUCT_ID } from '@vertex-protocol/client';
import { useVertexMetadataContext } from '@vertex-protocol/react-client';
import { joinClassNames } from '@vertex-protocol/web-common';
import {
  ButtonAsHTMLButtonProps,
  IconButton,
  IconComponent,
  Icons,
  PrimaryButton,
  SecondaryButton,
} from '@vertex-protocol/web-ui';
import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';
import { SpotMoreActionsDropdownMenu } from 'client/components/SpotMoreActionsDropdownMenu';
import { useShowDialogForProduct } from 'client/hooks/ui/navigation/useShowDialogForProduct';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { ROUTES } from 'client/modules/app/consts/routes';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useEnabledFeatures } from 'client/modules/envSpecificContent/hooks/useEnabledFeatures';
import { getTableButtonOnClickHandler } from 'client/modules/tables/utils/getTableButtonOnClickHandler';
import { useRouter } from 'next/navigation';

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
  const { push } = useRouter();
  const { protocolTokenMetadata } = useVertexMetadataContext();
  const { isStakeActionEnabled, isVlpEnabled } = useEnabledFeatures();

  const disableActions = !isConnected;
  const showStake =
    isStakeActionEnabled && productId === protocolTokenMetadata.productId;
  const showVlp = isVlpEnabled && productId === VLP_PRODUCT_ID;

  return (
    <TableCell
      className={joinClassNames('pointer-events-auto flex', className)}
      {...rest}
    >
      <div className="flex gap-x-2 px-2">
        {showVlp && (
          <PrimaryButton
            size="xs"
            className="w-24"
            onClick={getTableButtonOnClickHandler(() => push(ROUTES.vlp))}
            disabled={disableActions}
          >
            VLP Page
          </PrimaryButton>
        )}
        {showStake && (
          <PrimaryButton
            size="xs"
            className="w-24"
            onClick={getTableButtonOnClickHandler(() =>
              show({ type: 'stake_v2_vrtx', params: {} }),
            )}
            disabled={disableActions}
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
          disabled={disableActions}
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
          disabled={disableActions}
        />
        <SpotMoreActionsDropdownMenu
          productId={productId}
          balanceAmount={balanceAmount}
        />
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
