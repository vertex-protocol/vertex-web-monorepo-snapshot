import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
  formatNumber,
} from '@vertex-protocol/react-client';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { BalancesButtons } from 'client/modules/tables/detailDialogs/components/BalancesButtons';
import { ProductHeader } from 'client/modules/tables/detailDialogs/components/ProductHeader';
import { TableDetailDialog } from 'client/modules/tables/detailDialogs/components/base/TableDetailDialog';
import { SpotBalanceTableItem } from 'client/modules/tables/hooks/useSpotBalancesTable';

export type SpotBalanceDetailsDialogParams = SpotBalanceTableItem;

export function SpotBalanceDetailsDialog({
  productId,
  metadata,
  balanceInfo,
  depositAPR,
  borrowAPR,
}: SpotBalanceDetailsDialogParams) {
  const { icon, symbol } = metadata.token;

  const { amount: balanceAmount, valueUsd: balanceAmountValueUsd } =
    balanceInfo;

  const header = (
    <ProductHeader isPerp={false} iconSrc={icon.asset} productName={symbol} />
  );

  const metricItems = (
    <div className="flex flex-col gap-y-4">
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Balance"
        value={balanceAmount}
        numberFormatSpecifier={CustomNumberFormatSpecifier.NUMBER_AUTO}
        valueEndElement={
          <span>
            (
            {formatNumber(balanceAmountValueUsd, {
              formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
            })}
            )
          </span>
        }
      />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Deposit APR"
        value={depositAPR}
        numberFormatSpecifier={PresetNumberFormatSpecifier.PERCENTAGE_2DP}
      />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Borrow APR"
        value={borrowAPR}
        numberFormatSpecifier={PresetNumberFormatSpecifier.PERCENTAGE_2DP}
      />
    </div>
  );

  const actions = (
    <BalancesButtons productId={productId} balanceAmount={balanceAmount} />
  );

  return (
    <TableDetailDialog
      title="Balances"
      header={header}
      metricItems={metricItems}
      actions={actions}
    />
  );
}
