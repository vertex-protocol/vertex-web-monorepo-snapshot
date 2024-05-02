import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';
import { HistoricalLiquidationEvent } from 'client/pages/Portfolio/subpages/History/hooks/useHistoricalLiquidationsTable';
import { BigDecimal } from '@vertex-protocol/utils';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { joinClassNames } from '@vertex-protocol/web-common';
import { LIQUIDATION_MULTI_BALANCE_CELL_CONTAINER_CLASSNAME } from 'client/pages/Portfolio/subpages/History/components/cells/liquidation/consts';

interface Props
  extends TableCellProps,
    Pick<HistoricalLiquidationEvent, 'spot' | 'perp' | 'decomposedLps'> {}

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
            key={lp.baseMetadata.symbol}
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
