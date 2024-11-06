import { ProductEngineType } from '@vertex-protocol/contracts';
import { formatNumber } from '@vertex-protocol/react-client';
import { joinClassNames } from '@vertex-protocol/web-common';
import { AmountWithSymbol } from 'client/components/AmountWithSymbol';
import {
  TableCell,
  TableCellProps,
} from 'client/components/DataTable/cells/TableCell';
import { LIQUIDATION_MULTI_BALANCE_CELL_CONTAINER_CLASSNAME } from 'client/pages/Portfolio/subpages/History/components/cells/liquidation/consts';
import { HistoricalLiquidationsTableItem } from 'client/pages/Portfolio/subpages/History/hooks/useHistoricalLiquidationsTable';

interface Props
  extends TableCellProps,
    Pick<HistoricalLiquidationsTableItem, 'spot' | 'perp' | 'decomposedLps'> {}

export function LiquidationBalanceChangesCell({
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
      {/*`flex-1` is used here to ensure that a taller sub-component (LPs) use the same amount of space as a shorter sub-component (individual spot/perp)*/}
      {decomposedLps.map((lp) => {
        return (
          <div
            className="flex flex-1 flex-col justify-center gap-y-1"
            key={lp.sharedMetadata.symbol}
          >
            <AmountWithSymbol
              formattedSize={formatNumber(lp.amountLpDecomposed.negated(), {
                formatSpecifier: lp.signedSizeFormatSpecifier,
              })}
              symbol="LP"
            />
            <AmountWithSymbol
              formattedSize={formatNumber(lp.underlyingBalanceDelta, {
                formatSpecifier: lp.signedSizeFormatSpecifier,
              })}
              symbol={
                lp.type === ProductEngineType.PERP
                  ? lp.sharedMetadata.marketName
                  : lp.sharedMetadata.symbol
              }
            />
          </div>
        );
      })}
      {spot && (
        <AmountWithSymbol
          className="flex-1 items-center"
          formattedSize={formatNumber(spot.amountLiquidated.negated(), {
            formatSpecifier: spot.signedSizeFormatSpecifier,
          })}
          symbol={spot.sharedMetadata.symbol}
        />
      )}
      {perp && (
        <AmountWithSymbol
          className="flex-1 items-center"
          formattedSize={formatNumber(perp.amountLiquidated.negated(), {
            formatSpecifier: perp.signedSizeFormatSpecifier,
          })}
          symbol={perp.sharedMetadata.marketName}
        />
      )}
    </TableCell>
  );
}
