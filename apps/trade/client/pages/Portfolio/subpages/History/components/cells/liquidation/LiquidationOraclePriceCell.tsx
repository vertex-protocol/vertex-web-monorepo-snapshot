import { formatNumber } from '@vertex-protocol/react-client';
import { BigDecimal } from '@vertex-protocol/utils';
import { joinClassNames } from '@vertex-protocol/web-common';
import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';
import { LIQUIDATION_MULTI_BALANCE_CELL_CONTAINER_CLASSNAME } from 'client/pages/Portfolio/subpages/History/components/cells/liquidation/consts';
import { HistoricalLiquidationsTableItem } from 'client/pages/Portfolio/subpages/History/hooks/useHistoricalLiquidationsTable';

interface Props
  extends TableCellProps,
    Pick<HistoricalLiquidationsTableItem, 'spot' | 'perp' | 'decomposedLps'> {}

export function LiquidationOraclePriceCell({
  spot,
  decomposedLps,
  perp,
  className,
  ...rest
}: Props) {
  return (
    <TableCell
      className={joinClassNames(
        LIQUIDATION_MULTI_BALANCE_CELL_CONTAINER_CLASSNAME,
        className,
      )}
      {...rest}
    >
      {decomposedLps.map((lp) => {
        return (
          <PriceInfo
            key={lp.sharedMetadata.symbol}
            price={lp.oraclePrice}
            formatSpecifier={lp.priceFormatSpecifier}
          />
        );
      })}
      {spot && (
        <PriceInfo
          price={spot.oraclePrice}
          formatSpecifier={spot.priceFormatSpecifier}
        />
      )}
      {perp && (
        <PriceInfo
          price={perp.oraclePrice}
          formatSpecifier={perp.priceFormatSpecifier}
        />
      )}
    </TableCell>
  );
}

function PriceInfo({
  price,
  formatSpecifier,
}: {
  price: BigDecimal;
  formatSpecifier: string;
}) {
  return (
    <span>
      {formatNumber(price, {
        formatSpecifier,
      })}
    </span>
  );
}
