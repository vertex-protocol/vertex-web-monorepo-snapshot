import { LineItem } from 'client/components/LineItem/LineItem';
import { BalancesButtons } from 'client/modules/tables/detailDialogs/components/BalancesButtons';
import { ProductHeader } from 'client/modules/tables/detailDialogs/components/ProductHeader';
import { TableDetailDialog } from 'client/modules/tables/detailDialogs/components/base/TableDetailDialog';
import { SpotBalanceTableItem } from 'client/modules/tables/hooks/useSpotBalancesTable';
import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from 'client/utils/formatNumber/NumberFormatSpecifier';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';

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
      <LineItem.Metric
        label="Balance"
        renderValue={(val) => (
          <div className="flex gap-x-1">
            {formatNumber(val?.balanceAmount, {
              formatSpecifier: CustomNumberFormatSpecifier.NUMBER_AUTO,
            })}
            <div className="text-text-tertiary">
              (
              {formatNumber(val?.balanceAmountValueUsd, {
                formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
              })}
              )
            </div>
          </div>
        )}
        value={{ balanceAmount, balanceAmountValueUsd }}
      />
      <LineItem.Metric
        label="Deposit APR"
        renderValue={PresetNumberFormatSpecifier.PERCENTAGE_2DP}
        value={depositAPR}
      />
      <LineItem.Metric
        label="Borrow APR"
        renderValue={PresetNumberFormatSpecifier.PERCENTAGE_2DP}
        value={borrowAPR}
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
