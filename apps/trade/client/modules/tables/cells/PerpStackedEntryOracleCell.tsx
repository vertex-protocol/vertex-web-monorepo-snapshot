import { BigDecimal } from '@vertex-protocol/utils';
import { StackedTableCell } from 'client/components/DataTable/cells/StackedTableCell';
import { TableCellProps } from 'client/components/DataTable/cells/TableCell';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { getMarketPriceFormatSpecifier } from 'client/utils/formatNumber/getMarketPriceFormatSpecifier';

interface Props extends TableCellProps {
  averageEntryPrice: BigDecimal;
  oraclePrice: BigDecimal;
  priceIncrement: BigDecimal;
}

export function PerpStackedEntryOracleCell({
  averageEntryPrice,
  oraclePrice,
  priceIncrement,
  className,
  ...rest
}: Props) {
  const formatSpecifier = getMarketPriceFormatSpecifier(priceIncrement);
  const formattedEntryPrice = formatNumber(averageEntryPrice, {
    formatSpecifier,
  });
  const formattedOraclePrice = formatNumber(oraclePrice, {
    formatSpecifier,
  });
  return (
    <StackedTableCell
      className={className}
      top={formattedOraclePrice}
      bottom={<div className="text-text-secondary">{formattedEntryPrice}</div>}
      {...rest}
    />
  );
}
